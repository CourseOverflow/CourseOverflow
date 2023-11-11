from rest_framework.response import Response
from rest_framework.decorators import api_view
from api.models import Playlist
from api.serializers import PlaylistSerializer


@api_view(['GET'])
def playlist(request):
    playlists = Playlist.objects.all()[:10]
    serializer = PlaylistSerializer(playlists, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def recent_uploads(request):
    playlists = Playlist.objects.order_by('-created_at')[:10]  # Sort by createdAt in descending order and get top 10
    serializer = PlaylistSerializer(playlists, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def recommended(request):
    playlists = Playlist.objects.order_by('created_at')[:10]  # Sort by createdAt in descending order and get top 10
    serializer = PlaylistSerializer(playlists, many=True)
    return Response(serializer.data)