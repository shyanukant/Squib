from django.conf import settings
from rest_framework import serializers
from .models import TweetModel
from profiles.serializer import PublicProfileSerializers

MAX_TWEET_LENGTH = settings.MAX_TWEET_LENGTH
TWEET_ACTION_OPTIONS = settings.TWEET_ACTION_OPTIONS

class TweetActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()

    def validate_action(self, value):
        value = value.lower().strip()
        if not value in TWEET_ACTION_OPTIONS:
            raise serializers.ValidationError("This is not valid action for tweet!!")
        return value


class TweetCreateSerializer(serializers.ModelSerializer):

    likes = serializers.SerializerMethodField(read_only = True)
    user = PublicProfileSerializers(source='user.profile',  read_only=True)
    class Meta:
        model = TweetModel
        fields = ['user', 'id', 'content', 'likes', 'timestamp']

    def get_likes(self, obj):
        return obj.likes.count()

    def validate(self, value):
        if len(value) > MAX_TWEET_LENGTH:
            raise serializers.ValidationError("This Tweet is too long.")
        return value

class TweetSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)
    user = PublicProfileSerializers(source='user.profile',  read_only=True)
    parent = TweetCreateSerializer(read_only=True)

    class Meta:
        model = TweetModel
        fields = ['user', 'id', 'content', 'likes', 'is_retweet', 'parent', 'timestamp']

    def get_likes(self, obj):
        return obj.likes.count()    