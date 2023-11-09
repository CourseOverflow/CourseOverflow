from rest_framework.response import Response
from rest_framework.decorators import api_view
from api.models import PlaylistInteraction
from api.serializers import PlaylistInteractionSerializer


@api_view(['GET'])
def playlistInteraction(request):
    interactions = PlaylistInteraction.objects.all()[:5]
    serializer = PlaylistInteractionSerializer(interactions, many=True)
    return Response(serializer.data)
