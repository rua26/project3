from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("ajax/regular_menu", views.regular_menu, name='regular_menu'),
    path("ajax/sicilian_menu", views.sicilian_menu, name='sicilian_menu'),
    path("ajax/order", views.order, name='order'),
]
