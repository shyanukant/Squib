from django.db import models
from django.conf import settings
from django.db.models.signals import post_save

# Create your models here.
User = settings.AUTH_USER_MODEL
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=150, null=True, blank=True)
    link = models.URLField(blank=True, null=True)
    bio = models.TextField(max_length=250, null=True, blank=True)

    def __str__(self):
        return self.user

def user_did_save(sender, instance, created, *args, **kwargs):
    # Profile.objects.get_or_create(user=instance)
    if created:
        Profile.objects.get_or_create(user=instance)

post_save.connect(user_did_save, sender=User)