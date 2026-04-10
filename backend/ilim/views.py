from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils.timezone import now
from .models import Question, Hadith
from .serializers import QuestionSerializer, HadithSerializer

class QuestionListCreateView(generics.ListCreateAPIView):
    serializer_class = QuestionSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return Question.objects.filter(answer__isnull=False, is_private=False).exclude(answer__exact='')

class MyQuestionsView(generics.ListAPIView):
    """Kullanıcının sorduğu soruları (özel/genel) profil sayfası için getirir"""
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Question.objects.filter(user=self.request.user).order_by('-created_at')

class UnansweredQuestionsView(generics.ListAPIView):
    """Admin only: cevaplanmamış sorular"""
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        return Question.objects.filter(answer__isnull=True) | Question.objects.filter(answer__exact='')

class AnswerQuestionView(APIView):
    """Admin only: soruyu cevapla"""
    permission_classes = [permissions.IsAdminUser]

    def patch(self, request, pk):
        try:
            q = Question.objects.get(pk=pk)
        except Question.DoesNotExist:
            return Response({'error': 'Soru bulunamadı'}, status=404)
        q.answer = request.data.get('answer', '')
        q.answered_by = f"{request.user.first_name} {request.user.last_name}".strip() or request.user.email
        q.answered_at = now()
        q.save()

        if q.user:
            from webpush import send_user_notification
            payload = {
                "head": "💬 Sorunuz Cevaplandı",
                "body": "Hocamız sorunuza yanıt verdi. Okumak için tıklayın.",
                "url": "/#profile"
            }
            try:
                send_user_notification(user=q.user, payload=payload, ttl=1000)
            except Exception as e:
                print(f"Push Error (ilim): {e}")

        return Response(QuestionSerializer(q).data)

class TodayHadithView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        day_of_year = now().timetuple().tm_yday
        try:
            hadith = Hadith.objects.get(day_of_year=day_of_year)
            return Response(HadithSerializer(hadith).data)
        except Hadith.DoesNotExist:
            count = Hadith.objects.count()
            if count > 0:
                idx = (day_of_year % count)
                hadith = Hadith.objects.all()[idx]
                return Response(HadithSerializer(hadith).data)
            else:
                return Response({
                    "id": 0,
                    "text": "İlim talep etmek her Müslüman'a farzdır. Şüphesiz Allah, ilim peşinde koşanları sever.",
                    "source": "Hz. Muhammed (s.a.a)",
                    "reference": "Usul-u Kâfi, c.1, s.30",
                    "day_of_year": day_of_year
                })
