from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JobViewSet, CategoryViewSet, ApplicationViewSet

router = DefaultRouter()
router.register(r'jobs', JobViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'applications', ApplicationViewSet, basename='application')

urlpatterns = [
    path('', include(router.urls)),
]
