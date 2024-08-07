from datetime import timedelta

from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.models import Draft
from api.serializers import DraftSerializer
from utils.geminiAPI import uploadPDF
from utils.youtubeAPI import generatePlaylist


@api_view(["GET"])
def get_draft(request):
    if not request.user.is_authenticated:
        return Response(
            {"message": "User not authenticated"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    user = request.user
    draft_id = request.query_params.get("draftId")
    if draft_id is None:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    try:
        draft = Draft.objects.get(id=draft_id)
        serializer = DraftSerializer(draft, many=False)
        response_data = serializer.data
        response_data["draftId"] = draft.id
        response_data.pop("id")
        if draft.authorId.id != user.id:
            return Response(
                {"message": "User not authorized to view this draft"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        return Response(response_data, status=status.HTTP_200_OK)
    except Draft.DoesNotExist:
        return Response(
            {"message": "Draft not found"}, status=status.HTTP_404_NOT_FOUND
        )


@api_view(["GET"])
def get_all_drafts(request):
    if not request.user.is_authenticated:
        return Response(
            {"message": "User not authenticated"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    user = request.user
    try:
        drafts = Draft.objects.filter(authorId=user)
        serializer = DraftSerializer(drafts, many=True)
        return Response(serializer.data)
    except Draft.DoesNotExist:
        return Response(
            {"message": "Draft not found"}, status=status.HTTP_404_NOT_FOUND
        )


@api_view(["POST"])
def update_draft(request):
    if not request.user.is_authenticated:
        return Response(
            {"message": "User not authenticated"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    draft_id = request.data.get("draftId")
    user = request.user
    try:
        draft = Draft.objects.get(id=draft_id)
    except Draft.DoesNotExist:
        draft = Draft()

    if draft.authorId_id and draft.authorId_id != user.id:
        return Response(
            {"message": "User not authorized to update this draft"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    draft.title = request.data.get("title")
    draft.desc = request.data.get("desc", None)
    draft.thumbnail = request.data.get(
        "thumbnail", "https://picsum.photos/300/200"
    )
    draft.cloudinaryPublicId = request.data.get("cloudinaryPublicId", None)
    draft.topicList = request.data.get("topicList", [])
    draft.videoList = request.data.get("videoList", [])
    draft.duration = timedelta(0)
    draft.coursePDF = request.data.get("coursePDF", None)
    draft.authorId = user
    draft.save()

    serializer = DraftSerializer(instance=draft, data=request.data)
    if serializer.is_valid():
        response_data = {"draftId": draft.id}
        return Response(response_data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def fetch_videos(request):
    if not request.user.is_authenticated:
        return Response(
            {"message": "User not authenticated"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    draft_id = request.query_params.get("draftId")
    draft = Draft.objects.get(id=draft_id)
    if draft.authorId.id != request.user.id:
        return Response(
            {"message": "User not authorized to modify this draft"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    video_list = generatePlaylist(draft.topicList)
    draft.videoList = video_list
    draft.save()
    return Response(video_list, status=status.HTTP_201_CREATED)


@api_view(["DELETE"])
def delete_draft(request):
    if not request.user.is_authenticated:
        return Response(
            {"message": "User not authenticated"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    draft_id = request.data.get("draftId")
    try:
        draft = Draft.objects.get(id=draft_id)
        if draft.authorId.id != request.user.id:
            return Response(
                {"message": "User not authorized to modify this draft"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        draft.delete()
    except Draft.DoesNotExist:
        pass
    return Response(status=status.HTTP_200_OK)


@api_view(["POST"])
def upload_pdf(request):
    try:
        file_type = request.data.get("fileType")
        file = request.data.get("file")

        topic_list = uploadPDF(file, file_type)
        return Response(topic_list, status=status.HTTP_201_CREATED)

    except Exception:
        return Response(
            {"message": "Error uploading PDF"},
            status=status.HTTP_400_BAD_REQUEST,
        )
