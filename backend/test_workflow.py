import os
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'job_board.settings')
django.setup()

from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from jobs.models import Job, Category

User = get_user_model()

def run_tests():
    print("=== Starting Comprehensive Workflow Test ===")

    # 1. Setup Data
    print("\n[1] Setting up test data...")
    # Create Categories if not exist
    if not Category.objects.exists():
        Category.objects.create(name="Engineering")
    category = Category.objects.first()

    # Create Regular User
    user_creds = {'username': 'testuser', 'password': 'password123', 'email': 'test@example.com'}
    if User.objects.filter(username=user_creds['username']).exists():
        User.objects.get(username=user_creds['username']).delete()
    user = User.objects.create_user(**user_creds)
    print(f"Created regular user: {user.username}")

    # Create Admin User
    admin_creds = {'username': 'admin_test', 'password': 'password123', 'email': 'admin@example.com', 'role': 'admin'}
    if User.objects.filter(username=admin_creds['username']).exists():
        User.objects.get(username=admin_creds['username']).delete()
    admin = User.objects.create_superuser(**admin_creds)
    print(f"Created admin user: {admin.username}")

    client = APIClient()

    # 2. Test: Regular User Posts Job
    print("\n[2] Testing: Regular user posts a job...")
    client.force_authenticate(user=user)
    job_data = {
        "title": "Junior Developer",
        "company": "Tech Corp",
        "location": "Remote",
        "category": category.id,
        "job_type": "full_time",
        "experience_level": "entry",
        "description": "Great job opportunity."
    }
    response = client.post('/api/jobs/', job_data)
    if response.status_code == status.HTTP_201_CREATED:
        job_id = response.data['id']
        print(f"PASS: Job created successfully (ID: {job_id})")
    else:
        print(f"FAIL: Failed to create job. Status: {response.status_code}, Data: {response.data}")
        return

    # 3. Test: Verify Job is Pending (Not Approved)
    print("\n[3] Testing: Job should be pending approval...")
    job = Job.objects.get(id=job_id)
    if not job.is_approved:
        print("PASS: Job is_approved=False by default.")
    else:
        print("FAIL: Job was auto-approved!")

    # 4. Test: Job Visibility (Public Feed)
    print("\n[4] Testing: Job visibility in public feed...")
    client.logout() # Anonymous user
    response = client.get('/api/jobs/')
    visible_ids = [j['id'] for j in response.data]
    if job_id not in visible_ids:
        print("PASS: Job is NOT visible in public feed.")
    else:
        print("FAIL: Job IS visible in public feed but should be hidden.")

    # 5. Test: Admin Approval
    print("\n[5] Testing: Admin approves the job...")
    client.force_authenticate(user=admin)
    # Admin can see the job even if not approved (via API list filtering logic check)
    # But usually approval happens via Admin Panel logic. Here we simulate API patch or Admin action.
    # Since we didn't expose 'is_approved' as writable in serializer for regular users, 
    # we need to check if Admin can update it via API or we simulate ModelAdmin action.
    # Let's try direct model update as the "Admin Action" simulation
    job.is_approved = True
    job.save()
    print("Simulated Admin approval via Dashboard.")

    # 6. Test: Job Visibility After Approval
    print("\n[6] Testing: Job visibility after approval...")
    client.logout()
    response = client.get('/api/jobs/')
    visible_ids = [j['id'] for j in response.data]
    if job_id in visible_ids:
        print("PASS: Job IS now visible in public feed.")
    else:
        print("FAIL: Job is STILL NOT visible in public feed.")

    # 7. Dashboard Stats Check (Unit test for dashboard.py logic)
    print("\n[7] Testing: Dashboard stats logic...")
    from jobs.dashboard import dashboard_callback
    context = {}
    context = dashboard_callback(None, context)
    kpi = context.get('kpi', [])
    live_jobs = next((item for item in kpi if item['title'] == 'Live Jobs'), None)
    pending_review = next((item for item in kpi if item['title'] == 'Pending Review'), None)
    
    print(f"Dashboard Stats: Live={live_jobs['metric']}, Pending={pending_review['metric']}")
    if live_jobs and pending_review:
         print("PASS: Dashboard KPI data structure is correct.")
    else:
         print("FAIL: Dashboard KPI data missing.")

    print("\n=== Test Complete ===")

if __name__ == "__main__":
    run_tests()
