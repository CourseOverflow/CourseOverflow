from rest_framework.response import Response
from rest_framework.decorators import api_view
from api.models import Video, VideoOrder
from api.serializers import VideoSerializer


@api_view(['GET'])
def video_detail(request, playlistId):
    video_orders = VideoOrder.objects.filter(
        playlistId=playlistId).order_by('index')
    video_ids = [video_order.videoId_id for video_order in video_orders]
    videos = Video.objects.filter(id__in=video_ids)
    serializer = VideoSerializer(videos, many=True)
    return Response(serializer.data)
