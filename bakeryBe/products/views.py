from django.shortcuts import render
from rest_framework.generics import ListAPIView
from .serializers import BakerySerializer
from .models import *

class BakeryView(ListAPIView):
    serializer_class = BakerySerializer

    def get_queryset(self):
        # Return only active items
        return Bakery.objects.filter(status='active')
