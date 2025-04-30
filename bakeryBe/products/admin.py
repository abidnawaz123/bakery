from django.contrib import admin
from .models import Bakery
from products.tasks import notify_admin_of_deletion  # Renamed for clarity

@admin.action(description="Delete selected expired items")
def approve_and_delete_expired(modeladmin, request, queryset):
    # Only delete selected expired items
    expired_items = queryset.filter(status='expired')
    count = expired_items.count()

    if count > 0:
        expired_items.delete()
        # Optional: just notify via websocket or logging
        notify_admin_of_deletion.delay(count)
        modeladmin.message_user(request, f"Deleted {count} expired item(s).")
    else:
        modeladmin.message_user(request, "No expired items selected.", level='warning')

class BakeryAdmin(admin.ModelAdmin):
    list_display = ['item_name', 'expiry_date', 'status']
    list_filter = ['status']
    actions = [approve_and_delete_expired]

admin.site.register(Bakery, BakeryAdmin)
