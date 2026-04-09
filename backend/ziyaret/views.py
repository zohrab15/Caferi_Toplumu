from rest_framework import generics, permissions
from .models import Tour, TourRegistration
from .serializers import TourSerializer, TourRegistrationSerializer, AdminTourSerializer

class TourListView(generics.ListAPIView):
    queryset = Tour.objects.filter(is_active=True)
    serializer_class = TourSerializer
    permission_classes = [permissions.AllowAny]

class TourRegisterView(generics.CreateAPIView):
    serializer_class = TourRegistrationSerializer
    permission_classes = [permissions.AllowAny]

class TourRegistrationListView(generics.ListAPIView):
    """Admin only: tüm tur kayıtlarını listele"""
    serializer_class = TourRegistrationSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        return TourRegistration.objects.select_related('tour').all().order_by('-created_at')

class AdminTourListCreateView(generics.ListCreateAPIView):
    """Admin only: Tur ekleme ve listeleme"""
    queryset = Tour.objects.all().order_by('-date_start')
    serializer_class = AdminTourSerializer
    permission_classes = [permissions.IsAdminUser]

class AdminTourDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Admin only: Tur detayı güncelleme veya silme"""
    queryset = Tour.objects.all()
    serializer_class = AdminTourSerializer
    permission_classes = [permissions.IsAdminUser]
