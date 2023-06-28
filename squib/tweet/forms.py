from django import forms
from .models import TweetModel

MAX_TWEET_LENGTH = 250
class tweetForm(forms.ModelForm):
    class Meta:
        model = TweetModel
        fields = ['content']

        def clean_content(self):
            content = self.cleaned_data.get('content')
            if len(content) > MAX_TWEET_LENGTH:
                raise forms.ValidationError("This tweet is too long!!!")
            return content