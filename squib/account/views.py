from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth import login, logout

# create views 

def register_view(request, *args, **kwargs):
    form = UserCreationForm(request.POST or None)
    if form.is_valid():
        print(form.cleaned_data)

    context = {
        'form' : form,
        'title':"Register",
        'btn_label' : "Register"
    }
    return render(request, "account/auth.html", context)

def login_view(request, *args, **kwargs):
    form = AuthenticationForm(request, request.POST or None)
    if form.is_valid():
        user_ = form.get_user()
        login(request, user_)
        return redirect('/')  
    
    context = {
        'form' : form,
        'title' : "Login",
        'btn_label' : "Login"
    }

    return render(request, "account/auth.html", context) 

def logout_view(request, *args, **kwargs):
    if request.method == "POST" :
        logout(request)
        return redirect("/login")
    
    context = {
        'form' : None,
        'title':'Logout',
        'description' : 'Are you sure , you want to logout?',
        'btn_label' : "Logout"
    }

    return render(request, "account/auth.html", context)
