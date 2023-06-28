from django.conf import settings
from rest_framework import serializers
from .models import TweetModel

MAX_TWEET_LENGTH = settings.MAX_TWEET_LENGTH

class TweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = TweetModel
        fields = ['content']

    def validate(self, value):
        if len(value) > MAX_TWEET_LENGTH:
            raise serializers.ValidationError("This Tweet is too long.")
        return value

