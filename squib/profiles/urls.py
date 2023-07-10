from django.urls import path
from .views import profile_view, update_profile_view

urlpatterns = [
    path("<str:username>", profile_view),
    path("edit/", update_profile_view)

]