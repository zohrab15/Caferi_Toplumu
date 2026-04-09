// Pilgrimage Page — Ziyaret & Koordinasyon
import { apiFetch, isLoggedIn, showToast } from '../api.js';

const guides = [
  {
    icon: '🕋',
    title: 'İmam Hüseyin (a.s) Ziyaretnamesi',
    desc: 'Kerbela · Türkçe & Arapça',
    content: `<div class="ziyaret-content">
      <p class="ziyaret-content__arabic">اَلسَّلامُ عَلَيْكَ يا اَبا عَبْدِ اللهِ</p>
      <p class="ziyaret-content__tr">Selam olsun sana ey Eba Abdillah!</p>
      <p class="ziyaret-content__arabic">اَلسَّلامُ عَلَيْكَ يَا بْنَ رَسُولِ اللهِ</p>
      <p class="ziyaret-content__tr">Selam olsun sana ey Resulullah'ın oğlu!</p>
      <p class="ziyaret-content__note">— Mefatih-ul Cinan'dan alıntı —</p>
    </div>`
  },
  {
    icon: '🌟',
    title: 'İmam Rıza (a.s) Ziyaretnamesi',
    desc: 'Meşhed · Türkçe & Arapça',
    content: `<div class="ziyaret-content">
      <p class="ziyaret-content__arabic">اَلسَّلامُ عَلَيْكَ يا عَلِيَّ بْنَ مُوسَى الرِّضا</p>
      <p class="ziyaret-content__tr">Selam olsun sana ey Ali bin Musa er-Rıza!</p>
      <p class="ziyaret-content__note">— Mefatih-ul Cinan'dan alıntı —</p>
    </div>`
  },
  {
    icon: '🕌',
    title: 'Hz. Zeynep (s.a) Türbesi',
    desc: 'Şam · Ziyaret adabı ve dualar',
    content: `<div class="ziyaret-content">
      <p class="ziyaret-content__arabic">اَلسَّلامُ عَلَيْكِ يا زَيْنَبَ الْكُبْرى</p>
      <p class="ziyaret-content__tr">Selam olsun sana ey Zeyneb-i Kübra!</p>
      <p class="ziyaret-content__arabic">اَلسَّلامُ عَلَيْكِ يا بِنْتَ اَميرِ الْمُؤْمِنينَ</p>
      <p class="ziyaret-content__tr">Selam olsun sana ey Müminlerin Emiri'nin kızı!</p>
    </div>`
  },
  {
    icon: '📿',
    title: 'Erbain Duaları',
    desc: 'Yürüyüş esnasında okunacak dualar',
    content: `<div class="ziyaret-content">
      <p class="ziyaret-content__subtitle">Erbain Yürüyüşü Ziyaretnamesi</p>
      <p class="ziyaret-content__arabic">اَلسَّلامُ عَلى وَلِيِّ اللهِ وَ حَبيبِهِ</p>
      <p class="ziyaret-content__tr">Selam olsun Allah'ın velisine ve sevgilisine</p>
      <p class="ziyaret-content__note">— Ziyaret-i Erbain · Mefatih-ul Cinan —</p>
    </div>`
  },
  {
    icon: '🗺️',
    title: 'Kutsal Mekanlar Haritası',
    desc: 'Kerbela, Necef, Kazımiye, Samarra',
    content: `<div class="ziyaret-content">
      <div class="holy-places-grid">
        <div class="holy-place"><div class="holy-place__icon">🕋</div><div class="holy-place__name">Kerbela</div><div class="holy-place__info">İmam Hüseyin & Hz. Abbas</div></div>
        <div class="holy-place"><div class="holy-place__icon">🌟</div><div class="holy-place__name">Necef</div><div class="holy-place__info">İmam Ali Türbesi</div></div>
        <div class="holy-place"><div class="holy-place__icon">🕌</div><div class="holy-place__name">Kazımiye</div><div class="holy-place__info">İmam Kazım & Cevad</div></div>
        <div class="holy-place"><div class="holy-place__icon">✨</div><div class="holy-place__name">Samarra</div><div class="holy-place__info">İmam Hadi & Askeri</div></div>
        <div class="holy-place"><div class="holy-place__icon">🌙</div><div class="holy-place__name">Meşhed</div><div class="holy-place__info">İmam Rıza Türbesi</div></div>
        <div class="holy-place"><div class="holy-place__icon">💫</div><div class="holy-place__name">Şam</div><div class="holy-place__info">Hz. Zeynep & Rukiye</div></div>
      </div>
    </div>`
  },
];

