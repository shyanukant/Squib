from django.urls import path
from .views import profile_view, update_profile_view

urlpatterns = [
    path("<str:username>", profile_view, name='profile'),
    path("edit/", update_profile_view, name='edit')

]