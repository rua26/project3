from django.contrib import admin

# Register your models here.
from .models import Regular_pizza, Sicilian_pizza, Topping, Sub, Pasta, Salad, Order

admin.site.register(Regular_pizza)
admin.site.register(Sicilian_pizza)
admin.site.register(Topping)
admin.site.register(Sub)
admin.site.register(Pasta)
admin.site.register(Salad)
admin.site.register(Order)
