from rest_framework.response import Response
from rest_framework.decorators import api_view
from api.models import Video
from api.serializers import VideoSerializer


@api_view(['GET'])
def video(request):
    videos = Video.objects.all()[:20]
    serializer = VideoSerializer(videos, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def video_detail(request, pk):
    video = Video.objects.get(id=pk)
    serializer = VideoSerializer(video, many=False)
    return Response(serializer.data)
