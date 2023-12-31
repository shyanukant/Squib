from django.shortcuts import render, redirect
from django.http import Http404
from .models import Profile
from .forms import ProfileForm

# Create your views here.
def update_profile_view(request, *args, **kwargs):
    if not request.user.is_authenticated:
        return redirect("/login?next=profile/update")
    user = request.user
    user_data = {
        "first_name" : user.first_name,
        "last_name" : user.last_name,
        "email" : user.email,
        "bio" : user.profile.bio,
        "location" : user.profile.location,
        "link" : user.profile.link,
    }
    my_profile = user.profile
    form = ProfileForm(request.POST or None ,instance=my_profile, initial=user_data)

    if form.is_valid():
        profile_obj = form.save(commit=True)
        first_name = form.cleaned_data.get("first_name")
        last_name = form.cleaned_data.get("last_name")
        email = form.cleaned_data.get("email")

        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        user.save()

        profile_obj.save()
    context = {
        'form' : form,
        'btn_label' : 'Save',
        'title' : 'Update Profile'
    }
    return render(request, "profiles/update.html", context)

def profile_view(request, username, *args, **kwargs):
    qs = Profile.objects.filter(user__username = username)
    is_following = False
    user = request.user
    if not qs.exists():
        raise Http404
    profile_obj = qs.first()
    if user.is_authenticated:
        is_following = user in profile_obj.followers.all()

    print(f" current user : {user.username}, profile : {profile_obj}")
    context = {
        "currentUser" : user.username,
        "username" : username,
        "profile" : profile_obj,
        "is_following" : is_following
    }
    return render(request, "profiles/profile.html", context)