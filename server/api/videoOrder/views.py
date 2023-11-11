from rest_framework.response import Response
from rest_framework.decorators import api_view
from api.models import VideoOrder
from api.serializers import VideoOrderSerializer


@api_view(['GET'])
def videoOrder(request):
    orders = VideoOrder.objects.all()[:5]
    serializer = VideoOrderSerializer(orders, many=True)
    return Response(serializer.data)
