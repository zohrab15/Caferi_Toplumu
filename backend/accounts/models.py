from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('üye', 'Üye'),
        ('yönetici', 'Yönetici'),
        ('hoca', 'Hoca'),
    )

    BLOOD_GROUP_CHOICES = (
        ('A Rh+', 'A Rh+'), ('A Rh-', 'A Rh-'),
        ('B Rh+', 'B Rh+'), ('B Rh-', 'B Rh-'),
        ('0 Rh+', '0 Rh+'), ('0 Rh-', '0 Rh-'),
        ('AB Rh+', 'AB Rh+'), ('AB Rh-', 'AB Rh-'),
    )

    email = models.EmailField('E-posta Adresi', unique=True)
    phone = models.CharField('Telefon Numarası', max_length=15, blank=True, null=True)
    blood_group = models.CharField('Kan Grubu', max_length=10, choices=BLOOD_GROUP_CHOICES, blank=True, null=True)
    role = models.CharField('Kullanıcı Rolü', max_length=10, choices=ROLE_CHOICES, default='member')
    city = models.CharField('Şehir', max_length=50, default='Ankara')

    # Django'nun username yerine email kullanması için:
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']  # createsuperuser kullanırken sorulacak alanlar

    def __str__(self):
        return f"{self.email} ({self.get_role_display()})"
