from rest_framework.response import Response
from rest_framework.decorators import api_view
from api.models import Playlist, User, PlaylistInteraction
from api.serializers import PlaylistSerializer, UserSerializer
from rest_framework import status


@api_view(['GET'])
def getPlaylist(request, userId, playlistId):
    user = User.objects.get(id=userId)
    playlist = Playlist.objects.get(id=playlistId)
    serializer = PlaylistSerializer(playlist, many=False)
    playlist_interaction, created = PlaylistInteraction.objects.get_or_create(
        userId=user,
        playlistId=playlist
    )
    playlist_data = serializer.data
    playlist_data['isLiked'] = playlist_interaction.isLiked
    playlist_data['isDisliked'] = playlist_interaction.isDisliked
    playlist_data['isBookmarked'] = playlist_interaction.isBookmarked

    author = User.objects.get(id=playlist.authorId.id)
    author_data = UserSerializer(author).data
    playlist_data['authorName'] = author_data['username']
    playlist_data['authorProfile'] = author_data['profilePicture']

    return Response(playlist_data)


@api_view(['GET'])
def recommended(request):
    playlists = Playlist.objects.order_by('dislikes')[:10]
    serializer = PlaylistSerializer(playlists, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def popular(request):
    playlists = Playlist.objects.order_by('-likes')[:10]
    serializer = PlaylistSerializer(playlists, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def recent_uploads(request):
    playlists = Playlist.objects.order_by('-created_at')[:10]
    serializer = PlaylistSerializer(playlists, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def watched(request, userId, playlistId):
    try:
        user = User.objects.get(id=userId)
        playlist = Playlist.objects.get(id=playlistId)
        playlist_interaction, _ = PlaylistInteraction.objects.get_or_create(
            userId=user, playlistId=playlist)
        watchCount = len(playlist_interaction.watched)
        last_watched = playlist_interaction.lastWatched
    except User.DoesNotExist:
        return Response({
            'watchCount': 6,
            'lastWatched': 7
        })
    except Playlist.DoesNotExist:
        return Response({
            'watchCount': 7,
            'lastWatched': 6
        })
    return Response({
        'watchCount': watchCount,
        'lastWatched': last_watched
    })


@api_view(['POST'])
def setLastWatched(request):
    try:
        playlist_interaction = PlaylistInteraction.objects.get(
            userId=User.objects.get(id=request.data['userId']),
            playlistId=Playlist.objects.get(id=request.data['playlistId'])
        )
        playlist_interaction.lastWatched = request.data['lastWatched']
        playlist_interaction.save()
        return Response({'message': 'Last watched updated successfully'})
    except PlaylistInteraction.DoesNotExist:
        return Response({'message': 'Playlist interaction not found'}, status=404)


@api_view(['POST'])
def updateWatched(request):
    try:
        playlist_interaction = PlaylistInteraction.objects.get(
            userId=User.objects.get(id=request.data['userId']),
            playlistId=Playlist.objects.get(id=request.data['playlistId'])
        )
        if (request.data['add']):
            playlist_interaction.watched.append(request.data['index'])
        else:
            playlist_interaction.watched.remove(request.data['index'])
        playlist_interaction.save()
        return Response({'message': 'Watched updated successfully'})
    except PlaylistInteraction.DoesNotExist:
        return Response({'message': 'Playlist interaction not found'}, status=404)


@api_view(['POST'])
def updateLikeDislike(request):
    try:
        playlist_interaction, created = PlaylistInteraction.objects.get_or_create(
            userId=User.objects.get(id=request.data['userId']),
            playlistId=Playlist.objects.get(id=request.data['playlistId']),
        )
        playlist_interaction.isLiked = request.data['liked']
        playlist_interaction.isDisliked = request.data['disliked']
        playlist_interaction.save()

        playlist = Playlist.objects.get(id=request.data['playlistId'])
        playlist.likes += request.data['newLikes']
        playlist.dislikes += request.data['newDislikes']
        playlist.save()

        return Response({'message': 'Like/Dislike updated successfully'})
    except PlaylistInteraction.DoesNotExist:
        return Response({'message': 'Playlist interaction not found'}, status=404)


@api_view(['POST'])
def create_playlist(request):
    if request.method == 'POST':
        title = request.data.get('title')
        author_id = request.data.get('authorId')
        playlistThumbnail = request.data.get('playlistThumbnail')

        playlist_data = {
            'title': title,
            'desc': request.data.get('desc', None),
            'thumbnail': request.data.get('playlistThumbnail', "https://picsum.photos/300/200"),
            'cloudinaryPublicId': request.data.get('cloudinaryPublicId', None),
            'likes': 0,
            'dislikes': 0,
            'duration': 0,
            'views': 0,
            'isDraft': True,
            'coursePDF': '',
            'authorId': author_id,
        }

        serializer = PlaylistSerializer(data=playlist_data)

        if serializer.is_valid():
            playlist = serializer.save()
            response_data = PlaylistSerializer(playlist).data
            return Response(response_data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
