from django.conf import settings
from django.shortcuts import render, redirect
from django.http import  JsonResponse
from .models import TweetModel
from .forms import tweetForm
from .serializer import TweetSerializer

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
    tweets_list = [ x.serialize() for x in qs ]
    data = {
        'isUser' : False ,
        'response' : tweets_list}

    return JsonResponse(data)

# Create tweet using djanog rest framework 

def create_tweet(request, *args, **kwargs):
    serializer = TweetSerializer(data = request.POST or None)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return JsonResponse(serializer.data, status=201)
    return JsonResponse({}, status=400)

''' create tweet in pure django 
def create_tweet(request, *args, **kwargs):
    user = request.user
    if not user.is_authenticated:
        user = None
        if request.headers.get ('x-requested-with') == 'XMLHttpRequest':
            return JsonResponse({}, status=401)
        return redirect(settings.LOGIN_URL)
    
    form = tweetForm(request.POST or None)
    next_url = request.POST.get("next" or None)
    # print(next_url)
    if form.is_valid():
        obj = form.save(commit=False)
        obj.user = user
        obj.save()
        if request.headers.get ('x-requested-with') == 'XMLHttpRequest':
            return JsonResponse(obj.serialize(), status=201)
        if next_url != None :
            return redirect(next_url)
    if form.errors:
        if request.headers.get('x-requested-with') == 'XMLHttpRequest':
            return JsonResponse(form.errors, status=400)
        form = tweetForm()
    return render(request, "components/form.html", context={"form": form}) '''

    