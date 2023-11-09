from rest_framework.response import Response
from rest_framework.decorators import api_view
from api.models import Playlist
from api.serializers import PlaylistSerializer


@api_view(['GET'])
def playlist(request):
    playlists = Playlist.objects.all()[:5]
    serializer = PlaylistSerializer(playlists, many=True)
    return Response(serializer.data)
