from django.urls import path
from .views import (
                        tweet_feed,
                         tweet_detail, 
                         tweet_list, 
                         create_tweet, 
                         delete_tweet, 
                         tweet_action)
app_name = "tweet"

urlpatterns = [
    path("", tweet_list, name="tweets"),
    path("feed/", tweet_feed, name="feed"),
    path("create/", create_tweet, name="create"),
    path("action/", tweet_action, name='action'),
    path("<int:tweet_id>/", tweet_detail, name="detail"),
    path("<int:tweet_id>/delete", delete_tweet, name="delete"),

]
