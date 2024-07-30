from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models import User
from api.serializers import UserSerializer

# ----------------------------------------------------------------------------


@api_view(["GET"])
def get_user(request, username):
    try:
        user = User.objects.get(username=username)
        serializer = UserSerializer(user)
        response = dict(serializer.data)
        del response["password"]
        return Response(response)

    except Exception:
        return Response(
            {"error": "User with this username does not exist."},
            status=status.HTTP_404_NOT_FOUND,
        )


# ----------------------------------------------------------------------------
