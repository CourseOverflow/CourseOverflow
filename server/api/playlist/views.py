from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from api.models import Playlist, VideoOrder, User, PlaylistInteraction, Draft
from api.serializers import PlaylistSerializer, UserSerializer, VideoSerializer, VideoOrderSerializer
from rest_framework import status
from django.db.models import Q, Count
from datetime import datetime, timedelta


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
def search(request):
    userId = request.query_params.get('userId')
    query = request.query_params.get('query')
    playlists = Playlist.objects.filter(
        Q(title__icontains=query) |
        Q(authorId__name__icontains=query) |
        Q(desc__icontains=query)
    )
    serializer = PlaylistSerializer(playlists, many=True)
    user = User.objects.get(id=userId)
    for playlist in serializer.data:
        playlist_interaction, created = PlaylistInteraction.objects.get_or_create(
            userId=user,
            playlistId=playlist['id']
        )
        playlist['isLiked'] = playlist_interaction.isLiked
        playlist['isDisliked'] = playlist_interaction.isDisliked
        playlist['isBookmarked'] = playlist_interaction.isBookmarked
        playlist['watchCount'] = len(playlist_interaction.watched)
        video_count = VideoOrder.objects.filter(
            playlistId=playlist['id']).count()
        playlist['videoCount'] = video_count
        playlist['authorName'] = user.name
        playlist['authorProfile'] = user.profilePicture
    return Response(serializer.data)


@api_view(['GET'])
def recommended(request):
    user = User.objects.get(id=request.query_params['userId'])
    liked_playlists = PlaylistInteraction.objects.filter(
        userId=user, isLiked=True).values_list('playlistId', flat=True)
    similar_users = PlaylistInteraction.objects.filter(
        playlistId__in=liked_playlists, isLiked=True
    ).values('userId').annotate(common_likes=Count('playlistId')).order_by('-common_likes')[:5]
    recommended_playlists = PlaylistInteraction.objects.filter(
        userId__in=[user['userId'] for user in similar_users], isLiked=True
    ).exclude(playlistId__in=liked_playlists).values('playlistId').annotate(likes=Count('userId')).order_by('-likes')[:10]
    if not recommended_playlists:
        popular_playlists = Playlist.objects.order_by('-likes')[:10]
        serializer = PlaylistSerializer(popular_playlists, many=True)
    else:
        recommended_playlists = Playlist.objects.filter(
            id__in=[playlist['playlistId']
                    for playlist in recommended_playlists]
        )
        serializer = PlaylistSerializer(recommended_playlists, many=True)

    for playlist in serializer.data:
        playlist_interaction, created = PlaylistInteraction.objects.get_or_create(
            userId=user,
            playlistId=playlist['id']
        )
        playlist['isLiked'] = playlist_interaction.isLiked
        playlist['isDisliked'] = playlist_interaction.isDisliked
        playlist['isBookmarked'] = playlist_interaction.isBookmarked
        playlist['watchCount'] = len(playlist_interaction.watched)
        video_count = VideoOrder.objects.filter(
            playlistId=playlist['id']).count()
        playlist['videoCount'] = video_count
        playlist['authorName'] = user.name
        playlist['authorProfile'] = user.profilePicture

    return Response(serializer.data)


@api_view(['GET'])
def popular(request):
    user = User.objects.get(id=request.query_params['userId'])
    playlists = Playlist.objects.order_by('-likes')[:10]
    serializer = PlaylistSerializer(playlists, many=True)
    for playlist in serializer.data:
        playlist_interaction, created = PlaylistInteraction.objects.get_or_create(
            userId=user,
            playlistId=playlist['id']
        )
        playlist['isLiked'] = playlist_interaction.isLiked
        playlist['isDisliked'] = playlist_interaction.isDisliked
        playlist['isBookmarked'] = playlist_interaction.isBookmarked
        playlist['watchCount'] = len(playlist_interaction.watched)
        video_count = VideoOrder.objects.filter(
            playlistId=playlist['id']).count()
        playlist['videoCount'] = video_count
        playlist['authorName'] = user.name
        playlist['authorProfile'] = user.profilePicture

    return Response(serializer.data)


