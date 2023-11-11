from rest_framework.response import Response
from rest_framework.decorators import api_view
from api.models import Comment, User
from api.serializers import CommentSerializer, UserSerializer


@api_view(['GET'])
def commentSection(request, playlistId):
    comments = Comment.objects.filter(playlistId=playlistId)
    serialized_comments = []

    for comment in comments:
        if comment.commentId is None:
            comment_data = CommentSerializer(comment).data
            comment_data['thread'] = []
            user = User.objects.get(id=comment.userId.id)
            user_data = UserSerializer(user).data
            comment_data['username'] = user_data['username']
            comment_data['userProfile'] = user_data['profilePicture']

            serialized_comments.append(comment_data)

    for comment in comments:
        if comment.commentId is not None:
            for parent_comment in serialized_comments:
                if parent_comment['id'] == comment.commentId.id:
                    reply_data = CommentSerializer(comment).data
                    user = User.objects.get(id=comment.userId.id)
                    user_data = UserSerializer(user).data
                    reply_data['username'] = user_data['username']
                    reply_data['userProfile'] = user_data['profilePicture']
                    parent_comment['thread'].append(reply_data)

    return Response(serialized_comments)
