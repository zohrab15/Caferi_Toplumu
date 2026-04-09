from django.contrib import admin
from .models import Tour, TourRegistration

@admin.register(Tour)
class TourAdmin(admin.ModelAdmin):
    list_display = ('title', 'date_start', 'date_end', 'price', 'registered_count', 'total_seats', 'status', 'is_active')
    list_editable = ('status', 'is_active')
    search_fields = ('title',)

@admin.register(TourRegistration)
class TourRegistrationAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'phone', 'tour', 'status', 'created_at')
    list_filter = ('status', 'tour', 'created_at')
    search_fields = ('full_name', 'phone', 'passport_no')
    readonly_fields = ('created_at',)
    list_editable = ('status',)
