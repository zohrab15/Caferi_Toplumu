from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Campaign
from webpush import send_user_notification
from django.contrib.auth import get_user_model

User = get_user_model()

def broadcast_push(payload):
    users = User.objects.filter(webpush_info__isnull=False).distinct()
    for user in users:
        try:
            send_user_notification(user=user, payload=payload, ttl=1000)
        except Exception:
            pass

@receiver(post_save, sender=Campaign)
def send_campaign_push(sender, instance, created, **kwargs):
    if created and instance.is_active:
        payload = {
            "head": f"🎉 Yeni Bağış Kampanyası",
            "body": instance.title,
            "url": "/#bagis"
        }
        broadcast_push(payload)
