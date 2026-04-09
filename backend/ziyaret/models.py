from django.db import models
from django.conf import settings

class Tour(models.Model):
    title = models.CharField('Tur Adı', max_length=200)
    date_start = models.DateField('Başlangıç Tarihi')
    date_end = models.DateField('Bitiş Tarihi')
    duration = models.CharField('Süre', max_length=50, help_text="Örn: 7 gün, 16 gün")
    price = models.CharField('Fiyat', max_length=50, help_text="Örn: 850 $, 1.200 $")
    total_seats = models.IntegerField('Toplam Kontenjan')
    registered_count = models.IntegerField('Kayıtlı Kişi', default=0)
    
    status = models.CharField('Durum Etiketi', max_length=50, help_text="Örn: Kayıt Açık, Son 12 Yer, Yakında")
    status_color = models.CharField('Durum Rengi (CSS sınıfı)', max_length=50, default='badge--primary')
    image_gradient = models.CharField('Arka Plan (CSS gradient)', max_length=150, default='linear-gradient(135deg, #1a3a2a, #0D4F2B)')
    
    is_active = models.BooleanField('Aktif mi?', default=True)

    class Meta:
        verbose_name_plural = 'Turlar'
        ordering = ['date_start']

    def __str__(self):
        return f"{self.title} ({self.date_start})"

class TourRegistration(models.Model):
    STATUS_CHOICES = (
        ('pending', 'İnceleniyor'),
        ('approved', 'Onaylandı'),
        ('rejected', 'Reddedildi'),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name='registrations')
    
    full_name = models.CharField('Ad Soyad', max_length=100)
    phone = models.CharField('Telefon', max_length=20)
    passport_no = models.CharField('Pasaport No', max_length=50, blank=True, null=True)
    note = models.TextField('Ek Not', blank=True, null=True)
    
    status = models.CharField('Kayıt Durumu', max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField('Başvuru Tarihi', auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Tur Kayıtları'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.full_name} -> {self.tour.title}"
