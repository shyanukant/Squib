from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth import login, logout

# create views 

def login_view(request, *args, **kwargs):
    form = AuthenticationForm(request, request.POST or None)
    if form.is_valid():
        user_ = form.get_user()
        login(request, user_)
        return redirect('/')  
    
    context = {
        'form' : form,
        'title' : "Login",
        'btn_label' : "Login",
        'second_btn' : "register",
        'second_label' : "Don't have account"
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
        'btn_label' : "Logout",
        
    }

    return render(request, "account/auth.html", context)

def register_view(request, *args, **kwargs):
    form = UserCreationForm(request.POST or None)
    if form.is_valid():
        print(form.cleaned_data)
        user = form.save(commit=True)
        user.set_password(form.cleaned_data.get("password1"))
        login(request, user)
        return redirect('/') 

    context = {
        'form' : form,
        'title':"Register",
        'btn_label' : "Register",
        'second_btn' : "login",
        'second_label' : "Already a User"
    }
    return render(request, "account/auth.html", context)