from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['email', 'first_name', 'last_name', 'phone', 'blood_group', 'role', 'city', 'is_staff']
    fieldsets = UserAdmin.fieldsets + (
        ('Ek Bilgiler', {'fields': ('phone', 'blood_group', 'role', 'city')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Ek Bilgiler', {'fields': ('email', 'first_name', 'last_name', 'phone', 'blood_group', 'role', 'city')}),
    )

admin.site.register(CustomUser, CustomUserAdmin)
