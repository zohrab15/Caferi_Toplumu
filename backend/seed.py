import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from community.models import Announcement, HelpRequest
from ilim.models import Hadith
from bagis.models import Campaign
from ziyaret.models import Tour

def seed_data():
    # Duyurular
    if not Announcement.objects.exists():
        Announcement.objects.create(category='Genel Duyuru', title='Cuma Namazı Programı Değişikliği', body='Bu hafta cuma namazı saat 12:30 yerine 13:00\'de kılınacaktır.', badge='Yeni')
        Announcement.objects.create(category='Vefat', title='Vefat Duyurusu — Hasan Aliyev', body='Cemaatimizin değerli üyelerinden Hasan Aliyev\'in vefatını derin üzüntüyle bildiririz.')
        Announcement.objects.create(category='Etkinlik', title='Muharrem Programları Başlıyor', body='Muharrem ayı programlarımız 15 Temmuz\'da başlayacaktır.', badge='Yaklaşan')

    # Yardım Talepleri
    if not HelpRequest.objects.exists():
        HelpRequest.objects.create(category='Kan Bağışı', title='Ahmet Y. — A Rh+', description='Acil kan ihtiyacı, Ankara Şehir Hastanesi', contact_info='0530 111 22 33')
        HelpRequest.objects.create(category='İş İlanları', title='Muhasebeci Aranıyor', description='Kızılay merkezde — Tam zamanlı', contact_info='bilgi@firma.com')

    # Hadisler (İlk 5 gün için demo)
    if not Hadith.objects.exists():
        hadiths = [
            ("İlim öğrenmek her Müslüman erkek ve kadına farzdır.", "Hz. Muhammed (s.a.a)", "Bihar-ul Envar, c.1"),
            ("Sabreden kazanır.", "Hz. Ali (a.s)", "Nehcü'l Belağa, Hikmet 153"),
            ("Tevazu ilmin meyvesidir.", "İmam Cafer Sadık (a.s)", "Usul-u Kafi, c.2"),
            ("En büyük zenginlik akıl, en büyük fakirlik ahmaklıktır.", "Hz. Ali (a.s)", "Nehcü'l Belağa, Hikmet 54"),
            ("Dua, müminin silahıdır.", "Hz. Muhammed (s.a.a)", "Usul-u Kafi, c.2")
        ]
        for idx, h in enumerate(hadiths):
            Hadith.objects.create(text=h[0], source=h[1], reference=h[2], day_of_year=idx+1)

    # Kampanyalar
    if not Campaign.objects.exists():
        Campaign.objects.create(title='Cami Isıtma Sistemi Kış Bakımı', description='Kış gelmeden camimizin kombi ve peteklerinin yenilenmesi gerekmektedir.', target_amount=25000, collected_amount=12500, icon='🔥')
        Campaign.objects.create(title='Aşure Günü İhsan Yemeği', description='Muharrem 10. gün verilecek büyük ihsan yemeği koordinasyon fonu.', target_amount=50000, collected_amount=45000, icon='🥣')

    # Turlar
    if not Tour.objects.exists():
        Tour.objects.create(title='Kerbela Erbain Yürüyüşü 2026', date_start='2026-08-20', date_end='2026-09-05', duration='16 gün', price='1.200 $', total_seats=45, registered_count=28, status='Kayıt Açık', status_color='badge--primary')
        Tour.objects.create(title='Meşhed Ziyareti — İmam Rıza (a.s)', date_start='2026-06-15', date_end='2026-06-22', duration='7 gün', price='850 $', total_seats=30, registered_count=12, status='Son 12 Yer', status_color='badge--danger')

    print("✅ Məlumatlar uğurla yükləndi!")

if __name__ == '__main__':
    seed_data()
