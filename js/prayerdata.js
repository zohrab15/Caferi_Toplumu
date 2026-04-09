//-----------------------------------------------------------------
// Caferi Ezan Vakitleri — Statik Veri (Ankara)
// Kaynak: ehlibeytalimleri.com/ankara-namaz-vakitleri
//-----------------------------------------------------------------
//
// ╔══════════════════════════════════════════════════════════════╗
// ║  YENİ AY EKLEMEK İÇİN:                                     ║
// ║                                                              ║
// ║  1. ehlibeytalimleri.com/ankara-namaz-vakitleri sayfasından  ║
// ║     yeni ay verilerini alın                                  ║
// ║                                                              ║
// ║  2. Aşağıdaki STATIC_PRAYER_TIMES objesine yeni girdileri   ║
// ║     ekleyin (tarih formatı: 'YYYY-MM-DD')                   ║
// ║                                                              ║
// ║  3. Her giriş şu formatta olmalıdır:                        ║
// ║     'YYYY-MM-DD': {                                          ║
// ║       Fajr:'HH:MM', Sunrise:'HH:MM', Dhuhr:'HH:MM',        ║
// ║       Asr:'HH:MM',  Maghrib:'HH:MM', Isha:'HH:MM',         ║
// ║       hijri:'GÜN AY_ADI YIL'                                ║
// ║     },                                                       ║
// ║                                                              ║
// ║  Sütun Karşılıkları:                                        ║
// ║   Fajr    = İmsak       Asr     = İkindi                    ║
// ║   Sunrise = Güneş       Maghrib = Akşam                     ║
// ║   Dhuhr   = Öğle        Isha    = Yatsı                     ║
// ╚══════════════════════════════════════════════════════════════╝
//

