from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse
from django.shortcuts import render, redirect 
from django.contrib.auth.models import User


from .models import Regular_pizza, Sicilian_pizza, Order
# Create your views here.
def index(request):
	if not request.user.is_authenticated:
		return redirect('/login')
	context = {
		"user": request.user,
		"orders": Order.objects.all()
	}
	return render(request, "menus/index.html", context)

def sicilian_menu(request):
	sicilians = Sicilian_pizza.objects.all().values();
	sicilians_list = list(sicilians)
	return JsonResponse(sicilians_list, safe=False)

def regular_menu(request):
	regulars = Regular_pizza.objects.all().values();
	regulars_list = list(regulars)
	return JsonResponse(regulars_list, safe=False)

def order(request):
	data={}
	if request.GET.get("action") == "POST":
		name = request.GET.get('name')
		price = request.GET.get('price')
		Order.objects.get(product= name, price=price).delete()
		data['status'] = "Success1"
	if request.GET.get("action") == "GET":
		name = request.GET.get('name')
		price = request.GET.get('price')
		user = request.user;
		Order.objects.create(product= name, price = price, user=user)
		data['status'] = "Success2"
	return JsonResponse(data)