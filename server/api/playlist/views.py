from rest_framework.response import Response
from rest_framework.decorators import api_view
from api.models import Playlist, User
from api.serializers import PlaylistSerializer, UserSerializer
from rest_framework import status

@api_view(['GET'])
def playlist(request):
    playlists = Playlist.objects.filter(isDraft=False)[:10]
    serializer = PlaylistSerializer(playlists, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def playlist_detail(request, pk):
    playlist = Playlist.objects.get(id=pk, isDraft=False)
    serializer = PlaylistSerializer(playlist, many=False)
    author = User.objects.get(id=playlist.authorId.id)
    author_data = UserSerializer(author).data
    playlist_data = serializer.data
    playlist_data['authorName'] = author_data['username']
    playlist_data['authorProfile'] = author_data['profilePicture']
    return Response(playlist_data)

@api_view(['GET'])
def recent_uploads(request):
    playlists = Playlist.objects.filter(isDraft=False).order_by('-created_at')[:10]
    serializer = PlaylistSerializer(playlists, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def recommended(request):
    playlists = Playlist.objects.filter(isDraft=False).order_by('created_at')[:10]
    serializer = PlaylistSerializer(playlists, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_playlist(request):
    if request.method == 'POST':
        # Extracting required fields from the request data
        title = request.data.get('title')
        author_id = request.data.get('authorId')
        playlistThumbnail = request.data.get('playlistThumbnail')
        print(playlistThumbnail)
        # Creating a dictionary with the required and default values
        playlist_data = {
            'title': title,
            'desc': request.data.get('desc', None),  # Optional, default is None
            'thumbnail': request.data.get('playlistThumbnail', "https://picsum.photos/300/200"),  # Optional, default is None
            'cloudinaryPublicId': request.data.get('cloudinaryPublicId', None),
            'likes': 0,  # Default value
            'dislikes': 0,  # Default value
            'duration': 0,  # Default value
            'views': 0,  # Default value
            'isDraft': True,  # Default value
            'coursePDF': '',  # Default value (null string)
            'authorId': author_id,
        }

        serializer = PlaylistSerializer(data=playlist_data)

        if serializer.is_valid():
            # Save the playlist with the provided and default values
            playlist = serializer.save()

            # Return the serialized data of the created playlist
            response_data = PlaylistSerializer(playlist).data
            return Response(response_data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
