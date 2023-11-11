from rest_framework.response import Response
from rest_framework.decorators import api_view
from api.models import Playlist, User
from api.serializers import PlaylistSerializer, UserSerializer


@api_view(['GET'])
def playlist(request):
    playlists = Playlist.objects.all()[:10]
    serializer = PlaylistSerializer(playlists, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def playlist_detail(request, pk):
    playlist = Playlist.objects.get(id=pk)
    serializer = PlaylistSerializer(playlist, many=False)
    author = User.objects.get(id=playlist.authorId.id)
    author_data = UserSerializer(author).data
    playlist_data = serializer.data
    playlist_data['authorName'] = author_data['username']
    playlist_data['authorProfile'] = author_data['profilePicture']
    return Response(playlist_data)

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
