from django import forms
from .models import Profile
from django.contrib.auth import get_user_model

User = get_user_model()

class ProfileForm(forms.ModelForm):
    first_name = forms.CharField(required=False)
    last_name = forms.CharField(required=False)
    email = forms.EmailField(required=False)
    class Meta:
        model=Profile
        fields = ['first_name', 'last_name', 'email', 'bio', 'location', 'link']