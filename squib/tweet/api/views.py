# from .forms import tweetForm
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from ..models import TweetModel
from ..serializer import TweetSerializer, TweetActionSerializer, TweetCreateSerializer

# api views (django rest framwwrok)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def tweet_feed(request, *args, **kwargs):
    user = request.user
    qs = TweetModel.objects.get_feed(user)
    serializer = TweetSerializer(qs, many=True)
    return Response(serializer.data, status=200)

@api_view(['GET'])
def tweet_list(request):
    qs = TweetModel.objects.all()
    # tweet limitation according to user
    username = request.GET.get('username')
    if username != None:
        qs = qs.by_username(username)
    serializer = TweetSerializer(qs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def tweet_detail(request, tweet_id, *args, **kwargs):
    qs = TweetModel.objects.filter(id=tweet_id)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    serializer = TweetSerializer(obj)
    return Response(serializer.data, status=200)

# Create tweet using djanog rest framework


@api_view(['POST'])  # http method the client sent === POST
@permission_classes([IsAuthenticated])
def create_tweet(request, *args, **kwargs):
    serializer = TweetCreateSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response({}, status=400)

@api_view(['GET', 'DELETE', 'POST'])
@permission_classes([IsAuthenticated])
def delete_tweet(request, tweet_id, *args, **kwargs):
    qs = TweetModel.objects.filter(id = tweet_id)
    if not qs.exists():
        return Response({}, status=404)
    qs = qs.filter(user=request.user)
    if not qs.exists():
        return Response({'message': 'You cannot delete this tweet'}, status=401)
    qs.delete()
    return Response({'message': 'Tweet Deleteted Successfully'}, status=200)

# acitons are : like, unlike and retweet
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tweet_action(request, *args, **kwargs):
    # print(request.POST, request.data)
    serializer = TweetActionSerializer(data = request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        tweet_id = data.get('id')
        action = data.get('action')
        content = data.get('content')

        qs = TweetModel.objects.filter(id=tweet_id)
        if not qs.exists():
            return Response({}, status=404)
        obj = qs.first()

        if action == 'like':
            obj.likes.add(request.user)
            serializer = TweetSerializer(obj)
            return Response(serializer.data, status=200)
        elif action == 'unlike':
            obj.likes.remove(request.user)
            serializer = TweetSerializer(obj)
            return Response(serializer.data, status=200)
        elif action == 'retweet':
            parent_obj = obj
            new_tweet = TweetModel.objects.create(user=request.user, parent=parent_obj, content=content)
            serializer = TweetSerializer(new_tweet)
            return Response(serializer.data, status = 201)
    
    return Response({}, status=200)