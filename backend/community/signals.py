from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Announcement, HelpRequest
from webpush import send_user_notification
from django.contrib.auth import get_user_model

User = get_user_model()

def broadcast_push(payload):
    users = User.objects.filter(webpush_info__isnull=False).distinct()
    for user in users:
        try:
            send_user_notification(user=user, payload=payload, ttl=1000)
        except Exception as e:
            # Sessizce devam et
            pass

@receiver(post_save, sender=Announcement)
def send_announcement_push(sender, instance, created, **kwargs):
    if created and instance.is_active:
        head = "Yeni Duyuru"
        if instance.category == 'Vefat':
            head = "🖤 Vefat Duyurusu"
        elif instance.category == 'Acil':
            head = "⚠️ Acil Duyuru"
            
        payload = {
            "head": head,
            "body": instance.title,
            "url": "/#community"
        }
        broadcast_push(payload)

@receiver(post_save, sender=HelpRequest)
def send_help_request_push(sender, instance, created, **kwargs):
    if created:
        head = f"🤝 Yeni Yardım Talebi: {instance.category}"
        payload = {
            "head": head,
            "body": instance.title,
            "url": "/#community"
        }
        broadcast_push(payload)
