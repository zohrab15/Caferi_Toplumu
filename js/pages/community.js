import { apiFetch, isLoggedIn, showToast } from '../api.js';

let selectedHelpCategory = null;

export async function renderCommunityPage() {
  const container = document.getElementById('page-content');
  
  container.innerHTML = `
    <div class="page" style="text-align:center;padding:40px;">
      <div class="skeleton" style="width:100%;height:150px;border-radius:12px;margin-bottom:20px;"></div>
      <div class="skeleton" style="width:100%;height:300px;border-radius:12px;"></div>
    </div>
  `;

  try {
    const [announcements, helpCategories] = await Promise.all([
      apiFetch('/community/announcements/'),
      apiFetch('/community/help-requests/')
    ]);

    // Error handling
    if (announcements._error) throw new Error("Duyurular yüklenemedi");

    container.innerHTML = `
      <div class="page">
        <!-- Community banner -->
        <div class="community-banner">
          <div class="community-banner__icon">🤲</div>
          <h1 class="community-banner__title">Topluluk Meydanı</h1>
          <p class="community-banner__subtitle">Cemaatimizin dijital buluşma noktası</p>
        </div>

        <!-- Live stream card -->
        <div class="live-section">
          <div class="section-header">
            <h2 class="section-title">
              <span class="badge badge--live" style="margin-right:6px">● CANLI</span>
              Canlı Yayın
            </h2>
          </div>
          <div class="live-player-card">
            <div class="live-player__video" id="live-player-container">
              <div class="live-player__placeholder" id="live-placeholder">
                <div class="live-player__play-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40"><polygon points="5,3 19,12 5,21"/></svg>
                </div>
                <div class="live-player__label">Canlı Yayını İzle</div>
                <div class="live-player__sublabel">Muharrem gecesi programı</div>
              </div>
            </div>
            <div class="live-player__info">
              <div class="live-player__title">📺 Muharrem Gecesi Programı</div>
              <div class="live-player__meta">
                <span class="badge badge--primary" style="font-size:10px">Ankara Caferi Camii</span>
                <span class="text-muted" style="font-size:11px">Her akşam 20:00</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Announcements -->
        <div class="section-header">
          <h2 class="section-title">Duyurular</h2>
          <a href="#" class="section-link">Tümü →</a>
        </div>
        <div class="announcement-list">
          ${announcements.length > 0 ? announcements.map(a => `
            <div class="announcement-card">
              <div class="announcement-card__header">
                <span class="announcement-card__category" style="color:${a.categoryColor}">${a.category}</span>
                <div style="display:flex;align-items:center;gap:8px">
                  ${a.badge ? `<span class="badge badge--accent">${a.badge}</span>` : ''}
                  <span class="announcement-card__date">${a.date}</span>
                </div>
              </div>
              <h3 class="announcement-card__title">${a.title}</h3>
              <p class="announcement-card__body">${a.body}</p>
            </div>
          `).join('') : '<p class="text-muted text-center" style="font-size:13px">Güncel duyuru bulunmamaktadır.</p>'}
        </div>

        <!-- Help network -->
        <div class="section-header">
          <h2 class="section-title">Yardımlaşma Şebekesi</h2>
        </div>
        <div class="help-grid">
          ${helpCategories.length > 0 ? helpCategories.map((h, idx) => `
            <div class="help-card" data-help-idx="${idx}" id="help-card-${idx}">
              <div class="help-card__icon">${h.icon}</div>
              <div class="help-card__title">${h.title}</div>
              <div class="help-card__count">${h.count}</div>
            </div>
          `).join('') : '<p class="text-muted text-center">Yardım kategorisi bulunamadı.</p>'}
        </div>

        <!-- Help detail panel -->
        <div class="help-detail-panel" id="help-detail-panel" style="display:none">
          <div class="help-detail__header">
            <h3 class="help-detail__title" id="help-detail-title"></h3>
            <button class="help-detail__close" id="help-detail-close">✕</button>
          </div>
          <div class="help-detail__list" id="help-detail-list"></div>
        </div>

        <div style="margin-top:20px;">
          <button class="btn btn--outline btn--full" id="show-help-form-btn" style="border-color:var(--color-primary); color:var(--color-primary);">
            ${isLoggedIn() ? '➕ Yeni Yardım Talebi Oluştur' : '🔑 Yardım Talebi için Giriş Yapın'}
          </button>
          <div id="help-form-container" style="display:none; margin-top:16px;">
            <form id="help-request-form" class="card card--dark" style="padding:20px;">
              <div class="form-group">
                <label class="form-label">Kategori</label>
                <select id="help-category" class="form-select" required>
                  <option value="Kan Bağışı">🩸 Kan Bağışı</option>
                  <option value="İş İlanları">💼 İş İlanı</option>
                  <option value="Öğrenci Desteği">🎓 Öğrenci Desteği</option>
                  <option value="Genel Yardım">🤝 Genel Yardım</option>
                </select>
              </div>
              <div class="form-group" id="blood-group-field">
                <label class="form-label">İhtiyaç Duyulan Kan Grubu</label>
                <select id="help-blood-group" class="form-select">
                  <option value="A Rh+">A Rh+</option><option value="A Rh-">A Rh-</option>
                  <option value="B Rh+">B Rh+</option><option value="B Rh-">B Rh-</option>
                  <option value="0 Rh+">0 Rh+</option><option value="0 Rh-">0 Rh-</option>
                  <option value="AB Rh+">AB Rh+</option><option value="AB Rh-">AB Rh-</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Başlık / Ad Soyad</label>
                <input type="text" id="help-title" class="form-input" placeholder="Örn: Ahmet Yılmaz acil kan arıyor" required>
              </div>
              <div class="form-group">
                <label class="form-label">Açıklama</label>
                <textarea id="help-desc" class="form-textarea" rows="2" placeholder="Detaylı açıklama..." required></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">İletişim (Telefon)</label>
                <input type="text" id="help-contact" class="form-input" placeholder="+90 5XX XXX XX XX">
              </div>
              <button type="submit" class="btn btn--primary btn--full" id="help-submit-btn">Talebi Gönder</button>
            </form>
          </div>
        </div>

        <!-- Quick contact -->
        <div class="card card--accent" style="margin-top:var(--space-lg);text-align:center;padding:var(--space-xl)">
          <div style="font-size:32px;margin-bottom:8px">📞</div>
          <div style="font-weight:700;font-size:var(--font-size-lg);margin-bottom:4px">Acil Durumda Bize Ulaşın</div>
          <div class="text-muted" style="font-size:var(--font-size-sm);margin-bottom:12px">Camii Telefon: +90 505 094 00 83</div>
          <a href="tel:+905050940083" class="btn btn--primary" style="display:inline-block; text-decoration:none;">📱 Hemen Ara</a>
        </div>
      </div>
    `;

    // Help category click
    container.querySelectorAll('.help-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.helpIdx);
        const cat = helpCategories[idx];
        const panel = document.getElementById('help-detail-panel');
        const title = document.getElementById('help-detail-title');
        const list = document.getElementById('help-detail-list');

        if (selectedHelpCategory === idx) {
          panel.style.display = 'none';
          selectedHelpCategory = null;
          container.querySelectorAll('.help-card').forEach(c => c.classList.remove('help-card--active'));
          return;
        }

        selectedHelpCategory = idx;
        container.querySelectorAll('.help-card').forEach(c => c.classList.remove('help-card--active'));
        card.classList.add('help-card--active');

        title.textContent = `${cat.icon} ${cat.title}`;
        
        if (cat.items && cat.items.length > 0) {
          list.innerHTML = cat.items.map(item => `
            <div class="help-detail__item">
              <div class="help-detail__item-info">
                <div class="help-detail__item-name">${item.name}</div>
                <div class="help-detail__item-desc">${item.desc}</div>
              </div>
              <div class="help-detail__item-date">${item.date}</div>
            </div>
          `).join('');
        } else {
           list.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-muted);font-size:13px;">Bu kategoride aktif talep yok.</div>';
        }

        panel.style.display = 'block';
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    });

    document.getElementById('help-detail-close')?.addEventListener('click', () => {
      document.getElementById('help-detail-panel').style.display = 'none';
      selectedHelpCategory = null;
      container.querySelectorAll('.help-card').forEach(c => c.classList.remove('help-card--active'));
    });

    // Live stream click
    document.getElementById('live-placeholder')?.addEventListener('click', () => {
      document.getElementById('live-player-container').innerHTML = `
        <div class="live-player__embed">
          <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:12px;color:var(--text-secondary)">
            <div style="font-size:48px">📺</div>
            <div style="font-size:14px;text-align:center">Canlı yayın şu anda aktif değildir.<br/>Program saatinde tekrar deneyin.</div>
            <div style="font-size:11px;color:var(--text-muted)">Her akşam 20:00 — Ankara Caferi Camii</div>
          </div>
        </div>
      `;
    });

    // Help form toggle
    document.getElementById('show-help-form-btn')?.addEventListener('click', () => {
      // Check login status first
      if (!isLoggedIn()) {
        window.location.hash = 'auth';
        return;
      }

      const fc = document.getElementById('help-form-container');
      const btn = document.getElementById('show-help-form-btn');
      if (fc.style.display === 'none') {
        fc.style.display = 'block';
        btn.textContent = '✕ Formu Kapat';
      } else {
        fc.style.display = 'none';
        btn.textContent = '➕ Yeni Yardım Talebi Oluştur';
      }
    });

    // Show/hide blood group & update placeholders based on category
    document.getElementById('help-category')?.addEventListener('change', (e) => {
      const val = e.target.value;
      document.getElementById('blood-group-field').style.display = val === 'Kan Bağışı' ? 'block' : 'none';
      
      const titleInput = document.getElementById('help-title');
      const descInput = document.getElementById('help-desc');
      const titleLabel = titleInput.previousElementSibling;
      
      if (val === 'Kan Bağışı') {
        titleLabel.textContent = 'Başlık / Ad Soyad';
        titleInput.placeholder = 'Örn: Ahmet Yılmaz acil kan arıyor';
        descInput.placeholder = 'Hastanın yattığı hastane, aciliyet durumu vb. detaylar...';
      } else if (val === 'İş İlanları') {
        titleLabel.textContent = 'İş Pozisyonu';
        titleInput.placeholder = 'Örn: Tecrübeli Muhasebeci Aranıyor';
        descInput.placeholder = 'İşin tanımı, aranan nitelikler, çalışma koşulları...';
      } else if (val === 'Öğrenci Desteği') {
        titleLabel.textContent = 'Destek Türü';
        titleInput.placeholder = 'Örn: Üniversite öğrencisine burs veya laptop ihtiyacı';
        descInput.placeholder = 'Öğrencinin okuduğu bölüm, başarı durumu, ihtiyaç detayı...';
      } else {
        titleLabel.textContent = 'Talebin Kısa Özeti';
        titleInput.placeholder = 'Örn: Temel erzak ihtiyacı olan aile';
        descInput.placeholder = 'Yardım talebinizle ilgili detaylı açıklama...';
      }
    });

    // Help request form submit
    document.getElementById('help-request-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('help-submit-btn');
      btn.disabled = true;
      btn.textContent = 'Gönderiliyor...';

      const cat = document.getElementById('help-category').value;
      let title = document.getElementById('help-title').value;
      let desc = document.getElementById('help-desc').value;

      // Kan Bağışı ise qan qrupunu başlığa əlavə et
      if (cat === 'Kan Bağışı') {
        const bg = document.getElementById('help-blood-group').value;
        title = `[${bg}] ${title}`;
        desc = `Aranan kan grubu: ${bg}. ${desc}`;
      }

      const res = await apiFetch('/community/help-requests/create/', {
        method: 'POST',
        body: {
          category: cat,
          name: title,
          desc: desc,
          contact_info: document.getElementById('help-contact').value
        }
      });

      if (!res._error) {
        showToast('Talebiniz başarıyla yayınlandı!', 'success');
        e.target.reset();
        setTimeout(() => window.location.reload(), 2000);
      } else {
        showToast('Talep gönderilirken hata oluştu.', 'error');
        btn.disabled = false;
        btn.textContent = 'Talebi Gönder';
      }
    });

  } catch (e) {
    showToast('Bağlantı hatası: Veriler yüklenemedi.', 'error');
    container.innerHTML = `<div class="page text-center"><p class="text-danger">Bilgiler yüklenirken bir hata oluştu. Lütfen tekrar deneyin.</p></div>`;
  }
}
