from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from api.models import User, Draft
from api.serializers import DraftSerializer
from datetime import timedelta
from utils.youtubeAPI import generatePlaylist


@api_view(['GET'])
def get_draft(request):
    draft_id = request.query_params.get('draftId')
    if draft_id is None:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    try:
        draft = Draft.objects.get(id=draft_id)
        serializer = DraftSerializer(draft, many=False)
        response_data = serializer.data
        response_data['draftId'] = draft.id
        response_data.pop('id')
        return Response(response_data, status=status.HTTP_200_OK)
    except Draft.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_all_drafts(request):
    author_id = request.query_params.get('userId')
    try:
        drafts = Draft.objects.filter(authorId=author_id)
        serializer = DraftSerializer(drafts, many=True)
        return Response(serializer.data)
    except Draft.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def update_draft(request):
    draft_id = request.data.get('draftId')
    author_id = request.data.get('authorId')
    author = User.objects.get(id=author_id)
    try:
        draft = Draft.objects.get(id=draft_id)
    except Draft.DoesNotExist:
        draft = Draft()

    draft.title = request.data.get('title')
    draft.desc = request.data.get('desc', None)
    draft.thumbnail = request.data.get(
        'thumbnail', "https://picsum.photos/300/200")
    draft.cloudinaryPublicId = request.data.get('cloudinaryPublicId', None)
    draft.topicList = request.data.get('topicList', [])
    draft.videoList = request.data.get('videoList', [])
    draft.duration = timedelta(0)
    draft.coursePDF = request.data.get('coursePDF', None)
    draft.authorId = author
    draft.save()

    serializer = DraftSerializer(instance=draft, data=request.data)
    if serializer.is_valid():
        response_data = {'draftId': draft.id}
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
    return Response(video_list, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
def delete_draft(request):
    draft_id = request.data.get('draftId')
    try:
        draft = Draft.objects.get(id=draft_id)
        draft.delete()
    except Draft.DoesNotExist:
        pass
    return Response(status=status.HTTP_200_OK)
