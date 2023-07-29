from django.db import models
from django.conf import settings
from django.db.models.signals import post_save, m2m_changed
from django.core.validators import URLValidator
from django.dispatch import receiver
from django.core.signals import request_finished
from django.contrib import messages # display messages
from .get_request import get_current_request

# Create your models here.
User = settings.AUTH_USER_MODEL

class FollowerRelated(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    profile = models.ForeignKey("Profile", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=150, null=True, blank=True)
    link = models.URLField(blank=True, null=True, validators=[URLValidator(message="Invalid link", code="Invalid link")])
    bio = models.TextField(max_length=250, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    followers = models.ManyToManyField(User, related_name="following", blank=True)
    '''
    profile_obj.followers.all() -> all user following this profile
    profile_obj.following.all() / user.following.all() -> all user(profile) i follow
    '''

    def __str__(self):
        return self.user.username

def user_did_save(sender, instance, created, *args, **kwargs):
    # Profile.objects.get_or_create(user=instance)
    if created:
        Profile.objects.get_or_create(user=instance)

post_save.connect(user_did_save, sender=User)

# signal when user gain follower and loss follower
@receiver(m2m_changed, sender=Profile.followers.through)
def followers_changed(sender, instance, action, pk_set, **kwargs):
    # check if the action is adding or removing followers and pk_set (primary key's of followers)
    request = get_current_request()
    if request : 
        # add a success message
        if action == "post_add":
            print(f"{instance} gained {len(pk_set)} new follower (s)")
            messages.success(request, f"You gained {len(pk_set)} new follower(s)")
        elif action == "post_remove":
            print(f"{instance} loss {len(pk_set)} new follower (s)")
            # add a warning message
            messages.warning(request, f"You lost {len(pk_set)} follower(s)")