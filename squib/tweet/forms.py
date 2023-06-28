from django import forms
from .models import TweetModel
from django.conf import settings

MAX_TWEET_LENGTH = settings.MAX_TWEET_LENGTH
class tweetForm(forms.ModelForm):
    class Meta:
        model = TweetModel
        fields = ['content']

        def clean_content(self):
            content = self.cleaned_data.get('content')
            if len(content) > MAX_TWEET_LENGTH:
                raise forms.ValidationError("This tweet is too long!!!")
            return content