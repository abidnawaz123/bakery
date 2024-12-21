from celery import shared_task
from channels.layers import get_channel_layer
from .models import Bakery
from django.utils import timezone

@shared_task
def remove_expired_bakery_items():
    """Remove bakery items that have expired."""
    now = timezone.now()
    expired_items = Bakery.objects.filter(expiry_date__lte=now)
    expired_items.delete()
    
    # Send a message to the WebSocket consumers
    channel_layer = get_channel_layer()
    channel_layer.group_send(
        'task_updates',  # The group name
        {
            'type': 'send_task_update',
            'message': f"Removed {expired_items.count()} expired bakery items."
        }
    )
