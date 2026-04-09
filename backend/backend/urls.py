from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/community/', include('community.urls')),
    path('api/ilim/', include('ilim.urls')),
    path('api/bagis/', include('bagis.urls')),
    path('api/ziyaret/', include('ziyaret.urls')),
    path('webpush/', include('webpush.urls')),
]
