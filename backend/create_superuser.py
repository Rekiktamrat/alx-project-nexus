import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'job_board.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin', role='admin')
    print("Superuser 'admin' created with role='admin'.")
else:
    u = User.objects.get(username='admin')
    if u.role != 'admin':
        u.role = 'admin'
        u.save()
        print("Updated 'admin' user role to 'admin'.")
    else:
        print("Superuser 'admin' already exists and has correct role.")
