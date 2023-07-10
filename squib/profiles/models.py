from django.db import models
from django.conf import settings

# Create your models here.
User = settings.AUTH_USER_MODEL
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=150, null=True, blank=True)
    link = models.URLField(blank=True, null=True)
    bio = models.TextField(max_length=250, null=True, blank=True)

    def __str__(self):
        return self.user