export const STATIC_PRAYER_TIMES = {

  // ─── Nisan 2026 ─────────────────────────────────────────────
  '2026-04-05': { Fajr:'04:53', Sunrise:'06:20', Dhuhr:'12:56', Asr:'16:32', Maghrib:'19:23', Isha:'20:44', hijri:'17 Şevval 1447' },
  '2026-04-06': { Fajr:'04:51', Sunrise:'06:18', Dhuhr:'12:56', Asr:'16:33', Maghrib:'19:24', Isha:'20:45', hijri:'18 Şevval 1447' },
  '2026-04-07': { Fajr:'04:50', Sunrise:'06:17', Dhuhr:'12:56', Asr:'16:33', Maghrib:'19:25', Isha:'20:46', hijri:'19 Şevval 1447' },
  '2026-04-08': { Fajr:'04:48', Sunrise:'06:15', Dhuhr:'12:56', Asr:'16:33', Maghrib:'19:26', Isha:'20:48', hijri:'20 Şevval 1447' },
  '2026-04-09': { Fajr:'04:46', Sunrise:'06:14', Dhuhr:'12:55', Asr:'16:34', Maghrib:'19:27', Isha:'20:49', hijri:'21 Şevval 1447' },
  '2026-04-10': { Fajr:'04:44', Sunrise:'06:12', Dhuhr:'12:55', Asr:'16:34', Maghrib:'19:28', Isha:'20:50', hijri:'22 Şevval 1447' },
  '2026-04-11': { Fajr:'04:42', Sunrise:'06:11', Dhuhr:'12:55', Asr:'16:34', Maghrib:'19:29', Isha:'20:52', hijri:'23 Şevval 1447' },
  '2026-04-12': { Fajr:'04:40', Sunrise:'06:09', Dhuhr:'12:55', Asr:'16:35', Maghrib:'19:30', Isha:'20:53', hijri:'24 Şevval 1447' },
  '2026-04-13': { Fajr:'04:38', Sunrise:'06:07', Dhuhr:'12:54', Asr:'16:35', Maghrib:'19:31', Isha:'20:54', hijri:'25 Şevval 1447' },
  '2026-04-14': { Fajr:'04:37', Sunrise:'06:06', Dhuhr:'12:54', Asr:'16:35', Maghrib:'19:32', Isha:'20:55', hijri:'26 Şevval 1447' },
  '2026-04-15': { Fajr:'04:35', Sunrise:'06:04', Dhuhr:'12:54', Asr:'16:36', Maghrib:'19:33', Isha:'20:57', hijri:'27 Şevval 1447' },
  '2026-04-16': { Fajr:'04:33', Sunrise:'06:03', Dhuhr:'12:54', Asr:'16:36', Maghrib:'19:34', Isha:'20:58', hijri:'28 Şevval 1447' },
  '2026-04-17': { Fajr:'04:31', Sunrise:'06:01', Dhuhr:'12:53', Asr:'16:36', Maghrib:'19:35', Isha:'20:59', hijri:'29 Şevval 1447' },
  '2026-04-18': { Fajr:'04:29', Sunrise:'06:00', Dhuhr:'12:53', Asr:'16:36', Maghrib:'19:36', Isha:'21:01', hijri:'1 Zilkade 1447' },
  '2026-04-19': { Fajr:'04:27', Sunrise:'05:59', Dhuhr:'12:53', Asr:'16:37', Maghrib:'19:37', Isha:'21:02', hijri:'2 Zilkade 1447' },
  '2026-04-20': { Fajr:'04:26', Sunrise:'05:57', Dhuhr:'12:53', Asr:'16:37', Maghrib:'19:38', Isha:'21:03', hijri:'3 Zilkade 1447' },
  '2026-04-21': { Fajr:'04:24', Sunrise:'05:56', Dhuhr:'12:52', Asr:'16:37', Maghrib:'19:39', Isha:'21:05', hijri:'4 Zilkade 1447' },
  '2026-04-22': { Fajr:'04:22', Sunrise:'05:54', Dhuhr:'12:52', Asr:'16:38', Maghrib:'19:40', Isha:'21:06', hijri:'5 Zilkade 1447' },
  '2026-04-23': { Fajr:'04:20', Sunrise:'05:53', Dhuhr:'12:52', Asr:'16:38', Maghrib:'19:41', Isha:'21:08', hijri:'6 Zilkade 1447' },
  '2026-04-24': { Fajr:'04:18', Sunrise:'05:51', Dhuhr:'12:52', Asr:'16:38', Maghrib:'19:42', Isha:'21:09', hijri:'7 Zilkade 1447' },
  '2026-04-25': { Fajr:'04:17', Sunrise:'05:50', Dhuhr:'12:52', Asr:'16:38', Maghrib:'19:43', Isha:'21:10', hijri:'8 Zilkade 1447' },
  '2026-04-26': { Fajr:'04:15', Sunrise:'05:49', Dhuhr:'12:51', Asr:'16:39', Maghrib:'19:44', Isha:'21:12', hijri:'9 Zilkade 1447' },
  '2026-04-27': { Fajr:'04:13', Sunrise:'05:47', Dhuhr:'12:51', Asr:'16:39', Maghrib:'19:45', Isha:'21:13', hijri:'10 Zilkade 1447' },
  '2026-04-28': { Fajr:'04:11', Sunrise:'05:46', Dhuhr:'12:51', Asr:'16:39', Maghrib:'19:46', Isha:'21:15', hijri:'11 Zilkade 1447' },
  '2026-04-29': { Fajr:'04:10', Sunrise:'05:45', Dhuhr:'12:51', Asr:'16:39', Maghrib:'19:47', Isha:'21:16', hijri:'12 Zilkade 1447' },
  '2026-04-30': { Fajr:'04:08', Sunrise:'05:43', Dhuhr:'12:51', Asr:'16:40', Maghrib:'19:48', Isha:'21:17', hijri:'13 Zilkade 1447' },

  // ─── Mayıs 2026 ─────────────────────────────────────────────
  '2026-05-01': { Fajr:'04:06', Sunrise:'05:42', Dhuhr:'12:51', Asr:'16:40', Maghrib:'19:49', Isha:'21:19', hijri:'14 Zilkade 1447' },
  '2026-05-02': { Fajr:'04:04', Sunrise:'05:41', Dhuhr:'12:51', Asr:'16:40', Maghrib:'19:50', Isha:'21:20', hijri:'15 Zilkade 1447' },
  '2026-05-03': { Fajr:'04:03', Sunrise:'05:40', Dhuhr:'12:51', Asr:'16:40', Maghrib:'19:51', Isha:'21:22', hijri:'16 Zilkade 1447' },
  '2026-05-04': { Fajr:'04:01', Sunrise:'05:39', Dhuhr:'12:50', Asr:'16:41', Maghrib:'19:52', Isha:'21:23', hijri:'17 Zilkade 1447' },
  '2026-05-05': { Fajr:'03:59', Sunrise:'05:37', Dhuhr:'12:50', Asr:'16:41', Maghrib:'19:53', Isha:'21:25', hijri:'18 Zilkade 1447' },
  '2026-05-06': { Fajr:'03:58', Sunrise:'05:36', Dhuhr:'12:50', Asr:'16:41', Maghrib:'19:54', Isha:'21:26', hijri:'19 Zilkade 1447' },

  // ─── YENİ AY VERİLERİNİ BURAYA EKLEYİN ─────────────────────
  // Örnek:
  // '2026-06-01': { Fajr:'03:30', Sunrise:'05:15', Dhuhr:'12:48', Asr:'16:45', Maghrib:'20:10', Isha:'21:50', hijri:'17 Zilhicce 1447' },
};

