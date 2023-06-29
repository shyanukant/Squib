from django.urls import path
from tweet.views import (
                         tweet_detail_view, 
                         tweet_list, create_tweet, 
                         delete_tweet, 
                         tweet_action)
app_name = "tweet"

urlpatterns = [
    path("", tweet_list, name="tweets"),
    path("create/", create_tweet, name="create"),
    path("action/", tweet_action, name='action'),
    path("<int:tweet_id>/", tweet_detail_view, name="detail"),
    path("<int:tweet_id>/delete", delete_tweet, name="delete"),

]
