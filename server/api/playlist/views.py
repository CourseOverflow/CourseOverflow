from rest_framework.response import Response
from rest_framework.decorators import api_view
from api.models import Playlist, User, PlaylistInteraction, VideoOrder, Draft
from api.serializers import PlaylistSerializer, UserSerializer, VideoSerializer, VideoOrderSerializer, DraftSerializer
from rest_framework import status
from datetime import datetime, timedelta
from utils.youtubeAPI import generatePlaylist


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
            'watchCount': 404,
            'lastWatched': 404
        })
    except Playlist.DoesNotExist:
        return Response({
            'watchCount': 404,
            'lastWatched': 404
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
def create_draft(request):
    draft_data = {
        'title': request.data.get('title'),
        'desc': request.data.get('desc', None),
        'thumbnail': request.data.get('playlistThumbnail', "https://picsum.photos/300/200"),
        'cloudinaryPublicId': request.data.get('cloudinaryPublicId', None),
        'topicList': request.data.get('topicList', []),
        'videoList': request.data.get('videoList', []),
        'duration': timedelta(0),
        'coursePDF': '',
        'authorId': request.data.get('authorId'),
    }

    serializer = DraftSerializer(data=draft_data)

    if serializer.is_valid():
        draft = serializer.save()
        response_data = DraftSerializer(draft).data
        return Response(response_data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def update_draft(request):
    draft_id = request.data.get('draftId')
    try:
        draft = Draft.objects.get(id=draft_id)
    except Draft.DoesNotExist:
        return Response({'error': 'Draft not found'}, status=status.HTTP_404_NOT_FOUND)

    draft.title = request.data.get('title', draft.title)
    draft.desc = request.data.get('desc', draft.desc)
    draft.thumbnail = request.data.get('playlistThumbnail', draft.thumbnail)
    draft.cloudinaryPublicId = request.data.get(
        'cloudinaryPublicId', draft.cloudinaryPublicId)
    draft.topicList = request.data.get('topicList', draft.topicList)

    serializer = DraftSerializer(instance=draft, data=request.data)
    if serializer.is_valid():
        updated_draft = serializer.save()
        response_data = DraftSerializer(updated_draft).data
        return Response(response_data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def fetch_videos(request):
    draft_id = request.query_params.get('draftId')
    draft = Draft.objects.get(id=draft_id)
    video_list = generatePlaylist(draft.topicList)
    draft.videoList = video_list
    draft.save()

    serializer = DraftSerializer(instance=draft)
    response_data = serializer.data
    return Response(response_data, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
def delete_draft(request):
    draft_id = request.data.get('draftId')
    draft = Draft.objects.get(id=draft_id)
    draft.delete()
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def create_playlist(request):
    draft_id = request.data.get('draftId')
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
        # draft.delete()

        return Response(PlaylistSerializer(playlist).data, status=status.HTTP_201_CREATED)
    return Response(playlist_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
