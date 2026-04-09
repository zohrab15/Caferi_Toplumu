from django.db import models
from django.conf import settings

class Question(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Soran Kullanıcı")
    text = models.TextField("Soru Metni")
    is_anonymous = models.BooleanField("Anonim mi?", default=False)
    
    answer = models.TextField("Cevap", blank=True, null=True)
    answered_by = models.CharField("Cevaplayan Hoca", max_length=100, blank=True, null=True)
    
    created_at = models.DateTimeField("Sorulma Tarihi", auto_now_add=True)
    answered_at = models.DateTimeField("Cevaplanma Tarihi", blank=True, null=True)

    class Meta:
        verbose_name_plural = 'İstifta Soruları'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.text[:50]}..."

class Hadith(models.Model):
    text = models.TextField("Hadis Metni")
    source = models.CharField("Kaynak Kişi (Örn: Hz. Ali)", max_length=100)
    reference = models.CharField("Kitap Referansı", max_length=200)
    day_of_year = models.IntegerField("Yılın Günü (1-365)", unique=True, help_text="Hangi gün gösterilecek?")

    class Meta:
        verbose_name_plural = 'Hadisler'
        ordering = ['day_of_year']

    def __str__(self):
        return f"[{self.day_of_year}] {self.source}"
