from rest_framework import generics, permissions
from .models import Campaign
from .serializers import CampaignSerializer, DonationSerializer

class CampaignListView(generics.ListAPIView):
    queryset = Campaign.objects.filter(is_active=True)
    serializer_class = CampaignSerializer
    permission_classes = [permissions.AllowAny]

class DonateView(generics.CreateAPIView):
    serializer_class = DonationSerializer
    permission_classes = [permissions.AllowAny]
