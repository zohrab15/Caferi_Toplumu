from rest_framework import serializers
from .models import Campaign, Donation

class CampaignSerializer(serializers.ModelSerializer):
    collected = serializers.DecimalField(source='collected_amount', max_digits=10, decimal_places=2, read_only=True)
    target = serializers.DecimalField(source='target_amount', max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Campaign
        fields = ('id', 'title', 'icon', 'description', 'collected', 'target')

class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = ('campaign', 'amount', 'donation_type', 'donor_name')

    def create(self, validated_data):
        # Eğer giriş yapılmışsa kullanıcıyı ekle
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            validated_data['user'] = request.user
            
        donation = super().create(validated_data)
        
        # Kampanya varsa toplanan miktarı artır
        if donation.campaign and donation.is_successful:
            donation.campaign.collected_amount += donation.amount
            donation.campaign.save()
            
        return donation