// Hicri ay isimleri (Türkçe ve Arapça)
const HIJRI_MONTHS_TR = [
  'Muharrem', 'Safer', 'Rebiülevvel', 'Rebiülahir',
  'Cemaziyelevvel', 'Cemaziyelahir', 'Recep', 'Şaban',
  'Ramazan', 'Şevval', 'Zilkade', 'Zilhicce'
];

const HIJRI_MONTHS_AR = [
  'مُحَرَّم', 'صَفَر', 'رَبيع الأوَّل', 'رَبيع الثاني',
  'جُمادى الأولى', 'جُمادى الآخرة', 'رَجَب', 'شَعبان',
  'رَمَضان', 'شَوَّال', 'ذو القِعدة', 'ذو الحِجَّة'
];

/**
 * Bugünün tarihine göre statik veri var mı kontrol eder.
 * Varsa { timings, hijri } döner, yoksa null döner.
 */
export function getStaticPrayerTimes(date) {
  const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const entry = STATIC_PRAYER_TIMES[key];
  if (!entry) return null;

  // Hicri tarihi parse et
  const hijriParts = entry.hijri.split(' ');
  const hijriDay = parseInt(hijriParts[0]);
  const hijriMonthName = hijriParts[1];
  const hijriYear = parseInt(hijriParts[2]);
  const hijriMonthIdx = HIJRI_MONTHS_TR.indexOf(hijriMonthName);

  return {
    timings: {
      Fajr: entry.Fajr,
      Sunrise: entry.Sunrise,
      Dhuhr: entry.Dhuhr,
      Asr: entry.Asr,
      Maghrib: entry.Maghrib,
      Isha: entry.Isha,
    },
    hijri: {
      day: hijriDay,
      month: hijriMonthIdx + 1,
      year: hijriYear,
      monthName: hijriMonthName,
      monthNameAr: HIJRI_MONTHS_AR[hijriMonthIdx] || '',
    },
    isStatic: true, // Statik veri göstergesi
  };
}

/**
 * Statik veri kapsama aralığını döner (ilk tarih — son tarih)
 */
export function getStaticDataRange() {
  const keys = Object.keys(STATIC_PRAYER_TIMES).sort();
  if (keys.length === 0) return null;
  return {
    first: keys[0],
    last: keys[keys.length - 1],
    totalDays: keys.length,
  };
}
