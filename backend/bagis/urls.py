from .views import CampaignListView, DonateView, AdminCampaignListCreateView, AdminCampaignDetailView

urlpatterns = [
    path('campaigns/', CampaignListView.as_view(), name='api-campaigns'),
    path('donate/', DonateView.as_view(), name='api-donate'),
    path('admin/campaigns/', AdminCampaignListCreateView.as_view(), name='admin-campaigns-list-create'),
    path('admin/campaigns/<int:pk>/', AdminCampaignDetailView.as_view(), name='admin-campaigns-detail'),
]
