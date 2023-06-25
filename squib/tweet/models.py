from django.db import models

# Create your models here.
class TweetModel(models.Model):
    content = models.TextField(max_length=250,  null=True, blank=True)
    image = models.FileField( upload_to='images/', blank=True, null= True)