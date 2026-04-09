from rest_framework import serializers
from .models import Announcement, HelpRequest

class AnnouncementSerializer(serializers.ModelSerializer):
    date = serializers.SerializerMethodField(read_only=True)
    categoryColor = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Announcement
        fields = ('id', 'category', 'categoryColor', 'date', 'title', 'body', 'badge')
        read_only_fields = ('id', 'date', 'categoryColor')

    def get_date(self, obj):
        return obj.created_at.strftime('%d %B %Y').replace('January', 'Ocak').replace('February', 'Şubat').replace('March', 'Mart').replace('April', 'Nisan').replace('May', 'Mayıs').replace('June', 'Haziran').replace('July', 'Temmuz').replace('August', 'Ağustos').replace('September', 'Eylül').replace('October', 'Ekim').replace('November', 'Kasım').replace('December', 'Aralık')

    def get_categoryColor(self, obj):
        colors = {
            'Genel Duyuru': 'var(--color-primary-light)',
            'Vefat': 'var(--text-muted)',
            'Etkinlik': 'var(--color-accent)',
        }
        return colors.get(obj.category, 'var(--text-primary)')


class HelpRequestSerializer(serializers.ModelSerializer):
    date = serializers.SerializerMethodField(read_only=True)
    name = serializers.CharField(source='title')
    desc = serializers.CharField(source='description')

    class Meta:
        model = HelpRequest
        fields = ('id', 'category', 'name', 'desc', 'contact_info', 'date')
        read_only_fields = ('id', 'date')

    def to_internal_value(self, data):
        # Frontend might send 'title' and 'description' due to SW cache
        if 'title' in data and 'name' not in data:
            data['name'] = data['title']
        if 'description' in data and 'desc' not in data:
            data['desc'] = data['description']
        return super().to_internal_value(data)

    def get_date(self, obj):
        return obj.created_at.strftime('%d %B').replace('January', 'Ocak').replace('February', 'Şubat').replace('March', 'Mart').replace('April', 'Nisan').replace('May', 'Mayıs').replace('June', 'Haziran').replace('July', 'Temmuz').replace('August', 'Ağustos').replace('September', 'Eylül').replace('October', 'Ekim').replace('November', 'Kasım').replace('December', 'Aralık')
