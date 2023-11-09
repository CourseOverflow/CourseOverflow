from rest_framework.response import Response
from rest_framework.decorators import api_view
from api.models import CommentInteraction
from api.serializers import CommentInteractionSerializer


@api_view(['GET'])
def commentInteraction(request):
    interactions = CommentInteraction.objects.all()[:5]
    serializer = CommentInteractionSerializer(interactions, many=True)
    return Response(serializer.data)
