from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import Job, Category, Application

@admin.action(description='Approve selected jobs')
def approve_jobs(modeladmin, request, queryset):
    queryset.update(is_approved=True)

@admin.register(Job)
class JobAdmin(ModelAdmin):
    list_display = ('title', 'company', 'category', 'is_approved', 'created_at')
    list_filter = ('is_approved', 'category', 'job_type')
    search_fields = ('title', 'company', 'description')
    actions = [approve_jobs]

@admin.register(Category)
class CategoryAdmin(ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Application)
class ApplicationAdmin(ModelAdmin):
    list_display = ('job', 'applicant', 'status', 'applied_at')
    list_filter = ('status',)
    search_fields = ('job__title', 'applicant__username')
