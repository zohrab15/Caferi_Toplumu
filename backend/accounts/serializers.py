from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email
        token['role'] = user.role
        return token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'first_name', 'last_name', 'phone', 'blood_group', 'role', 'city')
        read_only_fields = ('role',)

class UserProfileSerializer(UserSerializer):
    donations = serializers.SerializerMethodField()
    tours = serializers.SerializerMethodField()
    questions = serializers.SerializerMethodField()

    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ('donations', 'tours', 'questions')

    def get_donations(self, obj):
        return [
            {"amount": d.amount, "type": d.donation_type, "date": d.created_at.strftime('%d.%m.%Y')}
            for d in obj.donation_set.all()[:5]
        ] if hasattr(obj, 'donation_set') else []

    def get_tours(self, obj):
        return [
            {"tour_name": t.tour.title, "status": t.get_status_display(), "date": t.created_at.strftime('%d.%m.%Y')}
            for t in obj.tourregistration_set.all()
        ] if hasattr(obj, 'tourregistration_set') else []

    def get_questions(self, obj):
        return [
            {
                "id": q.id,
                "question": q.text,
                "answer": q.answer,
                "is_answered": bool(q.answer),
                "is_private": q.is_private,
                "date": q.created_at.strftime('%d.%m.%Y')
            }
            for q in obj.question_set.all()[:10]
        ] if hasattr(obj, 'question_set') else []

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'first_name', 'last_name', 'phone', 'blood_group')

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            phone=validated_data.get('phone', ''),
            blood_group=validated_data.get('blood_group', '')
        )
        return user
