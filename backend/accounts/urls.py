from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView, ProfileView, CustomTokenObtainPairView, WebPushSubscribeView, GoogleLoginView

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/google/', GoogleLoginView.as_view(), name='google_login'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('profile/', ProfileView.as_view(), name='auth_profile'),
    path('webpush/subscribe/', WebPushSubscribeView.as_view(), name='webpush_subscribe'),
]