let expandedGuide = null;
let currentTours = [];

export async function renderZiyaretPage() {
  const container = document.getElementById('page-content');
  
  container.innerHTML = `<div class="page text-center" style="padding:40px;"><div class="skeleton" style="width:100%;height:300px;border-radius:12px"></div></div>`;

  try {
    const tours = await apiFetch('/ziyaret/tours/');
    if (tours._error) throw new Error("Turlar yüklenemedi");
    currentTours = tours;

    container.innerHTML = `
      <div class="page">
        <!-- Hero -->
        <div class="ziyaret-hero">
          <div class="ziyaret-hero__icon">🕋</div>
          <h1 class="ziyaret-hero__title">Ziyaret & Koordinasyon</h1>
          <p class="ziyaret-hero__subtitle">Kutsal mekanlara yolculuk — Hizmet Merkezi</p>
        </div>

        <!-- Active Tours -->
        <div class="section-header">
          <h2 class="section-title">Aktif Turlar</h2>
          <span class="badge badge--primary">${tours.length} tur</span>
        </div>
        <div class="tour-list">
          ${tours.map(t => `
            <div class="tour-card">
              <div class="tour-card__image" style="background:${t.image}">
                <div class="tour-card__badge">
                  <span class="badge ${t.statusColor}">${t.status}</span>
                </div>
              </div>
              <div class="tour-card__content">
                <h3 class="tour-card__title">${t.title}</h3>
                <div class="tour-card__details">
                  <span class="tour-card__detail">📅 ${t.date}</span>
                  <span class="tour-card__detail">⏱ ${t.duration}</span>
                </div>
                <div class="tour-card__footer">
                  <span class="tour-card__price">${t.price}</span>
                  <span class="tour-card__seats">${t.seats}</span>
                </div>
                <button class="btn btn--primary btn--full tour-btn-scroll" data-tour-id="${t.id}" style="margin-top:12px">
                  Kayıt Ol
                </button>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Pilgrimage Guide -->
        <div class="section-header">
          <h2 class="section-title">📖 Ziyaret Rehberi</h2>
          <span class="badge badge--accent">${guides.length} rehber</span>
        </div>
        <div class="guide-list">
          ${guides.map((g, idx) => `
            <div class="guide-item" data-guide-idx="${idx}" id="guide-${idx}">
              <div class="guide-item__icon">${g.icon}</div>
              <div>
                <div class="guide-item__title">${g.title}</div>
                <div class="guide-item__desc">${g.desc}</div>
              </div>
              <span class="guide-item__arrow" id="guide-arrow-${idx}">›</span>
            </div>
            <div class="guide-detail" id="guide-detail-${idx}" style="display:none">
              ${g.content}
            </div>
          `).join('')}
        </div>

        <!-- Registration Form -->
        <div class="divider"></div>
        <div class="registration-form" id="register-form-section">
          ${isLoggedIn() ? `
          <h3 class="registration-form__title">📋 Online Kayıt Formu</h3>
          <form id="registration-form">
            <div class="form-group">
              <label class="form-label">Tur Seçimi</label>
              <select class="form-select" id="tour-select" required>
                <option value="">Tur seçiniz...</option>
                ${tours.map(t => `<option value="${t.id}">${t.title}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Ad Soyad</label>
              <input type="text" id="reg-name" class="form-input" placeholder="Tam adınızı giriniz" required />
            </div>
            <div class="form-group">
              <label class="form-label">Telefon</label>
              <input type="tel" id="reg-phone" class="form-input" placeholder="+90 5XX XXX XX XX" required />
            </div>
            <div class="form-group">
              <label class="form-label">Pasaport Numarası</label>
              <input type="text" id="reg-passport" class="form-input" placeholder="Pasaport no" />
            </div>
            <div class="form-group">
              <label class="form-label">Not</label>
              <textarea id="reg-note" class="form-textarea" placeholder="Eklemek istediğiniz not..." rows="2"></textarea>
            </div>
            <div class="form-group" style="padding:12px; background:var(--bg-secondary); border-radius:8px; border:1px solid var(--border-color);">
              <label style="display:flex; align-items:flex-start; gap:10px; cursor:pointer;" for="kvkk-check">
                <input type="checkbox" id="kvkk-check" required style="margin-top:4px; accent-color:var(--color-primary);">
                <span style="font-size:12px; color:var(--text-secondary); line-height:1.4;">
                  <a href="#kvkk" style="color:var(--color-primary); text-decoration:underline;">KVKK Aydınlatma Metnini</a> ve vize/bilet işlemleri için kimlik bilgilerimin işlenmesini okudum, onaylıyorum.
                </span>
              </label>
            </div>
            <button type="submit" class="btn btn--accent btn--full btn--lg" id="register-submit-btn">
              🛫 Kayıt Gönder
            </button>
          </form>
          ` : `
          <div class="card card--dark" style="padding:24px; text-align:center;">
             <div style="font-size:40px; margin-bottom:12px;">🛂</div>
             <p style="margin-bottom:16px; color:var(--text-secondary);">Turlara kayıt yaptırmak ve işlemlerinizi takip etmek için giriş yapmanız gerekmektedir.</p>
             <button class="btn btn--primary btn--full" onclick="window.location.hash='auth'">🔑 Giriş Yaparak Kayıt Olun</button>
          </div>
          `}
        </div>
      </div>
    `;

    // Guide items -> expand
    container.querySelectorAll('.guide-item').forEach(item => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.dataset.guideIdx);
        const detail = document.getElementById(`guide-detail-${idx}`);
        const arrow = document.getElementById(`guide-arrow-${idx}`);

        if (expandedGuide !== null && expandedGuide !== idx) {
          document.getElementById(`guide-detail-${expandedGuide}`).style.display = 'none';
          document.getElementById(`guide-arrow-${expandedGuide}`).style.transform = 'rotate(0deg)';
        }

        if (detail.style.display === 'none') {
          detail.style.display = 'block';
          arrow.style.transform = 'rotate(90deg)';
          expandedGuide = idx;
        } else {
          detail.style.display = 'none';
          arrow.style.transform = 'rotate(0deg)';
          expandedGuide = null;
        }
      });
    });

    // "Kayıt Ol" button scrolls to form and sets the dropdown value
    container.querySelectorAll('.tour-btn-scroll').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!isLoggedIn()) {
          window.location.hash = 'auth';
          return;
        }
        document.getElementById('tour-select').value = btn.dataset.tourId;
        document.getElementById('register-form-section').scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Form submission to API
    document.getElementById('registration-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const payload = {
        tour: parseInt(document.getElementById('tour-select').value),
        full_name: document.getElementById('reg-name').value,
        phone: document.getElementById('reg-phone').value,
        passport_no: document.getElementById('reg-passport').value,
        note: document.getElementById('reg-note').value,
      };

      const btn = document.getElementById('register-submit-btn');
      btn.disabled = true;
      btn.textContent = 'İşleniyor...';

      const res = await apiFetch('/ziyaret/register/', {
        method: 'POST',
        body: payload,
        requireAuth: true // Kullanıcı giriş yapmışsa user ID bağlar
      });

      if (!res._error) {
        showToast('Kaydınız başarıyla alındı! En kısa sürede iletişime geçeceğiz.', 'success', 5000);
        document.getElementById('registration-form').reset();
        btn.disabled = false;
        btn.textContent = '🛫 Kayıt Gönder';
      } else {
        showToast('Kayıt işlemi sırasında bir hata oluştu.', 'error');
        btn.disabled = false;
        btn.textContent = '🛫 Kayıt Gönder';
      }
    });

  } catch (e) {
    container.innerHTML = `<div class="page text-center"><p class="text-danger">Bağlantı hatası: Turlar yüklenemedi.</p></div>`;
  }
}
