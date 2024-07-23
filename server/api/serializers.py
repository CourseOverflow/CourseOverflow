from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from rest_framework import serializers

from .models import (
    Comment,
    CommentInteraction,
    Draft,
    Playlist,
    PlaylistInteraction,
    User,
    Video,
    VideoOrder,
)

User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = "__all__"


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


class DraftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Draft
        fields = "__all__"


class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = "__all__"


class PlaylistInteractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaylistInteraction
        fields = "__all__"


class VideoSerializer(serializers.ModelSerializer):
    isWatched = serializers.SerializerMethodField()

    def get_isWatched(self, video):
        return video.isWatched if hasattr(video, "isWatched") else False

    class Meta:
        model = Video
        fields = "__all__"


class VideoOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoOrder
        fields = "__all__"


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"


class CommentInteractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentInteraction
        fields = "__all__"
