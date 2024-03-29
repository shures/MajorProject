from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from app.models import Follow
from app.models import Post
from myprofile.models import UserDetail

from rest_framework.status import (
    HTTP_200_OK
)


@api_view(['GET'])
@permission_classes((AllowAny,))
def url_username(request, username):
    data = {}
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        user = None
    if user is not None:
        data['username'] = user.username,
        data["fn"] = user.first_name
        data['id'] = user.id,
        data['first_name'] = user.first_name,
        user_detail = UserDetail.objects.filter(user_id=user.id)
        for item in user_detail:
            follower = Follow.objects.filter(follower_id=user.id).count()
            followed = Follow.objects.filter(followed_id=user.id).count()
            post = Post.objects.filter(user_id=user.id).count()
            data["addr"] = item.addr,
            data["quote1"] = item.quote1,
            data["quote2"] = item.quote2,
            data["quote3"] = item.quote3,
            data["site"] = item.site,
            data["profilePic"] = item.file_name,
            data["follower"] = follower
            data["followed"] = followed
            data["post"] = post

    else:
        data = {}
    return Response({"data": data}, status=HTTP_200_OK)
