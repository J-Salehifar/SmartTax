from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Taxpayer, Case
from .serializers import TaxpayerSerializer, CaseSerializer

class TaxpayerListCreateView(generics.ListCreateAPIView):
    queryset = Taxpayer.objects.all()
    serializer_class = TaxpayerSerializer

class CaseListCreateView(generics.ListCreateAPIView):
    serializer_class = CaseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Case.objects.filter(user=self.request.user).order_by('-created_at')

    def get_serializer_context(self):
        return {'request': self.request}
