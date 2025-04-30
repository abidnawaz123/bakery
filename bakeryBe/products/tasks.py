from celery import shared_task
from channels.layers import get_channel_layer

@shared_task
def notify_admin_of_deletion(count):
    """Notify frontend that expired items were deleted by admin."""
    channel_layer = get_channel_layer()
    if channel_layer:
        channel_layer.group_send(
            'task_updates',
            {
                'type': 'send_task_update',
                'message': f"Admin deleted {count} expired bakery item(s)."
            }
        )
