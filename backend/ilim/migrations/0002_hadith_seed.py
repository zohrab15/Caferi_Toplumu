# Generated automatically
from django.db import migrations

def seed_hadiths(apps, schema_editor):
    Hadith = apps.get_model('ilim', 'Hadith')
    
    hadiths = [
        {"text": "Ben ilmin şehriyim, Ali ise onun kapısıdır. İlmi isteyen kapısına gelsin.", "source": "Hz. Muhammed (s.a.a)", "reference": "El-Müracaat, 1. Mektup", "day_of_year": 1},
        {"text": "İnsanlarla öyle geçinin ki, öldüğünüzde size ağlasınlar, yaşarken sizinle dost olmak istesinler.", "source": "İmam Ali (a.s)", "reference": "Nehcü'l Belağa, Hikmetli Sözler 10", "day_of_year": 2},
        {"text": "Kim bizim kaimimizi (Mehdi'yi) beklerken ölürse, tıpkı onun çadırında onunla beraber olan kimse gibidir.", "source": "İmam Cafer es-Sadık (a.s)", "reference": "Kemaluddin, 644", "day_of_year": 3},
        {"text": "Müminin onuru, insanlardan müstağni olmasındadır (kimseye muhtaç hissetmemesidir).", "source": "İmam Zeyn'el Abidin (a.s)", "reference": "Bihar-ul Envar, c.75, s.140", "day_of_year": 4},
        {"text": "Hüseyin hidayet meşalesi ve kurtuluş gemisidir.", "source": "Hz. Muhammed (s.a.a)", "reference": "Sefinet-ul Bihar, c.1, s.257", "day_of_year": 5},
        {"text": "Susmak yaşanacak belaları def eder, vakar ve saygınlığı artırır.", "source": "İmam Musa Kâzım (a.s)", "reference": "Tuhef'ul-Ukul, s.410", "day_of_year": 6},
        {"text": "İlim, maldan hayırlıdır; çünkü ilim seni korur, malı ise sen korursun.", "source": "İmam Ali (a.s)", "reference": "Nehcü'l Belağa, Hikmetli Sözler 147", "day_of_year": 7},
        {"text": "Akıllının dili kalbinin arkasındadır, aptalın kalbi ise dilinin arkasındadır.", "source": "İmam Ali (a.s)", "reference": "Nehcü'l Belağa, Hikmetli Sözler 40", "day_of_year": 8},
        {"text": "Allah her şeyi güzelce yarattı, fakat ahlak güzelliği hepsinden daha değerlidir.", "source": "İmam Hasan (a.s)", "reference": "Keşfül Gumme, c.1, s.561", "day_of_year": 9},
        {"text": "İnsanlara zulmetmekten sakın, çünkü bu kıyamet gününün karanlığıdır.", "source": "İmam Muhammed Bakır (a.s)", "reference": "Bihar-ul Envar, c.75, s.309", "day_of_year": 10},
        {"text": "Bizim şefaatimiz, namazı hafife alanlara ulaşmaz.", "source": "İmam Cafer es-Sadık (a.s)", "reference": "Bihar-ul Envar, c.82, s.236", "day_of_year": 11},
        {"text": "Kardeşini sırrınla baş başa bırakma, ona sadece zahirini göster. Dostuna da düşmanına söylediğin her şeyi söyleme.", "source": "İmam Rıza (a.s)", "reference": "Tuhef-ul Ukul, s.446", "day_of_year": 12},
        {"text": "Zulme rıza gösteren, zalimle ortaktır.", "source": "İmam Hüseyin (a.s)", "reference": "Tuhef-ul Ukul, s.245", "day_of_year": 13},
        {"text": "Güleryüzlülük, kini ve nefreti ortadan kaldırır.", "source": "İmam Hasan El-Askeri (a.s)", "reference": "Bihar-ul Envar, c.78, s.371", "day_of_year": 14},
        {"text": "Kimin iki günü birbirine eşitse, o ziyandadır.", "source": "İmam Cafer es-Sadık (a.s)", "reference": "Mealim-uz Zulfa, s.414", "day_of_year": 15},
        {"text": "Mümin kardeşini sevindiren her iş Allah'ı sevindirir.", "source": "Hz. Muhammed (s.a.a)", "reference": "Usul-u Kâfi, c.2, s.188", "day_of_year": 16},
        {"text": "Gözleri ağlamaktan kuruyan kimsenin kalbi katılaşmıştır.", "source": "İmam Ali (a.s)", "reference": "Gurer'ul-Hikem, s.191", "day_of_year": 17},
        {"text": "Nimet şükürle, şükür ise Allah’a taatla tamamlanır.", "source": "İmam Cevad (a.s)", "reference": "Keşf-ül Gumme, c.2, s.348", "day_of_year": 18},
        {"text": "Cimrinin malı yoksulu değil, mirasçıyı bekler.", "source": "İmam Zeyn'el Abidin (a.s)", "reference": "Tuhef-ul Ukul, s.278", "day_of_year": 19},
        {"text": "Hiç kimse ameli olmaksızın kurtuluşa eremez.", "source": "İmam Muhammed Bakır (a.s)", "reference": "Usul-u Kâfi, c.2, s.74", "day_of_year": 20},
        {"text": "Güzel ahlak imanın yarısıdır.", "source": "Hz. Muhammed (s.a.a)", "reference": "Makarim'ul Ahlak, s.17", "day_of_year": 21},
        {"text": "Kibir, aklın afetidir.", "source": "İmam Ali (a.s)", "reference": "Gurer'ul Hikem, 2011", "day_of_year": 22},
        {"text": "Sabır, imanın başıdır.", "source": "Hz. Muhammed (s.a.a)", "reference": "Usul-u Kâfi, c.2, s.87", "day_of_year": 23},
        {"text": "Sizden kim Allah'ı daha çok tanırsa, ondan daha fazla korkar.", "source": "İmam Ali Rıza (a.s)", "reference": "Uyun-u Ahbar'ir Rıza, c.2", "day_of_year": 24},
        {"text": "Haksızlık karşısında susan dilsiz şeytandır.", "source": "İmam Ali (a.s)", "reference": "Nehcü'l Belağa, Hikmetli Sözler 274", "day_of_year": 25},
        {"text": "Dünyayı ebedi bir yurt edinme, buradan ancak azık al.", "source": "İmam Hasan (a.s)", "reference": "Bihar-ul Envar, c.44", "day_of_year": 26},
        {"text": "En üstün ibadet, helal lokma kazanmaktır.", "source": "İmam Muhammed Bakır (a.s)", "reference": "Vesail'uş Şia, c.17, s.24", "day_of_year": 27},
        {"text": "Zamanın İmamı Mehdi ortaya çıktığında yeryüzü adaletle dolacaktır.", "source": "İmam Cafer es-Sadık (a.s)", "reference": "Kemaluddin, 334", "day_of_year": 28},
        {"text": "Birbirinize düşmanlık etmeyin, çünkü bu dininizi traş eder.", "source": "İmam Ali (a.s)", "reference": "Nehcü'l Belağa", "day_of_year": 29},
        {"text": "Gerçek yoksulluk, akıl yoksulluğudur.", "source": "Hz. Muhammed (s.a.a)", "reference": "Tuhef-ul Ukul, s.14", "day_of_year": 30},
        {"text": "Kim Allah için tevazu ederse, Allah onu yüceltir.", "source": "İmam Cafer es-Sadık (a.s)", "reference": "Usul-u Kâfi, c.2, s.122", "day_of_year": 31},
        {"text": "Fakirlik ateşten daha sıcaktır.", "source": "İmam Ali (a.s)", "reference": "Nehcü'l Belağa", "day_of_year": 32},
        {"text": "Dua müminin silahı, dinin direği, göklerin ve yerin nurudur.", "source": "Hz. Muhammed (s.a.a)", "reference": "Usul-u Kâfi, c.2, s.468", "day_of_year": 33},
        {"text": "Haksızlık karşısında eğilmeyin, çünkü hakkınızla beraber şerefinizi de kaybedersiniz.", "source": "İmam Ali (a.s)", "reference": "Nehcü'l Belağa", "day_of_year": 34},
        {"text": "Ziyaretine giden mümin, sanki Resulullah'ın kabrini ziyaret etmiş gibidir.", "source": "İmam Rıza (a.s)", "reference": "Sefinet-ul Bihar, c.1", "day_of_year": 35},
        {"text": "Kur'an ile birlikte olan rüsvay olmaz.", "source": "İmam Muhammed Bakır (a.s)", "reference": "Usul-u Kâfi, c.2, s.600", "day_of_year": 36},
        {"text": "Birisinde bir ayıp görürseniz önce kendinize bakın.", "source": "İmam Cafer es-Sadık (a.s)", "reference": "Mişkat-ul Envar", "day_of_year": 37},
        {"text": "Az yiyenin hesabı hafif olur.", "source": "Hz. Muhammed (s.a.a)", "reference": "Bihar-ul Envar, c.63", "day_of_year": 38},
        {"text": "Hüseyin'in kanı aşıkların kalbinde sönmeyecek bir ateş yakmıştır.", "source": "Hz. Muhammed (s.a.a)", "reference": "Müstedrek'ul Vesail, c.10, s.318", "day_of_year": 39},
        {"text": "En kötü arkadaş, hatanı yüzüne vurmayan ve seninle yaltaklanandır.", "source": "İmam Hasan (a.s)", "reference": "Tuhef-ul Ukul", "day_of_year": 40},
        {"text": "Mümin, her durumda hamd eden ve rıza gösterendir.", "source": "İmam Zeyn'el Abidin (a.s)", "reference": "Sahife-i Seccadiye", "day_of_year": 41},
        {"text": "Kişi sevdikleriyle beraber haşrolunur.", "source": "Hz. Muhammed (s.a.a)", "reference": "Usul-u Kâfi, c.2", "day_of_year": 42},
        {"text": "Kanaat tükenmez bir hazinedir.", "source": "İmam Ali (a.s)", "reference": "Nehcü'l Belağa", "day_of_year": 43},
        {"text": "Sohbetin en kötüsü gıybet etmektir.", "source": "İmam Rıza (a.s)", "reference": "Uyun-u Ahbar'ir Rıza", "day_of_year": 44},
        {"text": "İman ehli, kardeşleri için kendisi gibi merhamet diler.", "source": "İmam Musa Kâzım (a.s)", "reference": "Bihar-ul Envar", "day_of_year": 45},
        {"text": "Ehil olmayanlara ilim öğretmeye kalkışmayın, çünkü ilme zulmedersiniz.", "source": "İmam Ali (a.s)", "reference": "Nehcü'l Belağa", "day_of_year": 46},
        {"text": "Yumuşak huyluluk, sahibine çok iyilik kazandırır.", "source": "İmam Muhammed Bakır (a.s)", "reference": "Usul-u Kâfi, c.2", "day_of_year": 47},
        {"text": "Dostlarla istişare, aklı ve basireti artırır.", "source": "İmam Cafer es-Sadık (a.s)", "reference": "Bihar-ul Envar", "day_of_year": 48},
        {"text": "Ey insanlar! Dünyayı ahiret için tarlanız kılın.", "source": "Hz. Muhammed (s.a.a)", "reference": "Mekarim'ul Ahlak", "day_of_year": 49},
        {"text": "Dünya, müminin zindanı, kafirin cennetidir.", "source": "Hz. Muhammed (s.a.a)", "reference": "Tuhef-ul Ukul", "day_of_year": 50},
    ]

    for item in hadiths:
        # Avoid crashing if it already exists, checking day_of_year to avoid bloating if re-run
        Hadith.objects.get_or_create(day_of_year=item['day_of_year'], defaults=item)

class Migration(migrations.Migration):

    dependencies = [
        ('ilim', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(seed_hadiths),
    ]
