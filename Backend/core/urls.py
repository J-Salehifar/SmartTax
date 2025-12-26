from django.urls import path
from .views import TaxpayerListCreateView, CaseListCreateView

urlpatterns = [
    path('taxpayers/', TaxpayerListCreateView.as_view(), name='taxpayer-list'),
    path('cases/', CaseListCreateView.as_view(), name='case-list'),
]
