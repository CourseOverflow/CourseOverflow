from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from api.models import Comment, User, CommentInteraction, Playlist
from api.serializers import CommentSerializer, UserSerializer


@api_view(['GET'])
def commentSection(request, userId, playlistId):
    user = User.objects.get(id=userId)
    comments = Comment.objects.filter(playlistId=playlistId)
    serialized_comments = []

    for comment in comments:
        if comment.commentId is None:
            try:
                comment_interaction = CommentInteraction.objects.get(
                    commentId=comment, userId=user)
            except CommentInteraction.DoesNotExist:
                comment_interaction = None

            comment_data = CommentSerializer(comment).data
            comment_data['thread'] = []
            user_data = UserSerializer(comment.userId).data
            comment_data['username'] = user_data['username']
            comment_data['userProfile'] = user_data['profilePicture']
            comment_data['isLiked'] = comment_interaction.isLiked if comment_interaction is not None else False
            comment_data['isDisliked'] = comment_interaction.isDisliked if comment_interaction is not None else False
            serialized_comments.append(comment_data)

    for comment in comments:
        if comment.commentId is not None:
            for parent_comment in serialized_comments:
                if parent_comment['id'] == comment.commentId.id:
                    try:
                        comment_interaction = CommentInteraction.objects.get(
                            commentId=comment, userId=user)
                    except CommentInteraction.DoesNotExist:
                        comment_interaction = None

                    reply_data = CommentSerializer(comment).data
                    user_data = UserSerializer(comment.userId).data
                    reply_data['username'] = user_data['username']
                    reply_data['userProfile'] = user_data['profilePicture']
                    reply_data['isLiked'] = comment_interaction.isLiked if comment_interaction is not None else False
                    reply_data['isDisliked'] = comment_interaction.isDisliked if comment_interaction is not None else False
                    parent_comment['thread'].append(reply_data)

    return Response(serialized_comments)


@api_view(['POST'])
def postComment(request):
    parentId = request.data['commentId'] if 'commentId' in request.data else None
    try:
        parentComment = Comment.objects.get(
            id=parentId) if parentId is not None else None
    except Comment.DoesNotExist:
        parentComment = None

    comment = Comment.objects.create(
        userId=User.objects.get(id=request.data['userId']),
        playlistId=Playlist.objects.get(id=request.data['playlistId']),
        commentId=parentComment,
        text=request.data['text']
    )
    serializer = CommentSerializer(comment)
    serialized_comment = serializer.data
    return Response(serialized_comment)


@api_view(['POST'])
def likeDislikeComment(request):
    try:
        user = User.objects.get(id=request.data['userId'])
        comment = Comment.objects.get(id=request.data['commentId'])

        comment.likes += request.data['newLikes']
        comment.dislikes += request.data['newDislikes']
        comment.save()

        comment_interaction, created = CommentInteraction.objects.get_or_create(
            commentId=comment,
            userId=user
        )

        comment_interaction.isLiked = request.data['isLiked']
        comment_interaction.isDisliked = request.data['isDisliked']
        comment_interaction.save()

        return Response('success')

    except Comment.DoesNotExist:
        return Response('Comment not found', status=status.HTTP_404_NOT_FOUND)
    except User.DoesNotExist:
        return Response('User not found', status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response(f'Error: {str(e)}', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