@api_view(['GET'])
def recent_uploads(request):
    user = User.objects.get(id=request.query_params['userId'])
    playlists = Playlist.objects.order_by('-created_at')[:10]
    serializer = PlaylistSerializer(playlists, many=True)
    for playlist in serializer.data:
        playlist_interaction, created = PlaylistInteraction.objects.get_or_create(
            userId=user,
            playlistId=playlist['id']
        )
        playlist['isLiked'] = playlist_interaction.isLiked
        playlist['isDisliked'] = playlist_interaction.isDisliked
        playlist['isBookmarked'] = playlist_interaction.isBookmarked
        playlist['watchCount'] = len(playlist_interaction.watched)
        video_count = VideoOrder.objects.filter(
            playlistId=playlist['id']).count()
        playlist['videoCount'] = video_count
        playlist['authorName'] = user.name
        playlist['authorProfile'] = user.profilePicture

    return Response(serializer.data)


@api_view(['GET'])
def user_playlists(request):
    user = User.objects.get(id=request.query_params['userId'])
    playlists = Playlist.objects.filter(authorId=user)
    serializer = PlaylistSerializer(playlists, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def user_liked_playlists(request):
    user = User.objects.get(id=request.query_params['userId'])
    playlists = Playlist.objects.filter(
        playlistinteraction__userId=user, playlistinteraction__isLiked=True)
    serializer = PlaylistSerializer(playlists, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def user_bookmarked_playlists(request):
    user = User.objects.get(id=request.query_params['userId'])
    playlists = Playlist.objects.filter(
        playlistinteraction__userId=user, playlistinteraction__isBookmarked=True)
    serializer = PlaylistSerializer(playlists, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def watch_count(request, userId, playlistId):
    try:
        user = User.objects.get(id=userId)
        playlist = Playlist.objects.get(id=playlistId)
        playlist_interaction, _ = PlaylistInteraction.objects.get_or_create(
            userId=user, playlistId=playlist)
        watchCount = len(playlist_interaction.watched)
    except User.DoesNotExist:
        return Response({
            'watchCount': 404,
        })
    except Playlist.DoesNotExist:
        return Response({
            'watchCount': 404,
        })
    return Response({
        'watchCount': watchCount,
    })


@api_view(['GET'])
def getLastWatched(request):
    try:
        user = User.objects.get(id=request.query_params['userId'])
        playlist = Playlist.objects.get(id=request.query_params['playlistId'])
        playlist_interaction, _ = PlaylistInteraction.objects.get_or_create(
            userId=user,
            playlistId=playlist,
            defaults={'lastWatched': 0}
        )
        return Response({'lastWatched': playlist_interaction.lastWatched})
    except Playlist.DoesNotExist:
        return Response({'message': 'Playlist not found'}, status=404)


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


@api_view(['GET'])
def create_playlist(request):
    draft_id = request.query_params.get('draftId')
    draft = Draft.objects.get(id=draft_id)

    playlist_data = {
        'title': draft.title,
        'desc': draft.desc,
        'thumbnail': draft.thumbnail,
        'cloudinaryPublicId': draft.cloudinaryPublicId,
        'likes': 0,
        'dislikes': 0,
        'duration': timedelta(0),
        'views': 0,
        'coursePDF': '',
        'authorId': draft.authorId.id,
    }

    playlist_serializer = PlaylistSerializer(data=playlist_data)
    if playlist_serializer.is_valid():
        playlist = playlist_serializer.save()

        total_duration = timedelta(0)
        for index, video in enumerate(draft.videoList):
            video_data = {
                'title': video['title'],
                'author': video['author'],
                'thumbnail': video['thumbnail'],
                'duration': datetime.strptime(video['duration'], '%H:%M:%S').time(),
                'youtubeHash': video['video_id'],
                'description': video['description'],
            }

            video_serializer = VideoSerializer(data=video_data)
            if video_serializer.is_valid():
                video = video_serializer.save()
                total_duration += video.duration

                video_order_data = {
                    'index': index,
                    'playlistId': playlist.id,
                    'videoId': video.id,
                }
                video_order_serializer = VideoOrderSerializer(
                    data=video_order_data)
                if video_order_serializer.is_valid():
                    video_order_serializer.save()

        playlist.duration = total_duration
        total_seconds = int(total_duration.total_seconds())
        hours, remainder = divmod(total_seconds, 3600)
        minutes, seconds = divmod(remainder, 60)
        print(
            f'Total Duration: {hours} hours, {minutes} minutes, {seconds} seconds')
        playlist.save()
        draft.delete()

        response_data = {'playlistId': playlist.id}
        return Response(response_data, status=status.HTTP_201_CREATED)
    return Response(playlist_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
