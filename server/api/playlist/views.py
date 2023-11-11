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
def playlist_detail(request, pk):
    playlist = Playlist.objects.get(id=pk)
    serializer = PlaylistSerializer(playlist, many=False)
    return Response(serializer.data)
