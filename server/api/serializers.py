from django.forms import ValidationError
from rest_framework import serializers
from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
    TokenRefreshSerializer,
)
from rest_framework_simplejwt.tokens import RefreshToken

from api.models import (
    Comment,
    CommentInteraction,
    Draft,
    Playlist,
    PlaylistInteraction,
    User,
    Video,
    VideoOrder,
)

# ----------------------------------------------------------------------------


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["email"] = user.email
        token["username"] = user.username
        token["first_name"] = user.first_name
        token["last_name"] = user.last_name
        token["profilePicture"] = user.profilePicture
        return token


# ----------------------------------------------------------------------------


class MyTokenRefreshSerializer(TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        request = self.context["request"]
        refresh_token = request.COOKIES.get("refresh")

        if not refresh_token:
            raise ValidationError("No valid token found in cookie")

        attrs["refresh"] = refresh_token
        return super().validate(attrs)


# ----------------------------------------------------------------------------


class GoogleTokenObtainSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate(self, attrs):
        email = attrs.get("email")
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError(
                "User with this email does not exist."
            )

        refresh = RefreshToken.for_user(user)

        refresh["email"] = user.email
        refresh["username"] = user.username
        refresh["first_name"] = user.first_name
        refresh["last_name"] = user.last_name
        refresh["profilePicture"] = user.profilePicture

        data = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }
        return data


# ----------------------------------------------------------------------------


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "email",
            "username",
            "first_name",
            "last_name",
            "profilePicture",
            "cloudinaryPublicId",
            "password",
        ]
        read_only_fields = ["is_staff", "is_superuser", "created_at"]

    def create(self, validated_data):
        validated_data["is_staff"] = False
        validated_data["is_superuser"] = False
        user = User.objects.create_user(**validated_data)
        return user

    def validate(self, data):
        email = data.get("email")
        if User.objects.filter(email=email, is_active=False).exists():
            raise ValidationError(
                "An account with this email already exists and is "
                + "pending activation."
            )
        return data


# ----------------------------------------------------------------------------


class DraftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Draft
        fields = "__all__"


# ----------------------------------------------------------------------------


class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = "__all__"


# ----------------------------------------------------------------------------


class PlaylistInteractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaylistInteraction
        fields = "__all__"


# ----------------------------------------------------------------------------


class VideoSerializer(serializers.ModelSerializer):
    isWatched = serializers.SerializerMethodField()

    def get_isWatched(self, video):
        return video.isWatched if hasattr(video, "isWatched") else False

    class Meta:
        model = Video
        fields = "__all__"


# ----------------------------------------------------------------------------


class VideoOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoOrder
        fields = "__all__"


# ----------------------------------------------------------------------------


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"


# ----------------------------------------------------------------------------


class CommentInteractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentInteraction
        fields = "__all__"


# ----------------------------------------------------------------------------
