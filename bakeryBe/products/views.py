from django.shortcuts import render
from rest_framework.generics import ListAPIView
from .serializers import BakerySerializer
from .models import *

class BakeryView(ListAPIView):
    queryset = Bakery.objects.all()
    serializer_class = BakerySerializer
