
import os
import django
import sys

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'job_board.settings')
django.setup()

from django.contrib.auth import authenticate

user = authenticate(username='admin', password='admin')
if user is not None:
    print("Authentication SUCCESS")
else:
    print("Authentication FAILED")
