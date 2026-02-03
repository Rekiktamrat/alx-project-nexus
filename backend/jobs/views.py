from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Job, Category, Application
from .serializers import JobSerializer, CategorySerializer, ApplicationSerializer
from .permissions import IsAdminOrReadOnly, IsAdminUser

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(posted_by=self.request.user)

    def get_queryset(self):
        queryset = Job.objects.all()

        # Only show approved jobs to non-admins
        if not (self.request.user.is_authenticated and getattr(self.request.user, 'role', '') == 'admin'):
            queryset = queryset.filter(is_approved=True)

        category = self.request.query_params.get('category')
        location = self.request.query_params.get('location')
        job_type = self.request.query_params.get('type')
        experience_level = self.request.query_params.get('level')
        search_query = self.request.query_params.get('search')

        if category:
            queryset = queryset.filter(category__name__iexact=category)
        if location:
            queryset = queryset.filter(location__icontains=location)
        if job_type:
            queryset = queryset.filter(job_type=job_type)
        if experience_level:
            queryset = queryset.filter(experience_level=experience_level)
        if search_query:
            from django.db.models import Q
            queryset = queryset.filter(
                Q(title__icontains=search_query) | 
                Q(company__icontains=search_query) |
                Q(description__icontains=search_query)
            )
        
        return queryset

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def apply(self, request, pk=None):
        job = self.get_object()
        if request.user.role != 'user':
             return Response({"detail": "Only users can apply for jobs."}, status=status.HTTP_403_FORBIDDEN)
        
        if Application.objects.filter(job=job, applicant=request.user).exists():
             return Response({"detail": "You have already applied for this job."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = ApplicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(job=job, applicant=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAdminUser])
    def approve(self, request, pk=None):
        job = self.get_object()
        job.is_approved = True
        job.save()
        return Response({'status': 'job approved'})

class ApplicationViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Application.objects.all()
        return Application.objects.filter(applicant=user)
