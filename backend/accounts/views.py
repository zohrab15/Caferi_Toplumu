from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer, UserSerializer, CustomTokenObtainPairSerializer, UserProfileSerializer
from django.contrib.auth import get_user_model
from django.conf import settings
from webpush.models import PushInformation, SubscriptionInfo
import uuid

User = get_user_model()

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user

class WebPushSubscribeView(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        status_type = request.data.get('status_type')
        if status_type != 'subscribe':
            return Response("Only subscribe is supported", status=status.HTTP_400_BAD_REQUEST)
        
        sub_data = request.data.get('subscription', {})
        keys = sub_data.get('keys', {})
        
        endpoint = sub_data.get('endpoint')
        auth = keys.get('auth')
        p256dh = keys.get('p256dh')
        browser = request.data.get('browser', 'unknown')
        user_agent = request.data.get('user_agent', '')

        if not all([endpoint, auth, p256dh]):
            return Response("Missing subscription keys", status=status.HTTP_400_BAD_REQUEST)

        # Create or Get Subscription Info
        sub_info, created = SubscriptionInfo.objects.get_or_create(
            endpoint=endpoint,
            defaults={
                'auth': auth,
                'p256dh': p256dh,
                'browser': browser,
                'user_agent': user_agent
            }
        )
        
        # If it was already there but keys changed, update it
        if not created:
            sub_info.auth = auth
            sub_info.p256dh = p256dh
            sub_info.browser = browser
            sub_info.save()

        # Link to User
        PushInformation.objects.get_or_create(
            user=request.user,
            subscription=sub_info
        )

        return Response({"status": "subscribed"}, status=status.HTTP_201_CREATED)


class GoogleLoginView(APIView):
    """Google ile giriş — frontend'den gelen ID token doğrulanır."""
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        from google.oauth2 import id_token
        from google.auth.transport import requests as google_requests

        token = request.data.get('credential')
        if not token:
            return Response(
                {'detail': 'Google credential gerekli.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            idinfo = id_token.verify_oauth2_token(
                token,
                google_requests.Request(),
                settings.GOOGLE_OAUTH2_CLIENT_ID
            )
        except ValueError:
            return Response(
                {'detail': 'Geçersiz Google token.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        email = idinfo.get('email')
        if not email:
            return Response(
                {'detail': 'E-posta alınamadı.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        first_name = idinfo.get('given_name', '')
        last_name = idinfo.get('family_name', '')

        # Kullanıcıyı bul veya oluştur
        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                'username': email.split('@')[0] + '_' + uuid.uuid4().hex[:6],
                'first_name': first_name,
                'last_name': last_name,
            }
        )

        if not created:
            # Mevcut kullanıcının ismini güncelle (isteğe bağlı)
            if not user.first_name and first_name:
                user.first_name = first_name
            if not user.last_name and last_name:
                user.last_name = last_name
            user.save()

        # JWT token üret
        refresh = RefreshToken.for_user(user)
        refresh['email'] = user.email
        refresh['role'] = user.role

        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'created': created,
        }, status=status.HTTP_200_OK)
