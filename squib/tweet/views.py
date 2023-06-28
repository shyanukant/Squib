import random
from django.conf import settings
from django.shortcuts import render, redirect
from django.http import  JsonResponse
# from django.utils.http import is_safe_url
from .models import TweetModel
from .forms import tweetForm
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

def create_tweet(request, *args, **kwargs):
    form = tweetForm(request.POST or None)
    next_url = request.POST.get("next" or None)
    print(next_url)
    if form.is_valid():
        obj = form.save(commit=False)
        obj.save()
        if next_url != None :
            return redirect(next_url)
        form = tweetForm()
    return render(request, "components/form.html", context={"form": form})

    