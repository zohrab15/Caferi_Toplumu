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
        return Question.objects.filter(answer__isnull=False).exclude(answer__exact='')

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
        return Response(QuestionSerializer(q).data)

class TodayHadithView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        day_of_year = now().timetuple().tm_yday
        try:
            hadith = Hadith.objects.get(day_of_year=day_of_year)
        except Hadith.DoesNotExist:
            count = Hadith.objects.count()
            if count > 0:
                idx = (day_of_year % count)
                hadith = Hadith.objects.all()[idx]
            else:
                return Response(status=404)
        
        return Response(HadithSerializer(hadith).data)
