from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

# Local views 
@login_required
def tweet_list_view(request, *args, **kwargs):
    return render(request, "tweets/list.html")
 
# @login_required
# def feed_view(request, *args, **kwargs):
#     username = request.user.username
#     if(username):
#         return render(request, "pages/feed.html", context={"profile_username" : username})


@login_required
def tweet_detail_view(request, tweet_id, *args, **kwargs):
    return render(request, "tweets/detail.html", context={"tweet_id" : tweet_id})

# def tweet_profile_view(request, username, *args, **kwargs):
#     return render(request, "tweets/profile.html", context={"profile_username" : username})