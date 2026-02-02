from rest_framework import serializers
from .models import Job, Category, Application

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class JobSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    posted_by_username = serializers.ReadOnlyField(source='posted_by.username')

    class Meta:
        model = Job
        fields = '__all__'
        read_only_fields = ('posted_by',)

class ApplicationSerializer(serializers.ModelSerializer):
    job_title = serializers.ReadOnlyField(source='job.title')
    applicant_username = serializers.ReadOnlyField(source='applicant.username')

    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = ('applicant', 'status')
