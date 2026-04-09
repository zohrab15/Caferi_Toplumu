from rest_framework import generics, permissions
from .models import Announcement, HelpRequest
from .serializers import AnnouncementSerializer, HelpRequestSerializer
from rest_framework.response import Response
from rest_framework.views import APIView

class AnnouncementListView(generics.ListAPIView):
    queryset = Announcement.objects.filter(is_active=True)
    serializer_class = AnnouncementSerializer
    permission_classes = [permissions.AllowAny]

class AnnouncementCreateView(generics.CreateAPIView):
    """Admin only: yeni duyuru ekle"""
    serializer_class = AnnouncementSerializer
    permission_classes = [permissions.IsAdminUser]

class AnnouncementDeleteView(generics.DestroyAPIView):
    """Admin only: duyuruyu sil (soft delete — is_active=False)"""
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer
    permission_classes = [permissions.IsAdminUser]

    def perform_destroy(self, instance):
        # Soft delete: is_active = False
        instance.is_active = False
        instance.save()


class HelpRequestListView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        categories = ['Kan Bağışı', 'İş İlanları', 'Öğrenci Desteği', 'Genel Yardım']
        icons = {
            'Kan Bağışı': '🩸',
            'İş İlanları': '💼',
            'Öğrenci Desteği': '🎓',
            'Genel Yardım': '🤝'
        }
        
        result = []
        for cat in categories:
            items = HelpRequest.objects.filter(category=cat, is_resolved=False)
            data = HelpRequestSerializer(items, many=True).data
            result.append({
                'icon': icons.get(cat, '📌'),
                'title': cat,
                'count': f"{items.count()} ilan" if cat == 'İş İlanları' else f"{items.count()} talep",
                'items': data
            })
            
        return Response(result)

class HelpRequestCreateView(generics.CreateAPIView):
    serializer_class = HelpRequestSerializer
    permission_classes = [permissions.AllowAny]

    def get_serializer(self, *args, **kwargs):
        # Override to accept 'title' and 'description' directly
        return super().get_serializer(*args, **kwargs)
