from django.db import models

class Bakery(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('expired', 'Expired (Pending Approval)'),
        ('deleted', 'Deleted'),  # optional if you soft-delete
    ]

    item_name = models.CharField(max_length=300)
    item_desciption = models.CharField(max_length=500)
    item_price = models.IntegerField(default=0)
    expiry_date = models.DateTimeField(null=True, blank=True)
    item_image = models.ImageField(upload_to="products/", null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')  # <-- New field

    def __str__(self):
        return self.item_name
