from rest_framework.response import Response
from rest_framework.decorators import api_view
from api.models import Comment
from api.serializers import CommentSerializer


@api_view(['GET'])
def comment(request):
    comment = Comment.objects.all()[:5]
    serializer = CommentSerializer(comment, many=True)
    return Response(serializer.data)
