from django.contrib import admin
from .models import TweetModel, TweetLike

# Register your models here.
class TweetLikeAdmin(admin.TabularInline):
    model = TweetLike

class TweetAdmin(admin.ModelAdmin):
    inlines = [TweetLikeAdmin]
    list_display = ('__str__', 'user')
    search_fields = ['user__username', 'user__email', 'content']

    class Meta:
        model = TweetModel

admin.site.register(TweetModel, TweetAdmin)