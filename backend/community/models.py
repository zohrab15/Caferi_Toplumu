from django.db import models

class Announcement(models.Model):
    CATEGORY_CHOICES = (
        ('Genel Duyuru', 'Genel Duyuru'),
        ('Vefat', 'Vefat'),
        ('Etkinlik', 'Etkinlik'),
        ('Acil', 'Acil'),
    )

    category = models.CharField('Kategori', max_length=20, choices=CATEGORY_CHOICES)
    title = models.CharField('Başlık', max_length=200)
    body = models.TextField('İçerik')
    badge = models.CharField('Rozet', max_length=50, blank=True, null=True, help_text="Örn: Yeni, Yaklaşan")
    is_active = models.BooleanField('Aktif mi?', default=True)
    created_at = models.DateTimeField('Oluşturulma Tarihi', auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Duyurular'
        ordering = ['-created_at']

    def __str__(self):
        return f"[{self.category}] {self.title}"

class HelpRequest(models.Model):
    CATEGORY_CHOICES = (
        ('Kan Bağışı', 'Kan Bağışı'),
        ('İş İlanları', 'İş İlanları'),
        ('Öğrenci Desteği', 'Öğrenci Desteği'),
        ('Genel Yardım', 'Genel Yardım'),
    )

    category = models.CharField('Kategori', max_length=30, choices=CATEGORY_CHOICES)
    title = models.CharField('Başlık / İsim', max_length=200)
    description = models.TextField('Açıklama')
    contact_info = models.CharField('İletişim Bilgisi', max_length=100, blank=True, null=True)
    is_resolved = models.BooleanField('Çözüldü mü?', default=False)
    created_at = models.DateField('Eklenme Tarihi', auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Yardım Talepleri'
        ordering = ['-created_at']

    def __str__(self):
        return f"[{self.category}] {self.title}"
