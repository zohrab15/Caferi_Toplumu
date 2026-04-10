from rest_framework import serializers
from .models import Question, Hadith

class QuestionSerializer(serializers.ModelSerializer):
    date = serializers.SerializerMethodField()
    question = serializers.CharField(source='text', read_only=True)
    asked_by = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = ('id', 'question', 'answer', 'date', 'text', 'is_anonymous', 'is_private', 'asked_by')
        extra_kwargs = {
            'text': {'write_only': True}
        }

    def get_asked_by(self, obj):
        if obj.is_anonymous or not obj.user:
            return "Anonim"
        return f"{obj.user.first_name} {obj.user.last_name}".strip() or obj.user.username

    def get_date(self, obj):
        if obj.answered_at:
            return obj.answered_at.strftime('%d %B %Y').replace('January', 'Ocak').replace('February', 'Şubat').replace('March', 'Mart').replace('April', 'Nisan').replace('May', 'Mayıs').replace('June', 'Haziran').replace('July', 'Temmuz').replace('August', 'Ağustos').replace('September', 'Eylül').replace('October', 'Ekim').replace('November', 'Kasım').replace('December', 'Aralık')
        return None

    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user if request and request.user.is_authenticated else None
        
        if user:
            validated_data['user'] = user

        return super().create(validated_data)

class HadithSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hadith
        fields = ('text', 'source', 'reference')
