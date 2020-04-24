from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.shortcuts import render
from django.contrib.auth.models import User

from .models import Regular_pizza, Order
# Create your views here.
def index(request):
	if not request.user.is_authenticated:
		return render(request, "users/login.html", {"message":None})
	context = {
		"user": request.user,
		"regulars": Regular_pizza.objects.all(),
		"orders": Order.objects.all()
	}
	return render(request, "menus/index.html", context)



