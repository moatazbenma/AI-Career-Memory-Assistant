from celery import Celery
import os


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')


# Create Celery app
app = Celery('core')

# Load config from Django settings
app.config_from_object('django.conf:settings', namespace='CELERY')


# Auto-discover tasks in all installed apps
app.autodiscover_tasks()