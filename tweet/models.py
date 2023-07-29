import random
from django.conf import settings
from django.db import models

User = settings.AUTH_USER_MODEL
# Create your models here.

class TweetLike(models.Model):
    user = models.ForeignKey(User,  on_delete=models.CASCADE)
    tweet = models.ForeignKey("TweetModel", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now=True)

class TweetQuerySet(models.QuerySet):
    def by_username(self, username):
        return self.filter(user__username__iexact = username)

    def feed(self, user):
        profiles_exist = user.following.exists()
        followed_user_id = []
        if profiles_exist:
            followed_user_id = user.following.values_list("user__id", flat=True)
        return self.filter(models.Q(user__id__in=followed_user_id) | 
                                      models.Q(user=user)).distinct().order_by("-timestamp")


class TweetManager(models.Manager):
    def get_queryset(self, *args, **kwargs):
        return TweetQuerySet(self.model, using=self._db)
    
    def get_feed(self, user):
        return self.get_queryset().feed(user)

class TweetModel(models.Model):
    parent = models.ForeignKey("self", on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tweets")
    content = models.TextField(max_length=250,  null=True, blank=True)
    image = models.FileField( upload_to='images/', blank=True, null= True)
    likes = models.ManyToManyField(User, related_name='tweet_user', through="TweetLike", blank=True)
    timestamp = models.DateTimeField(auto_now=True)

     # Custom manager
    objects = TweetManager()

    class Meta:
        ordering = ['-id']

    @property
    def is_retweet(self):
        return self.parent != None