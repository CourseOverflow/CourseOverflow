from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from api.models import Playlist, PlaylistInteraction, Video, VideoOrder
from api.serializers import VideoSerializer


@api_view(["GET"])
@permission_classes([AllowAny])
def video_detail(request):
    try:
        playlistId = request.query_params.get("playlistId")
        video_orders = VideoOrder.objects.filter(
            playlistId=playlistId
        ).order_by("index")
        video_ids = [video_order.videoId_id for video_order in video_orders]
        videos = Video.objects.filter(id__in=video_ids)
        for video in videos:
            video.isWatched = False

        if request.user.is_authenticated:
            userId = request.user.id
            playlist_interaction = PlaylistInteraction.objects.filter(
                playlistId=playlistId, userId=userId
            ).first()

            if not playlist_interaction:
                playlist_interaction = PlaylistInteraction()
                playlist = Playlist.objects.get(id=playlistId)
                playlist.views += 1
                playlist.save()

            watched_indices = set(playlist_interaction.watched)
            for index, video in enumerate(videos):
                is_watched = index in watched_indices
                video.isWatched = is_watched

        serializer = VideoSerializer(videos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response(
            {"message": "failed to fetch video details", "error": str(e)},
            status=status.HTTP_400_BAD_REQUEST,
        )
