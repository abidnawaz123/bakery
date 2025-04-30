# bakeryBe/celery.py

from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedules import crontab

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bakeryBe.settings')

app = Celery('bakeryBe')

# Load task-related config from Django settings using CELERY_ namespace
app.config_from_object('django.conf:settings', namespace='CELERY')

# Automatically discover tasks in all installed apps
app.autodiscover_tasks()

# Schedule periodic tasks
app.conf.beat_schedule = {
    # Mark expired items every minute
    'mark_expired_items_every_minute': {
        'task': 'products.tasks.mark_expired_bakery_items',
        'schedule': crontab(minute='*/1'),
    },

    # Optionally, remove expired items (if needed automatically)
    # Commented out since you want admin to approve manually
    # 'delete_expired_items_on_admin_approval': {
    #     'task': 'products.tasks.delete_expired_items_on_admin_approval',
    #     'schedule': crontab(minute='*/10'),
    # },
}

@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))
