from django.contrib import admin
from .models import Campaign, Donation

@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = ('title', 'icon', 'collected_amount', 'target_amount', 'is_active')
    list_editable = ('is_active',)

@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ('donor_name', 'amount', 'donation_type', 'campaign', 'is_successful', 'created_at')
    list_filter = ('donation_type', 'is_successful', 'created_at')
    readonly_fields = ('created_at',)
    search_fields = ('donor_name',)
