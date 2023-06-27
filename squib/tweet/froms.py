from django import forms
from .models import TweetModel

class tweetForm(forms.ModelForm):
    class Meta:
        model = TweetModel
        fields = ['content']