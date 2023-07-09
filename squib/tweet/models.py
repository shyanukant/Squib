import random
from django.conf import settings
from django.db import models

User = settings.AUTH_USER_MODEL
# Create your models here.

class TweetLike(models.Model):
    user = models.ForeignKey(User,  on_delete=models.CASCADE)
    tweet = models.ForeignKey("TweetModel", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now=True)

class TweetModel(models.Model):
    parent = models.ForeignKey("self", on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(max_length=250,  null=True, blank=True)
    image = models.FileField( upload_to='images/', blank=True, null= True)
    likes = models.ManyToManyField(User, related_name='tweet_like', through="TweetLike", blank=True)
    timestamp = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-id']

    @property
    def is_retweet(self):
        return self.parent != None