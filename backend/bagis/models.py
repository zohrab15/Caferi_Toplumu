from django.db import models
from django.conf import settings

class Campaign(models.Model):
    title = models.CharField('Kampanya Adı', max_length=200)
    description = models.TextField('Açıklama')
    target_amount = models.DecimalField('Hedef Miktar (₺)', max_digits=10, decimal_places=2)
    collected_amount = models.DecimalField('Toplanan Miktar (₺)', max_digits=10, decimal_places=2, default=0)
    icon = models.CharField('İkon (Emoji)', max_length=10)
    is_active = models.BooleanField('Aktif mi?', default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Kampanyalar'

    def __str__(self):
        return f"{self.icon} {self.title}"

class Donation(models.Model):
    DONATION_TYPES = (
        ('Humus', 'Humus'),
        ('Zekat', 'Zekat'),
        ('Sadaka', 'Sadaka'),
        ('Genel Bağış', 'Genel Bağış'),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    campaign = models.ForeignKey(Campaign, on_delete=models.SET_NULL, null=True, blank=True, related_name='donations')
    amount = models.DecimalField('Miktar (₺)', max_digits=10, decimal_places=2)
    donation_type = models.CharField('Bağış Türü', max_length=20, choices=DONATION_TYPES)
    donor_name = models.CharField('Bağışçı Adı', max_length=100, blank=True, null=True, help_text="Anonim isteniyorsa boş bırakılabilir")
    is_successful = models.BooleanField('Başarılı mı?', default=True) # Payment gateway entegrasyonu için
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Bağış Kayıtları'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.amount} ₺ - {self.donation_type} ({self.donor_name or 'Anonim'})"
