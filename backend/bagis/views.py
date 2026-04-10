from rest_framework import generics, permissions
from .models import Campaign
from .serializers import CampaignSerializer, DonationSerializer, AdminCampaignSerializer

class CampaignListView(generics.ListAPIView):
    queryset = Campaign.objects.filter(is_active=True)
    serializer_class = CampaignSerializer
    permission_classes = [permissions.AllowAny]

class AdminCampaignListCreateView(generics.ListCreateAPIView):
    queryset = Campaign.objects.all()
    serializer_class = AdminCampaignSerializer
    permission_classes = [permissions.IsAdminUser]

class AdminCampaignDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Campaign.objects.all()
    serializer_class = AdminCampaignSerializer
    permission_classes = [permissions.IsAdminUser]

class DonateView(generics.CreateAPIView):
    serializer_class = DonationSerializer
    permission_classes = [permissions.AllowAny]
