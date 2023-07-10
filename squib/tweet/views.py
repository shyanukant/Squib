from django.shortcuts import render, redirect

# Local views 
def tweet_detail_view(request, tweet_id, *args, **kwargs):
    return render(request, "tweets/detail.html", context={"tweet_id" : tweet_id})

def tweet_list_view(request, *args, **kwargs):
    return render(request, "tweets/list.html")

# def tweet_profile_view(request, username, *args, **kwargs):
#     return render(request, "tweets/profile.html", context={"profile_username" : username})