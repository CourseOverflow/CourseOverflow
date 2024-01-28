from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from api.models import Video, VideoOrder, PlaylistInteraction
from api.serializers import VideoSerializer


@api_view(['GET'])
def video_detail(request):
    playlistId = request.query_params.get('playlistId')
    video_orders = VideoOrder.objects.filter(
        playlistId=playlistId).order_by('index')
    video_ids = [video_order.videoId_id for video_order in video_orders]
    videos = Video.objects.filter(id__in=video_ids)
    for video in videos:
        video.isWatched = False

    if request.user.is_authenticated:
        userId = request.user.id
        playlist_interaction = PlaylistInteraction.objects.filter(
            playlistId=playlistId, userId=userId).first()

        if not playlist_interaction:
            playlist_interaction = PlaylistInteraction()

        watched_indices = playlist_interaction.watched
        for index, video in enumerate(videos):
            is_watched = index in watched_indices
            video.isWatched = is_watched

    serializer = VideoSerializer(videos, many=True)
    return Response(serializer.data)
