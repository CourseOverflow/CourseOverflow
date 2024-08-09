from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from api.models import Comment, CommentInteraction, Playlist
from api.serializers import CommentSerializer, UserSerializer


@api_view(["GET"])
@permission_classes([AllowAny])
def commentSection(request):
    user = None
    if request.user.is_authenticated:
        user = request.user

    comments = Comment.objects.filter(playlistId=request.GET["playlistId"])
    serialized_comments = []

    for comment in comments:
        if comment.commentId is None:
            try:
                comment_interaction = CommentInteraction.objects.get(
                    commentId=comment, userId=user
                )
            except CommentInteraction.DoesNotExist:
                comment_interaction = None

            comment_data = CommentSerializer(comment).data
            comment_data["thread"] = []
            user_data = UserSerializer(comment.userId).data
            comment_data["username"] = user_data["username"]
            comment_data["userProfile"] = user_data["profilePicture"]
            comment_data["isLiked"] = (
                comment_interaction.isLiked
                if comment_interaction is not None
                else False
            )
            comment_data["isDisliked"] = (
                comment_interaction.isDisliked
                if comment_interaction is not None
                else False
            )
            serialized_comments.append(comment_data)

    for comment in comments:
        if comment.commentId is not None:
            for parent_comment in serialized_comments:
                if parent_comment["id"] == comment.commentId.id:
                    try:
                        comment_interaction = CommentInteraction.objects.get(
                            commentId=comment, userId=user
                        )
                    except CommentInteraction.DoesNotExist:
                        comment_interaction = None

                    reply_data = CommentSerializer(comment).data
                    user_data = UserSerializer(comment.userId).data
                    reply_data["username"] = user_data["username"]
                    reply_data["userProfile"] = user_data["profilePicture"]
                    reply_data["isLiked"] = (
                        comment_interaction.isLiked
                        if comment_interaction is not None
                        else False
                    )
                    reply_data["isDisliked"] = (
                        comment_interaction.isDisliked
                        if comment_interaction is not None
                        else False
                    )
                    parent_comment["thread"].append(reply_data)

    return Response(serialized_comments)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def postComment(request):
    parentId = (
        request.data["commentId"] if "commentId" in request.data else None
    )
    try:
        parentComment = (
            Comment.objects.get(id=parentId) if parentId is not None else None
        )
    except Comment.DoesNotExist:
        parentComment = None

    comment = Comment.objects.create(
        userId=request.user,
        playlistId=Playlist.objects.get(id=request.data["playlistId"]),
        commentId=parentComment,
        text=request.data["text"],
    )
    serializer = CommentSerializer(comment)
    serialized_comment = serializer.data
    return Response(serialized_comment)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def updateLikeDislike(request):
    try:
        user = request.user
        comment = Comment.objects.get(id=request.data["commentId"])

        comment.likes += request.data["newLikes"]
        comment.dislikes += request.data["newDislikes"]
        comment.save()

        comment_interaction, _ = CommentInteraction.objects.get_or_create(
            commentId=comment, userId=user
        )

        comment_interaction.isLiked = request.data["isLiked"]
        comment_interaction.isDisliked = request.data["isDisliked"]
        comment_interaction.save()

        return Response("success")

    except Comment.DoesNotExist:
        return Response("Comment not found", status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response(
            f"Error: {str(e)}", status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
