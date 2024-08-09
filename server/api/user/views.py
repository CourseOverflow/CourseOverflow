from api.models import User
from api.serializers import UserSerializer
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

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


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    try:
        new_profile_picture = request.data.get("new_profile_picture")
        cloudinary_public_id = request.data.get("cloudinary_public_id")
        user = request.user

        # Update the user's profile picture
        user.profilePicture = new_profile_picture
        user.cloudinaryPublicId = cloudinary_public_id
        user.save()

        return Response({"message": "success"}, status=status.HTTP_200_OK)

    except Exception:
        return Response(
            {"message": "error updating profile picture"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
