from django.urls import path
from .views import QuestionListCreateView, TodayHadithView, UnansweredQuestionsView, AnswerQuestionView, MyQuestionsView

urlpatterns = [
    path('questions/', QuestionListCreateView.as_view(), name='api-questions'),
    path('my-questions/', MyQuestionsView.as_view(), name='api-my-questions'),
    path('hadith/today/', TodayHadithView.as_view(), name='api-hadith-today'),
    path('questions/unanswered/', UnansweredQuestionsView.as_view(), name='api-questions-unanswered'),
    path('questions/<int:pk>/answer/', AnswerQuestionView.as_view(), name='api-question-answer'),
]
