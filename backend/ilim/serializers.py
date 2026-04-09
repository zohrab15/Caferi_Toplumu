from rest_framework import serializers
from .models import Question, Hadith

class QuestionSerializer(serializers.ModelSerializer):
    date = serializers.SerializerMethodField()
    question = serializers.CharField(source='text', read_only=True)

    class Meta:
        model = Question
        fields = ('id', 'question', 'answer', 'date', 'text', 'is_anonymous')
        extra_kwargs = {
            'text': {'write_only': True},
            'is_anonymous': {'write_only': True}
        }

    def get_date(self, obj):
        if obj.answered_at:
            return obj.answered_at.strftime('%d %B %Y').replace('January', 'Ocak').replace('February', 'Şubat').replace('March', 'Mart').replace('April', 'Nisan').replace('May', 'Mayıs').replace('June', 'Haziran').replace('July', 'Temmuz').replace('August', 'Ağustos').replace('September', 'Eylül').replace('October', 'Ekim').replace('November', 'Kasım').replace('December', 'Aralık')
        return None

    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user if request and request.user.is_authenticated else None
        
        # Soru anonim değilse ve kullanıcı giriş yapmışsa bağla
        is_anonymous = validated_data.get('is_anonymous', False)
        if user and not is_anonymous:
            validated_data['user'] = user

        return super().create(validated_data)

class HadithSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hadith
        fields = ('text', 'source', 'reference')
