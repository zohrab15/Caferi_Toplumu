import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.utils import timezone
from datetime import timedelta, date
from community.models import Announcement, HelpRequest
from ilim.models import Hadith, Question
from bagis.models import Campaign, Donation
from ziyaret.models import Tour, TourRegistration
from accounts.models import CustomUser

def seed_data():
    print("Seed verileri yukleniyor...")

    # ═══════════════════════════════════════════════════════════
    # 1) DUYURULAR (Announcements) — 8 adet, gerçekçi ve güncel
    # ═══════════════════════════════════════════════════════════
    Announcement.objects.all().delete()
    print("  - Duyurular olusturuluyor...")

    announcements = [
        {
            'category': 'Genel Duyuru',
            'title': 'Cuma Namazı Saati Güncellendi',
            'body': 'Değerli cemaatimiz, yaz saati uygulaması dolayısıyla Cuma namazı bu haftadan itibaren 13:30\'da kılınacaktır. Hutbe saat 13:00\'te başlayacaktır. Tüm cemaatimizi bekleriz.',
            'badge': 'Güncelleme',
        },
        {
            'category': 'Acil',
            'title': 'Acil Kan İhtiyacı — 0 Rh(-)',
            'body': 'Cemaatimizden Rəhim Əliyev kardeşimiz Ankara Şehir Hastanesinde ameliyat olacaktır. 0 Rh(-) kan grubuna acil ihtiyaç vardır. Yardım edebilecek kardeşlerimiz 0532 444 55 66 numarasını arayabilir.',
            'badge': 'Acil',
        },
        {
            'category': 'Etkinlik',
            'title': 'Recep Ayı Özel Programı',
            'body': 'Recep ayının ilk gecesi münasebetiyle özel dua ve münacat programı düzenlenecektir. Program cami bünyesinde saat 20:00\'de başlayacak, ardından ikram verilecektir. Ailelerinizle birlikte buyurun.',
            'badge': 'Davet',
        },
        {
            'category': 'Vefat',
            'title': 'Vefat — Mərhum Hüseyn Kazımov',
            'body': 'Cemaatimizin kıymetli büyüklerinden Hüseyn Kazımov Hoca (85) Hakkın rahmetine kavuşmuştur. Cenaze namazı yarın öğle namazının ardından Ankara Caferi Camii\'nde kılınacaktır. Mekanı cennet olsun.',
        },
        {
            'category': 'Genel Duyuru',
            'title': 'Haftalık Kur\'an Dersleri Başladı',
            'body': 'Her Cumartesi saat 10:00-12:00 arası tecvid ve Kur\'an-ı Kerim tilaveti dersleri başlıyor. Hocamız Hacı Sərdar derslerimizi icra edecektir. Her yaş grubuna açıktır. Kayıt için camii bürosuna başvurunuz.',
            'badge': 'Yeni',
        },
        {
            'category': 'Etkinlik',
            'title': 'Gençlik Buluşması — Panel ve Sohbet',
            'body': 'Bu Pazar saat 15:00\'te cami konferans salonunda "Dijital Çağda İman ve Ahlak" konulu gençlik paneli düzenlenecektir. Konuşmacı: Dr. Əli Həsənov. 16-30 yaş arası tüm gençlerimiz davetlidir.',
            'badge': 'Gençlik',
        },
        {
            'category': 'Genel Duyuru',
            'title': 'Ramazan Hazırlıkları Hakkında',
            'body': 'Ramazan ayına sayılı günler kaldı. İftar çadırı, fitre dağıtımı ve sosyal yardım programları hakkında detaylı bilgi yakında paylaşılacaktır. Gönüllü olmak isteyen kardeşlerimiz büromuzla irtibata geçebilir.',
        },
        {
            'category': 'Genel Duyuru',
            'title': 'Camii Kütüphanesi Yenilendi',
            'body': 'Camimiz bünyesindeki kütüphane 500\'den fazla yeni kitapla zenginleştirilmiştir. Fıkıh, hadis, tarih, ahlak ve çocuk kitapları mevcut. Ödünç alma sistemi aktif. Cuma namazı sonrası ziyaret edebilirsiniz.',
            'badge': 'Yeni',
        },
    ]

    for i, ann in enumerate(announcements):
        a = Announcement.objects.create(**ann)
        # created_at-ı geriye dönük ayarla (en yeni en üstte)
        a.created_at = timezone.now() - timedelta(days=i * 3)
        a.save(update_fields=['created_at'])

    # ═══════════════════════════════════════════════════════════
    # 2) YARDIM TALEPLERİ (Help Requests) — 12 adet, gerçekçi
    # ═══════════════════════════════════════════════════════════
    HelpRequest.objects.all().delete()
    print("  - Yardim talepleri olusturuluyor...")

    help_requests = [
        # Kan Bağışı
        {'category': 'Kan Bağışı', 'title': '[A Rh+] Fatma Əliyeva — Acil Ameliyat', 'description': 'Ankara Şehir Hastanesi Kalp Cerrahisi Bölümü. Açık kalp ameliyatı için 4 ünite A Rh+ kan ihtiyacı.', 'contact_info': '0532 111 22 33'},
        {'category': 'Kan Bağışı', 'title': '[0 Rh-] Reza Hüseynov — Trafik Kazası', 'description': 'Gazi Hastanesi Acil Servis. Trafik kazası sonrası yoğun bakımda. 0 Rh- kan grubu acil.', 'contact_info': '0535 222 33 44'},
        {'category': 'Kan Bağışı', 'title': '[B Rh+] Əli Məmmədov — Hasta Yakını', 'description': 'Hacettepe Hastanesi Onkoloji. Kemoterapi sürecinde B Rh+ trombosit ihtiyacı.', 'contact_info': '0537 333 44 55'},

        # İş İlanları
        {'category': 'İş İlanları', 'title': 'Tecrübeli Muhasebeci Aranıyor', 'description': 'Kızılay merkezde kurumsal bir firmada deneyimli muhasebeci aranıyor. Tam zamanlı, SGK + yemek kartı. Minimum 3 yıl tecrübe.', 'contact_info': 'hr@abcfinans.com.tr'},
        {'category': 'İş İlanları', 'title': 'Grafik Tasarımcı — Uzaktan Çalışma', 'description': 'Dijital ajans için yarı zamanlı grafik tasarımcı. Adobe Creative Suite bilgisi şart. Portfolyo ile başvuru.', 'contact_info': '0544 555 66 77'},
        {'category': 'İş İlanları', 'title': 'Berber/Kuaför Çırağı Alınacak', 'description': 'Çankaya\'da berber dükkanında çırak alınacak. Yaş: 16-22. Ustalık eğitimi verilecek, yevmiye + sigorta.', 'contact_info': '0530 666 77 88'},
        {'category': 'İş İlanları', 'title': 'Market Kasiyer — Keçiören', 'description': 'Keçiören OSB yakınında markette kasiyer + tezgahtar aranıyor. Vardiyalı çalışma, asgari ücret + prim.', 'contact_info': '0533 777 88 99'},

        # Öğrenci Desteği
        {'category': 'Öğrenci Desteği', 'title': 'Laptop İhtiyacı — Bilgisayar Müh. Öğrencisi', 'description': 'Hacettepe Üniversitesi Bilgisayar Müh. 2. sınıf öğrencisi. Ailesinin maddi durumu elvermediğinden ikinci el dahi olsa laptop ihtiyacı.', 'contact_info': '0545 100 20 30'},
        {'category': 'Öğrenci Desteği', 'title': 'Aylık Burs Desteği — Tıp Fakültesi', 'description': 'Ankara Üniversitesi Tıp Fakültesi 4.sınıf öğrencisi. Ailesi Ağrı\'da. Barınma + yemek masrafları karşılanamıyor. Başarı ortalaması 3.4/4.', 'contact_info': '0546 200 30 40'},

        # Genel Yardım
        {'category': 'Genel Yardım', 'title': '4 Kişilik Aile — Temel Erzak İhtiyacı', 'description': 'Yenimahalle\'de ikamet eden 4 kişilik aile, baba işsiz. Temel gıda (un, yağ, şeker, pirinç) ve temizlik malzemesi ihtiyacı mevcut.', 'contact_info': '0538 300 40 50'},
        {'category': 'Genel Yardım', 'title': 'Ev Eşyası Bağışı — Yeni Taşınan Aile', 'description': 'Suriye\'den gelen aile Keçiören\'e taşındı. Buzdolabı, çamaşır makinesi ve yatak ihtiyaçları var. Kullanılmış da olur.', 'contact_info': '0539 400 50 60'},
    ]

    for i, hr in enumerate(help_requests):
        h = HelpRequest.objects.create(**hr)

    # ═══════════════════════════════════════════════════════════
    # 3) HADİSLER — 60 adet, yılın 60 günü için
    # ═══════════════════════════════════════════════════════════
    Hadith.objects.all().delete()
    print("  - Hadisler olusturuluyor...")

    hadiths = [
        ("İlim öğrenmek her Müslüman erkek ve kadına farzdır.", "Hz. Muhammed (s.a.a)", "Bihar-ul Envar, c.1, s.177"),
        ("Sabreden kazanır.", "Hz. Ali (a.s)", "Nehcü'l Belağa, Hikmet 153"),
        ("Tevazu ilmin meyvesidir.", "İmam Cafer Sadık (a.s)", "Usul-u Kafi, c.2, s.123"),
        ("En büyük zenginlik akıl, en büyük fakirlik ahmaklıktır.", "Hz. Ali (a.s)", "Nehcü'l Belağa, Hikmet 54"),
        ("Dua, müminin silahıdır.", "Hz. Muhammed (s.a.a)", "Usul-u Kafi, c.2, s.468"),
        ("Beşikte hayırlı olan kıyamette de hayırlıdır.", "İmam Hüseyin (a.s)", "Bihar-ul Envar, c.44"),
        ("Güzel ahlak, dinin yarısıdır.", "Hz. Muhammed (s.a.a)", "Kenz-ul Ummal, h.5225"),
        ("Komşusu aç iken tok yatan bizden değildir.", "Hz. Muhammed (s.a.a)", "Bihar-ul Envar, c.74, s.369"),
        ("Dünya, ahiretin tarlasıdır.", "Hz. Muhammed (s.a.a)", "Avali-ul Leali, c.1, s.267"),
        ("Bir saat tefekkür, bir sene ibadetten üstündür.", "Hz. Muhammed (s.a.a)", "Bihar-ul Envar, c.68, s.327"),
        ("Hak söz acı da olsa söylenmeli.", "Hz. Ali (a.s)", "Nehcü'l Belağa, Hutbe 179"),
        ("Alimlerin mürekkebi şehitlerin kanından üstündür.", "Hz. Muhammed (s.a.a)", "Bihar-ul Envar, c.2, s.15"),
        ("İnsanların en akıllısı, öfkeye en çok hâkim olanıdır.", "İmam Sadık (a.s)", "Usul-u Kafi, c.2, s.305"),
        ("İyilik yapan asla zarar görmez.", "Hz. Ali (a.s)", "Gurer-ul Hikem, h.3512"),
        ("Anne-babanıza iyilik edin ki çocuklarınız da size iyilik etsin.", "Hz. Muhammed (s.a.a)", "Kenz-ul Ummal, h.45439"),
        ("Üç şey kalbi diriltir: Alim sohbeti, Kur'an tilaveti ve zikir.", "Hz. Ali (a.s)", "Nehcü'l Belağa, Mektup 31"),
        ("Aceleci olan çok hata yapar.", "Hz. Ali (a.s)", "Gurer-ul Hikem, h.8755"),
        ("Mümin kardeşine yardım eden, Allah'a yardım etmiş gibidir.", "İmam Bakır (a.s)", "Usul-u Kafi, c.2, s.200"),
        ("Cimrilik, bütün kötü huyların temelidir.", "Hz. Ali (a.s)", "Nehcü'l Belağa, Hikmet 378"),
        ("Kalbinde kibir olan cennete giremez.", "Hz. Muhammed (s.a.a)", "Bihar-ul Envar, c.73, s.230"),
        ("Emanete hıyanet eden bizden değildir.", "Hz. Muhammed (s.a.a)", "Usul-u Kafi, c.2, s.673"),
        ("İnsanlara karşı mütevazı ol ki Allah seni yüceltsin.", "İmam Rıza (a.s)", "Uyun-u Ahbar-ur Rıza, c.2"),
        ("Öfke anında susan, kalıcı pişmanlıktan kurtulur.", "Hz. Ali (a.s)", "Gurer-ul Hikem, h.2451"),
        ("Az konuş, çok düşün. Az ye, çok şükret.", "İmam Ali Naki (a.s)", "Tuhaf-ul Ukul, s.483"),
        ("Sıla-i rahim ömrü uzatır.", "Hz. Muhammed (s.a.a)", "Bihar-ul Envar, c.74, s.89"),
        ("Doğruluk, kurtuluşun anahtarıdır.", "İmam Hasan (a.s)", "Bihar-ul Envar, c.78, s.111"),
        ("Amelsiz ilim, meyvesiz ağaç gibidir.", "Hz. Ali (a.s)", "Nehcü'l Belağa, Hikmet 142"),
        ("Müminin niyeti amelinden hayırlıdır.", "Hz. Muhammed (s.a.a)", "Usul-u Kafi, c.2, s.84"),
        ("Tövbe kapısı güneş batıdan doğuncaya dek açıktır.", "Hz. Muhammed (s.a.a)", "Bihar-ul Envar, c.6, s.21"),
        ("Helal rızık aramak, cihaddır.", "İmam Sadık (a.s)", "Vesail-uş Şia, c.17, s.32"),
        ("Merhamet etmeyene merhamet olunmaz.", "Hz. Muhammed (s.a.a)", "Bihar-ul Envar, c.74, s.267"),
        ("Danışan dağları aşar, danışmayan düz yolda şaşar.", "Hz. Ali (a.s)", "Nehcü'l Belağa, Hikmet 161"),
        ("İnsanın süsü, edebidir.", "İmam Musa Kazım (a.s)", "Tuhaf-ul Ukul, s.408"),
        ("Gerçek zenginlik, gönül zenginliğidir.", "Hz. Muhammed (s.a.a)", "Sahih Müslim, Zekat 120"),
        ("İlim Çin'de bile olsa talep ediniz.", "Hz. Muhammed (s.a.a)", "Bihar-ul Envar, c.1, s.180"),
        ("Hayatı tanımak istiyorsan ölümü düşün.", "Hz. Ali (a.s)", "Gurer-ul Hikem, h.1563"),
        ("Günahı küçük görmek, günahın kendisinden büyüktür.", "Hz. Ali (a.s)", "Nehcü'l Belağa, Hikmet 477"),
        ("Temizlik imandandır.", "Hz. Muhammed (s.a.a)", "Usul-u Kafi, c.2, s.7"),
        ("Hakkı söyleyen az dostla yetinir ama hak üzeredir.", "Hz. Ali (a.s)", "Nehcü'l Belağa, Hutbe 204"),
        ("İnsanların en hayırlısı, insanlara en faydalı olanıdır.", "Hz. Muhammed (s.a.a)", "Kenz-ul Ummal, h.43087"),
        ("Bir toplum ahlaken bozulursa, o toplum helak olur.", "İmam Bakır (a.s)", "Usul-u Kafi, c.2"),
        ("Rabbinden kork ki insanlardan korkmayasın.", "İmam Hüseyin (a.s)", "Bihar-ul Envar, c.44, s.192"),
        ("Sır saklamak, erkekliğin zirvesidir.", "Hz. Ali (a.s)", "Nehcü'l Belağa, Hikmet 176"),
        ("Misafir, Allah'ın hediyesidir.", "Hz. Muhammed (s.a.a)", "Bihar-ul Envar, c.75, s.462"),
        ("Kanaatkâr olan kimseden doygun kimse yoktur.", "Hz. Ali (a.s)", "Gurer-ul Hikem, h.6732"),
        ("Cehalet, en kötü yoksulluktur.", "Hz. Ali (a.s)", "Nehcü'l Belağa, Hikmet 81"),
        ("Nimete şükretmek, yeni nimetler getirir.", "İmam Sadık (a.s)", "Mekarim-ul Ahlak, s.309"),
        ("Zalimin zulmüne sessiz kalan, zulme ortaktır.", "Hz. Ali (a.s)", "Nehcü'l Belağa, Hikmet 374"),
        ("Mümin mümine aynadır.", "Hz. Muhammed (s.a.a)", "Usul-u Kafi, c.2, s.170"),
        ("Her zorlukla birlikte bir kolaylık vardır.", "Kur'an", "İnşirah Suresi, 94:5-6"),
        ("Gecenin en karanlık anı, şafaktan hemen öncesidir.", "Hz. Ali (a.s)", "Gurer-ul Hikem"),
        ("Sabır, imanın yarısıdır.", "Hz. Muhammed (s.a.a)", "Bihar-ul Envar, c.68, s.92"),
        ("En güçlü insan, nefsini yenen insandır.", "Hz. Muhammed (s.a.a)", "Kenz-ul Ummal, h.8605"),
        ("Her kim haksız yere bir cana kıyarsa tüm insanlığı öldürmüş gibidir.", "Kur'an", "Mâide Suresi, 5:32"),
        ("Aranızda en hayırlınız, ailesi için en hayırlı olanınızdır.", "Hz. Muhammed (s.a.a)", "Bihar-ul Envar, c.103, s.228"),
        ("Kendisinden aşağıda olana bakan, Allah'ın nimetine şükreder.", "İmam Sadık (a.s)", "Mekarim-ul Ahlak, s.461"),
        ("Gençliğin kıymetini ihtiyarlamadan önce bilin.", "Hz. Ali (a.s)", "Nehcü'l Belağa, Hikmet 289"),
        ("Yetimi seven, cennette benim komşumdur.", "Hz. Muhammed (s.a.a)", "Bihar-ul Envar, c.75, s.180"),
        ("Kim bir hayır kapısı açarsa, ona o kapıdan girenin sevabı kadar sevap vardır.", "Hz. Muhammed (s.a.a)", "Kenz-ul Ummal, h.43085"),
        ("Vakit, en kıymetli sermayedir. Onu boşa geçirme.", "Hz. Ali (a.s)", "Gurer-ul Hikem, h.10824"),
    ]

    for idx, (text, source, ref) in enumerate(hadiths):
        Hadith.objects.create(text=text, source=source, reference=ref, day_of_year=idx + 1)

    # ═══════════════════════════════════════════════════════════
    # 4) İSTİFTA SORULARI (Questions) — 15 adet (10 cevaplanmış + 5 bekleyen)
    # ═══════════════════════════════════════════════════════════
    Question.objects.all().delete()
    print("  - Sorular olusturuluyor...")

    answered_questions = [
        {
            'text': 'Caferi mezhebine göre abdest alırken ayakları yıkamak mı yoksa meshetmek mi gerekir?',
            'answer': 'Caferi fıkhına göre abdestte ayaklar yıkanmaz, meshedilir. Kur\'an-ı Kerim\'de (Mâide 6) açıkça "ayaklarınızı meshedin" buyurulmaktadır. Ayak parmaklarının ucundan topuğa doğru mesh yapılır.',
            'is_anonymous': False,
            'answered_by': 'Hacı Ruslan Hoca',
        },
        {
            'text': 'Namazda eller nasıl bağlanır? Caferi mezhebinde kollar nasıl durur?',
            'answer': 'Caferi mezhebinde namazda eller bağlanmaz (tekfir/tekattuf yapılmaz). Eller iki yana serbest bırakılır, uylukların yanında doğal şekilde durur. Bu, Ehl-i Beyt imamlarının öğretisidir.',
            'is_anonymous': True,
            'answered_by': 'Hacı Ruslan Hoca',
        },
        {
            'text': 'Secdede alnı toprağa (türbe/möhür) koymamızın delili nedir?',
            'answer': 'Hz. Peygamber (s.a.a) "Yeryüzü benim için mescit ve temiz kılındı" buyurmuştur. Secde, Allah\'ın yarattığı doğal bir nesne üzerine yapılmalıdır. Toprak, taş veya yaprak gibi. Seccade kumaştan olduğu için yeterli değildir. Türbe/möhür, Kerbela toprağından yapılır ve bu sünnete uygun hareket etmektir.',
            'is_anonymous': False,
            'answered_by': 'Hacı Ruslan Hoca',
        },
        {
            'text': 'Akşam ve yatsı namazlarını birleştirmek caiz midir?',
            'answer': 'Evet, Caferi mezhebinde akşam ve yatsı namazları cem ile (birleştirerek) kılınabilir. Hz. Peygamber (s.a.a) seferde olmaksızın da öğle ile ikindiyi, akşam ile yatsıyı birleştirmiştir. Bu rivayetler Sahih-i Müslim\'de de mevcuttur.',
            'is_anonymous': True,
            'answered_by': 'Hacı Sərdar Hoca',
        },
        {
            'text': 'Humus nedir? Kimlere farzdır?',
            'answer': 'Humus, yıllık gelirden harcamalar çıkıldıktan sonra kalan fazlalığın beşte birinin (1/5) ödenmesidir. Kur\'an\'da Enfal Suresi 41. ayette emredilmiştir. Matrah hesaplama yılı dolduğunda, artık gelir üzerinden ödenir. Seyyidlere ve fakirlere dağıtılır.',
            'is_anonymous': False,
            'answered_by': 'Hacı Ruslan Hoca',
        },
        {
            'text': 'Oruçluyken diş fırçalamak orucu bozar mı?',
            'answer': 'Caferi mezhebine göre oruçlu iken diş fırçalamak orucu bozmaz, ancak macun veya su yutmamaya dikkat edilmelidir. Misvak kullanmak sünnettir. Diş macunu kullanılacaksa, ağız çok iyi çalkalanmalıdır.',
            'is_anonymous': True,
            'answered_by': 'Hacı Sərdar Hoca',
        },
        {
            'text': 'Kadınlar namaz kılarken başörtüsü zorunlu mudur?',
            'answer': 'Evet, namaz kılan kadının avret mahallini örtmesi farzdır. Bu, saçın tamamını, kolları (bilekler hariç) ve ayak üstünü kapsar. Yüz ve eller açık kalabilir. Örtünme hem namaz içinde hem de namaz dışında (hicab olarak) farzdır.',
            'is_anonymous': False,
            'answered_by': 'Hacı Ruslan Hoca',
        },
        {
            'text': 'Mutah nikahı nedir? Hangi durumlarda caizdir?',
            'answer': 'Müt\'a nikahı (muvakkat nikah), belirli bir süre ve mehir ile yapılan geçici nikah akdidir. Kur\'an\'da (Nisa:24) "istimta" ifadesiyle caiz kılınmıştır. Hz. Ömer döneminde yasaklanmış, ancak Ehl-i Beyt mektebine göre bu yasak geçerli değildir. Detaylar için şahsen görüşmenizi tavsiye ederim.',
            'is_anonymous': True,
            'answered_by': 'Hacı Ruslan Hoca',
        },
        {
            'text': 'Çocuğuma Kur\'an eğitimi aldırmak istiyorum. Kaç yaşında başlamalı?',
            'answer': 'Kur\'an eğitimine 5-6 yaşından itibaren elif-ba ile başlanabilir. Camimizde her Cumartesi çocuk Kur\'an kurslarımız mevcuttur. 5-9 yaş grubu ve 10-15 yaş grubu olmak üzere iki sınıfımız var. Kayıt için cami bürosuna başvurabilirsiniz.',
            'is_anonymous': False,
            'answered_by': 'Hacı Sərdar Hoca',
        },
        {
            'text': 'Teyemmüm ne zaman yapılır? Abdestsiz namaz kılınabilir mi?',
            'answer': 'Teyemmüm, su bulunmadığında veya suyun kullanılmasının sağlığa zararlı olduğu durumlarda abdest yerine geçer. Temiz toprak/taş üzerine el vurularak yüze ve ellerin üstüne meshedilir. Bu şekilde namaz kılmak caizdir. Detaylı fıkhi bilgi için "Risale-i Ameliye" kitabına başvurabilirsiniz.',
            'is_anonymous': True,
            'answered_by': 'Hacı Ruslan Hoca',
        },
    ]

    for i, q in enumerate(answered_questions):
        obj = Question.objects.create(
            text=q['text'],
            answer=q['answer'],
            is_anonymous=q['is_anonymous'],
            answered_by=q['answered_by'],
            answered_at=timezone.now() - timedelta(days=i * 2),
        )
        obj.created_at = timezone.now() - timedelta(days=i * 2 + 3)
        obj.save(update_fields=['created_at'])

    # Bekleyen sorular (cevaplanmamış)
    pending_questions = [
        {'text': 'Süt anneden emmenin nesep hükmü nedir? Süt kardeşle evlilik caiz mi?', 'is_anonymous': True},
        {'text': 'İstihaze (düzensiz kanama) durumunda namaz nasıl kılınır?', 'is_anonymous': False},
        {'text': 'Caferi mezhebinde mezar ziyareti adabı nasıldır? Hangi dualar okunmalı?', 'is_anonymous': False},
        {'text': 'Kaza namazı borcu olan kişi, nafile namaz kılabilir mi?', 'is_anonymous': True},
        {'text': 'Deniz ürünlerinden hangilerini yemek helaldir? Karides, midye, ıstakoz?', 'is_anonymous': False},
    ]

    for i, q in enumerate(pending_questions):
        obj = Question.objects.create(text=q['text'], is_anonymous=q['is_anonymous'])
        obj.created_at = timezone.now() - timedelta(hours=i * 6 + 2)
        obj.save(update_fields=['created_at'])

    # ═══════════════════════════════════════════════════════════
    # 5) BAĞIŞ KAMPANYALARI — 4 adet + bağış kayıtları
    # ═══════════════════════════════════════════════════════════
    Campaign.objects.all().delete()
    Donation.objects.all().delete()
    print("  - Kampanyalar olusturuluyor...")

    campaigns_data = [
        {
            'title': 'Cami Isıtma Sistemi Yenileme',
            'description': 'Kış aylarına hazırlık olarak camimizin merkezi ısıtma sistemi, kombileri ve peteklerinin tamamen yenilenmesi gerekmektedir. 20 yıllık sistemin artık verimsiz çalışması sebebiyle doğalgaz faturamız çok yükselmektedir.',
            'target_amount': 85000,
            'collected_amount': 52300,
            'icon': '🔥',
        },
        {
            'title': 'Muharrem Ayı İhsan Yemeği',
            'description': 'Muharrem ayı boyunca 10 gün sürecek ihsan (aşure) programı için gıda malzemesi, servis ekipmanı ve organizasyon masrafları. Her gün ortalama 300 kişiye yemek verilecektir.',
            'target_amount': 120000,
            'collected_amount': 98500,
            'icon': '🥣',
        },
        {
            'title': 'Öğrenci Burs Fonu — 2026',
            'description': 'Cemaatimizden üniversite okuyan başarılı ve ihtiyaç sahibi 15 öğrenciye aylık burs desteği sağlıyoruz. Her öğrenciye aylık 3.000 TL, 10 ay süreyle verilmektedir.',
            'target_amount': 450000,
            'collected_amount': 187000,
            'icon': '🎓',
        },
        {
            'title': 'Cami Kütüphanesi Genişletme',
            'description': 'Caferi fıkhı, hadis, tarih ve ahlak konularında yeni kitaplar alarak kütüphanemizi zenginleştirmek istiyoruz. Ayrıca dijital kütüphane terminali kurulması planlanmaktadır.',
            'target_amount': 35000,
            'collected_amount': 31200,
            'icon': '📚',
        },
    ]

    for c_data in campaigns_data:
        c = Campaign.objects.create(**c_data)

        # Her kampanyaya sample bağışlar ekle
        donor_names = [
            'Əli Məmmədov', 'Fatma Həsənova', 'Hüseyn Əliyev', 'Zeynəb Kazımova',
            'Rəşad Hüseynov', 'Məryəm Əhmədova', 'Cahangir Babayev', 'Anonim',
            'Rəhim Quliyev', 'Anonim', 'Sərdar Nəbizadə', 'Gülnarə İsmayılova',
        ]
        for j, name in enumerate(donor_names[:5]):
            Donation.objects.create(
                campaign=c,
                amount=(j + 1) * 500 + 250,
                donation_type=['Humus', 'Zekat', 'Sadaka', 'Genel Bağış'][j % 4],
                donor_name=name if name != 'Anonim' else None,
            )

    # ═══════════════════════════════════════════════════════════
    # 6) ZİYARET TURLARI — 4 tur + kayıtlar
    # ═══════════════════════════════════════════════════════════
    Tour.objects.all().delete()
    TourRegistration.objects.all().delete()
    print("  - Turlar olusturuluyor...")

    tours_data = [
        {
            'title': 'Kerbela Erbain Yürüyüşü 2026',
            'date_start': '2026-08-20',
            'date_end': '2026-09-05',
            'duration': '16 gün',
            'price': '1.200 $',
            'total_seats': 45,
            'registered_count': 38,
            'status': 'Son 7 Yer!',
            'status_color': 'badge--danger',
            'image_gradient': 'linear-gradient(135deg, #1a1a2e, #16213e)',
        },
        {
            'title': 'Meşhed Ziyareti — İmam Rıza (a.s)',
            'date_start': '2026-06-15',
            'date_end': '2026-06-22',
            'duration': '7 gün',
            'price': '850 $',
            'total_seats': 30,
            'registered_count': 24,
            'status': 'Son 6 Yer',
            'status_color': 'badge--danger',
            'image_gradient': 'linear-gradient(135deg, #0D4F2B, #1a5e32)',
        },
        {
            'title': 'Necef-Kerbela-Kazımeyn Turu',
            'date_start': '2026-10-10',
            'date_end': '2026-10-20',
            'duration': '10 gün',
            'price': '950 $',
            'total_seats': 40,
            'registered_count': 12,
            'status': 'Kayıt Açık',
            'status_color': 'badge--primary',
            'image_gradient': 'linear-gradient(135deg, #2d1b4e, #4a1942)',
        },
        {
            'title': 'Şam Ziyareti — Hz. Zeynep (s.a)',
            'date_start': '2026-12-01',
            'date_end': '2026-12-07',
            'duration': '6 gün',
            'price': '700 $',
            'total_seats': 35,
            'registered_count': 0,
            'status': 'Yakında Açılacak',
            'status_color': 'badge--accent',
            'image_gradient': 'linear-gradient(135deg, #1a3a2a, #0D4F2B)',
        },
    ]

    registrants = [
        ('Əli Talıbov', '0532 100 20 30', 'TR12345678', 'Ailece gelmek istiyoruz, 3 kişiyiz.'),
        ('Fatma Nəsirova', '0535 200 30 40', 'TR23456789', None),
        ('Hüseyn Cəfərov', '0537 300 40 50', 'TR34567890', 'Tekerlekli sandalye erişimi var mı?'),
        ('Zeynəb Həsənli', '0539 400 50 60', 'TR45678901', None),
        ('Rəşad Əhmədov', '0530 500 60 70', 'TR56789012', 'Diyabet hastasıyım, otel yakınında eczane olmalı.'),
        ('Məryəm Quliyeva', '0544 600 70 80', None, 'Pasaport çıkartma aşamasındayım.'),
        ('Cahangir Əliyev', '0546 700 80 90', 'TR67890123', None),
        ('Gülnarə Babayeva', '0533 800 90 10', 'TR78901234', 'Eşimle birlikte 2 kişi.'),
        ('Sərdar İsmayılov', '0538 900 10 20', 'TR89012345', None),
        ('Rəhim Kazımzadə', '0541 100 20 30', 'TR90123456', 'Vizem var, Irak vizesi gerekiyor mu?'),
    ]

    for t_data in tours_data:
        tour = Tour.objects.create(**t_data)

        # İlk 2 tura kayıt ekle
        reg_count = t_data['registered_count']
        for i in range(min(reg_count, len(registrants))):
            r = registrants[i]
            TourRegistration.objects.create(
                tour=tour,
                full_name=r[0],
                phone=r[1],
                passport_no=r[2],
                note=r[3],
                status=['pending', 'approved', 'approved'][i % 3],
            )

    print("")
    print("=" * 50)
    print("SEED TAMAMLANDI - Sistem canli verilerle dolduruldu!")
    print("=" * 50)
    print(f"  - {Announcement.objects.filter(is_active=True).count()} Duyuru")
    print(f"  - {HelpRequest.objects.filter(is_resolved=False).count()} Yardım Talebi")
    print(f"  - {Hadith.objects.count()} Hadis")
    print(f"  - {Question.objects.filter(answer__isnull=False).count()} Cevaplanmış + {Question.objects.filter(answer__isnull=True).count()} Bekleyen Soru")
    print(f"  - {Campaign.objects.filter(is_active=True).count()} Kampanya + {Donation.objects.count()} Bağış")
    print(f"  - {Tour.objects.filter(is_active=True).count()} Tur + {TourRegistration.objects.count()} Kayıt")
    print("")

if __name__ == '__main__':
    seed_data()
