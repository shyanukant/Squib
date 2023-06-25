from django.shortcuts import render
from django.http import HttpResponse, Http404
from . models import TweetModel
# Create your views here.
def home_view(request):
    # tweet = TweetModel.objects.all()
    return HttpResponse(request, "<h1>Hello world</h1>")

def home_detail_view(request, tweet_id, *args, **kwargs):
    print(args, kwargs)
    return HttpResponse(request, f"<h1>Home Detail{tweet_id}</h1>")