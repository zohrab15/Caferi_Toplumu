from django.urls import path
from .views import AnnouncementListView, HelpRequestListView, AnnouncementCreateView, HelpRequestCreateView

urlpatterns = [
    path('announcements/', AnnouncementListView.as_view(), name='api-announcements'),
    path('announcements/create/', AnnouncementCreateView.as_view(), name='api-announcements-create'),
    path('help-requests/', HelpRequestListView.as_view(), name='api-help-requests'),
    path('help-requests/create/', HelpRequestCreateView.as_view(), name='api-help-requests-create'),
]
