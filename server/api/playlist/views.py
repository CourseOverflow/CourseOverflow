from rest_framework.response import Response
from rest_framework.decorators import api_view
from api.models import Playlist, User, PlaylistInteraction
from api.serializers import PlaylistSerializer, UserSerializer


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
def setLastWatched(request, userId, playlistId):
    last_watched_idx = request.data.get('lastWatched', None)
    if last_watched_idx is not None:
        try:
            playlist_interaction = PlaylistInteraction.objects.get(
                userId=userId, playlistId=playlistId)
            playlist_interaction.lastWatched = last_watched_idx
            playlist_interaction.save()
            return Response({'message': 'Last watched updated successfully'})
        except PlaylistInteraction.DoesNotExist:
            return Response({'message': 'Playlist interaction not found'}, status=404)
    else:
        return Response({'message': 'Invalid data sent'}, status=400)


@api_view(['POST'])
def addWatched(request, userId, playlistId, index):
    try:
        playlist_interaction = PlaylistInteraction.objects.get(
            userId=userId, playlistId=playlistId)
        playlist_interaction.watched.append(index)
        playlist_interaction.save()
        return Response({'message': 'Watched updated successfully'})
    except PlaylistInteraction.DoesNotExist:
        return Response({'message': 'Playlist interaction not found'}, status=404)


@api_view(['POST'])
def deleteWatched(request, userId, playlistId, index):
    try:
        playlist_interaction = PlaylistInteraction.objects.get(
            userId=userId, playlistId=playlistId)
        playlist_interaction.watched.remove(index)
        playlist_interaction.save()
        return Response({'message': 'Watched updated successfully'})
    except PlaylistInteraction.DoesNotExist:
        return Response({'message': 'Playlist interaction not found'}, status=404)
