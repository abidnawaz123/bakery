from django.db import models

class Bakery(models.Model):
    item_name = models.CharField(max_length=300)
    item_desciption = models.CharField(max_length=500)
    item_price = models.IntegerField(default=0)
    expiry_date = models.DateTimeField(null=True, blank=True)
    item_image = models.ImageField(upload_to="products/",null=True,blank=True)
    
    def __str__(self):
        return self.item_name