from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth import login, logout

# create views 

def register(request, *args, **kwargs):
    form = UserCreationForm(request.POST or None)
    if form.is_valid():
        print(form.cleaned_data)

    context = {
        'form' : form,
        'title':"Register",
        'btn_label' : "Register"
    }
    return render(request, "account/register.html", context)