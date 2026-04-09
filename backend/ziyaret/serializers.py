from rest_framework import serializers
from .models import Tour, TourRegistration

class TourSerializer(serializers.ModelSerializer):
    date = serializers.SerializerMethodField()
    seats = serializers.SerializerMethodField()
    image = serializers.CharField(source='image_gradient')
    statusColor = serializers.CharField(source='status_color')

    class Meta:
        model = Tour
        fields = ('id', 'title', 'image', 'date', 'duration', 'price', 'seats', 'status', 'statusColor')

    def get_date(self, obj):
        start = obj.date_start.strftime('%d').lstrip('0')
        end = obj.date_end.strftime('%d %B %Y').replace('January', 'Ocak').replace('February', 'Şubat').replace('March', 'Mart').replace('April', 'Nisan').replace('May', 'Mayıs').replace('June', 'Haziran').replace('July', 'Temmuz').replace('August', 'Ağustos').replace('September', 'Eylül').replace('October', 'Ekim').replace('November', 'Kasım').replace('December', 'Aralık')
        
        # Eğer aylar farklıysa daha detaylı formatlanabilir, şimdilik basit:
        return f"{start} — {end}"

    def get_seats(self, obj):
        if obj.total_seats == 0:
            return "Yakında açılacak"
        return f"{obj.registered_count} / {obj.total_seats} kişi"

class AdminTourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tour
        fields = '__all__'


class TourRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourRegistration
        fields = ('tour', 'full_name', 'phone', 'passport_no', 'note')

    def create(self, validated_data):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            validated_data['user'] = request.user
            validated_data['phone'] = validated_data.get('phone', request.user.phone)
            validated_data['full_name'] = validated_data.get('full_name', f"{request.user.first_name} {request.user.last_name}".strip())
            
        registration = super().create(validated_data)
        
        # Turun kayıt sayısını artır
        if registration.tour:
            registration.tour.registered_count += 1
            registration.tour.save()
            
        return registration
