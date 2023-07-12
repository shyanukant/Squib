from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from ..serializer import PublicProfileSerializers
from ..models import Profile

User = get_user_model()

# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def user_profile_detail_view(request, username, *args, **kwargs):
#     current_user = request.user

@api_view(["GET"])
def user_profile_detail_view(request, username, *args, **kwargs):
    qs = Profile.objects.filter(user__username = username)
    if not qs.exists():
        return Response({"details": "User not found"}, status=404)
    
    profile_obj = qs.first()
    data = PublicProfileSerializers(instance=profile_obj, context = {"request": request})
    return Response(data.data, status=200)


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def user_follow_view(request, username, *args, **kwargs):
    me = request.user
    other_user_qs = User.objects.filter(username=username)

    if me.username == username:
        my_follower = me.profile.followers.all()
        return Response({"followers":my_follower.count()}, status=200)

    if not other_user_qs.exists():
        return Response({}, status=404)
    other = other_user_qs.first()
    profile = other.profile

    data = request.data or {}
    # print(data)
    action = data.get("action")

    if action == "follow":
        profile.followers.add(me)
    elif action == "unfollow":
        profile.followers.remove(me)
    
    data = PublicProfileSerializers(instance=profile, context = {"request": request})
    return Response(data.data, status=200)
