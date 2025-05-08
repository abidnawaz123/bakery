from __future__ import absolute_import, unicode_literals
import os
from datetime import timedelta
from celery import Celery

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bakeryBe.settings')

app = Celery('bakeryBe')

# Load custom config from Django settings using the 'CELERY_' namespace
app.config_from_object('django.conf:settings', namespace='CELERY')

# Auto-discover tasks from installed apps
app.autodiscover_tasks()

# Celery Beat schedule for periodic tasks
app.conf.beat_schedule = {
    'mark_expired_items_every_2_seconds': {
        'task': 'products.tasks.mark_expired_bakery_items',
        'schedule': timedelta(seconds=2),  # For testing purposes
    },
}

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')
