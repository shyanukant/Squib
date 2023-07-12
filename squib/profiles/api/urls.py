from django.urls import path
from .views import user_follow_view, user_profile_detail_view

"""
client endpoint = api/profile
"""

urlpatterns = [
    path("<str:username>/", user_profile_detail_view),
    path("<str:username>/follow/", user_follow_view),
]