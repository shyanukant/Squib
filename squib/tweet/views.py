import random
from django.shortcuts import render
from django.http import  JsonResponse
from .models import TweetModel
# Create your views here.
def home_view(request, *args, **kwargs):
    return render(request, "pages/home.html" )

def tweet_detail_view(request, tweet_id, *args, **kwargs):
    print(args, kwargs)
    data = {
        'id' : tweet_id
    }
    status = 200
    try: 
        obj = TweetModel.objects.get(id = tweet_id)
        data['content'] = obj.content
    except:
        data['message'] = "Not Found"
        status = 400

    return JsonResponse(data, status=status)

def tweet_list(request, *args, **kwargs):
    qs = TweetModel.objects.all()
    tweets_list = [
        {'id': x.id, 'content':x.content, 'likes': random.randint(0, 250)} for x in qs
    ]
    data = {
        'isUser' : False ,
        'response' : tweets_list}

    return JsonResponse(data)

def create_tweet(request):
    pass