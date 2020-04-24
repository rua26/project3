from django.shortcuts import render, redirect
from .forms import RegisterForm
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import logout, authenticate, login
from django.contrib.auth.models import User
from django.http import JsonResponse
# Create your views here.
def register(request):
	if request.method == "POST":
		form = RegisterForm(request.POST)
		if form.is_valid():
			user = form.save()
			username = form.cleaned_data.get('username')
			login(request, user)
			return redirect('/')
	else:
		form = RegisterForm()

	return render(request, "register/register.html", {"form":form})

def validate_username(request):
	username = request.GET.get('username', None);
	data = {
		'is_taken': User.objects.filter(username__iexact=username).exists()
	}
	if data['is_taken']:
		data['error_message'] = 'A user with this username already exists.'
	return JsonResponse(data)	
