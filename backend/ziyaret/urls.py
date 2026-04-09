from django.urls import path
from .views import TourListView, TourRegisterView, TourRegistrationListView, AdminTourListCreateView, AdminTourDetailView

urlpatterns = [
    path('tours/', TourListView.as_view(), name='api-tours'),
    path('register/', TourRegisterView.as_view(), name='api-tour-register'),
    path('registrations/', TourRegistrationListView.as_view(), name='api-tour-registrations'),
    path('admin/tours/', AdminTourListCreateView.as_view(), name='admin-tours-list-create'),
    path('admin/tours/<int:pk>/', AdminTourDetailView.as_view(), name='admin-tours-detail'),
]
