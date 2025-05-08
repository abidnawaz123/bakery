from celery import shared_task
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.utils import timezone
from .models import Bakery
import logging

logger = logging.getLogger(__name__)

@shared_task
def notify_admin_of_deletion(count):
    """Notify frontend that expired items were deleted by admin."""
    channel_layer = get_channel_layer()
    if channel_layer:
        try:
            async_to_sync(channel_layer.group_send)(
                'task_updates',
                {
                    'type': 'send_task_update',
                    'message': f"Admin deleted {count} expired bakery item(s)."
                }
            )
            logger.info(f"Notification sent: Admin deleted {count} expired items.")
        except Exception as e:
            logger.error(f"Failed to send admin deletion notification: {e}")

@shared_task
def mark_expired_bakery_items():
    """Check and mark expired bakery items."""
    now = timezone.now()
    logger.info(f"Checking for expired items at {now}")

    active_items = Bakery.objects.filter(status='active')
    for item in active_items:
        logger.debug(f"Active item: {item.item_name}, Expiry: {item.expiry_date}")

    expired_items = active_items.filter(
        expiry_date__isnull=False,
        expiry_date__lt=now
    )

    count = expired_items.count()
    logger.info(f"Found {count} expired bakery item(s)")

    if count > 0:
        for item in expired_items:
            logger.info(f"Marking as expired: {item.item_name}, Expired on: {item.expiry_date}")

        expired_items.update(status='expired')

        channel_layer = get_channel_layer()
        if channel_layer:
            try:
                async_to_sync(channel_layer.group_send)(
                    'task_updates',
                    {
                        'type': 'send_task_update',
                        'message': f"{count} bakery item(s) marked as expired."
                    }
                )
                logger.info("WebSocket notification sent for expired items.")
            except Exception as e:
                logger.error(f"WebSocket send failed: {e}")

    return count
