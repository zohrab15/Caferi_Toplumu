from django.urls import path
from .views import AnnouncementListView, HelpRequestListView, AnnouncementCreateView, HelpRequestCreateView, AnnouncementDeleteView

urlpatterns = [
    path('announcements/', AnnouncementListView.as_view(), name='api-announcements'),
    path('announcements/create/', AnnouncementCreateView.as_view(), name='api-announcements-create'),
    path('announcements/<int:pk>/delete/', AnnouncementDeleteView.as_view(), name='api-announcements-delete'),
    path('help-requests/', HelpRequestListView.as_view(), name='api-help-requests'),
    path('help-requests/create/', HelpRequestCreateView.as_view(), name='api-help-requests-create'),
]

