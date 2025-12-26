
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services import predict_tax

@api_view(['POST'])
def predict_view(request):
    result = predict_tax(request.data)
    return Response(result)
