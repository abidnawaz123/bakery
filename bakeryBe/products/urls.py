from django.urls import path
from .views import BakeryView

urlpatterns = [
    path("bakery/",BakeryView.as_view(),name="bakery-list-create")
]