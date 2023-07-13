"""
URL configuration for squib project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, re_path, include
from tweet.views import (
                        home_feed_view,
                         tweet_detail_view, 
                         tweet_list_view, 
                         )

from account.views import (register_view,
                           login_view,
                           logout_view)



urlpatterns = [
    path("admin/", admin.site.urls),
    path("", home_feed_view),
    path("global/", tweet_list_view),
    path("<int:tweet_id>", tweet_detail_view),
    # authenticattion
    path("register", register_view, name="register"),
    path("login", login_view, name='login'),
    path("logout", logout_view, name="logout"),
    # user profile
    re_path(r"profile?/", include("profiles.urls")),
    # api call
    path("api/tweets/", include("tweet.api.urls"), name="tweets"),
    re_path(r"api/profile?/", include("profiles.api.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)