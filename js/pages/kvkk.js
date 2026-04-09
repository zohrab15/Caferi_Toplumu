export function renderKvkkPage() {
  const container = document.getElementById('page-content');
  
  container.innerHTML = `
    <div class="page">
      <div class="section-header" style="justify-content:center; margin-top:20px;">
        <h1 class="section-title" style="font-size:24px; text-align:center;">KVKK ve Gizlilik Politikası</h1>
      </div>
      
      <div class="card card--accent" style="padding:24px; line-height:1.6; color:var(--text-secondary); margin-bottom:40px;">
        <h3 style="color:var(--text-primary); margin-bottom:12px; font-weight:600;">1. Veri Sorumlusunun Kimliği</h3>
        <p style="margin-bottom:16px;">
          Ehli-Beyt Ankara ("Camii Yönetimi"), uygulama aracılığıyla elde edilen kişisel verileriniz bakımından Veri Sorumlusu sıfatını taşımaktadır.
        </p>

        <h3 style="color:var(--text-primary); margin-bottom:12px; font-weight:600;">2. İşlenen Kişisel Verileriniz</h3>
        <ul style="margin-bottom:16px; padding-left:20px;">
          <li><strong>Kimlik Bilgileriniz:</strong> Ad soyad, Pasaport/TCKN (Yalnızca tur kayıtlarında).</li>
          <li><strong>İletişim Bilgileriniz:</strong> Telefon numarası, E-posta adresi.</li>
          <li><strong>Sağlık Verileriniz:</strong> Kan grubu (Yardımlaşma ve acil anons hizmetleri için açık rızanızla alınır).</li>
          <li><strong>Finansal Bilgileriniz:</strong> Yalnızca bağış takip raporları için "bağış türü (humus/zekat) ve miktarı". (Kredi kartı verileri tutulmaz, ödeme kurumu tarafından işlenir).</li>
        </ul>

        <h3 style="color:var(--text-primary); margin-bottom:12px; font-weight:600;">3. Kişisel Verilerin İşlenme Amacı</h3>
        <p style="margin-bottom:16px;">
          Toplanan onaylı verileriniz; tur bilet/vize organizasyonunun yapılması, dini istifta ve soru-cevap hizmetinin verilmesi, acil sağlık/kan duyurularının hedeflenmesi ve finansal şeffaflık amaçlarıyla işlenmektedir.
        </p>

        <h3 style="color:var(--text-primary); margin-bottom:12px; font-weight:600;">4. Verilerin Aktarımı</h3>
        <p style="margin-bottom:16px;">
          Verileriniz hukuki zorunluluklar hariç olmak kaydıyla kesinlikle 3. şahıs veya şirketlere pazarlama amacıyla satılamaz/paylaşılamaz. Ancak Ziyaret ve Tur operasyonlarında konsolosluk/vize aracı kurumlarına ve seyahat firmalarına zaruri aktarım yapılabilmektedir.
        </p>

        <h3 style="color:var(--text-primary); margin-bottom:12px; font-weight:600;">5. İlgili Kişi Hakları</h3>
        <p style="margin-bottom:16px;">
          KVK Kanunu’nun 11. maddesi uyarınca; verilerinizin silinmesini talep etme, güncelleme veya hangi amaçla kullanıldığını öğrenme hakkınız bulunmaktadır. Taleplerinizi uygulama üzerinden yöneticiye iletebilirsiniz.
        </p>
        
        <div style="margin-top:24px; padding:12px; background:rgba(255,255,255,0.05); border-radius:8px; text-align:center; font-size:13px;">
          Son Güncelleme: 10 Nisan 2026
        </div>
      </div>
    </div>
  `;
}
