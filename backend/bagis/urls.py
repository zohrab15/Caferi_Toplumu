from django.urls import path
from .views import CampaignListView, DonateView

urlpatterns = [
    path('campaigns/', CampaignListView.as_view(), name='api-campaigns'),
    path('donate/', DonateView.as_view(), name='api-donate'),
]
