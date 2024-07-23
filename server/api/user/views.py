from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

from api.models import User
from api.serializers import UserSerializer


@api_view(["GET"])
def user(request):
    users = User.objects.all()[:5]
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=HTTP_200_OK)
