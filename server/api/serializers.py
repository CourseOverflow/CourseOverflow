from rest_framework import serializers
from .models import User, Playlist, PlaylistInteraction, Video, VideoOrder, Comment, CommentInteraction


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = '__all__'


class PlaylistInteractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaylistInteraction
        fields = '__all__'


class VideoSerializer(serializers.ModelSerializer):
    isWatched = serializers.SerializerMethodField()  # Define a SerializerMethodField

    class Meta:
        model = Video
        fields = ['id', 'title', 'author', 'thumbnail', 'duration',
                  'youtubeHash', 'likes', 'dislikes', 'description', 'isWatched']

    def get_isWatched(self, obj):
        # Retrieve the 'isWatched' attribute from the object (video)
        return obj.isWatched if hasattr(obj, 'isWatched') else False


class VideoOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoOrder
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class CommentInteractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentInteraction
        fields = '__all__'
