from rest_framework import serializers
from .models import Bakery

class BakerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Bakery
        fields = "__all__"