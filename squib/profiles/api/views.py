from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from ..serializer import PublicProfileSerializers
from ..models import Profile

User = get_user_model()

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def user_profile_detail_view(request, username, *args, **kwargs):
    qs = Profile.objects.filter(user__username = username)
    me = request.user
    if not qs.exists():
        return Response({"details": "User not found"}, status=404)
    
    profile_obj = qs.first()
    data = request.data or {}
    # print(data)
    if request.method == "POST":
        me = request.user
        action = data.get("action")
        if profile_obj.user != me:
            if action == "follow":
                profile_obj.followers.add(me)
            elif action == "unfollow":
                profile_obj.followers.remove(me)
    
    profile_obj = qs.first()
    serializer = PublicProfileSerializers(instance=profile_obj, context = {"request": request})
    return Response(serializer.data, status=200)