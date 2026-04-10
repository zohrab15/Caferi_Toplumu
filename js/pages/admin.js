import { apiFetch, isLoggedIn, showToast } from '../api.js';

export async function renderAdminPage() {
  const container = document.getElementById('page-content');
  
  if (!isLoggedIn()) {
    window.location.hash = '#auth';
    return;
  }

  container.innerHTML = `
    <div class="page" style="padding-bottom:100px;">
      <div id="admin-header-nav" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <a href="#profile" style="display:inline-flex; align-items:center; gap:6px; color:var(--color-primary); text-decoration:none; font-size:14px; padding:12px 0;">
          ← Profil
        </a>
        <button id="btn-back-to-menu" class="btn btn--outline btn--sm" style="display:none; font-size:12px; padding:6px 12px;">
          🏠 Ana Menüye Dön
        </button>
      </div>

      <div class="section-header" style="margin-top:0; margin-bottom:20px;">
        <h2 class="section-title" id="admin-title">⚙️ Yönetim Paneli</h2>
      </div>

      <!-- DASHBOARD GRID -->
      <div id="admin-dashboard-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:24px;">
        <div class="card card--dark admin-module-card" data-module="questions" style="padding:20px; text-align:center; cursor:pointer; border:1px solid var(--border-color); transition:all 0.2s;">
          <div style="font-size:32px; margin-bottom:8px;">🙋</div>
          <div style="font-weight:bold; font-size:14px; margin-bottom:4px;">Sorular</div>
          <div style="font-size:11px; color:var(--text-muted);" id="stat-questions-label">Yükleniyor...</div>
        </div>
        
        <div class="card card--dark admin-module-card" data-module="announce" style="padding:20px; text-align:center; cursor:pointer; border:1px solid var(--border-color); transition:all 0.2s;">
          <div style="font-size:32px; margin-bottom:8px;">📢</div>
          <div style="font-weight:bold; font-size:14px; margin-bottom:4px;">Duyuru Ekle</div>
          <div style="font-size:11px; color:var(--text-muted);" id="stat-announce-label">Yükleniyor...</div>
        </div>

        <div class="card card--dark admin-module-card" data-module="tours" style="padding:20px; text-align:center; cursor:pointer; border:1px solid var(--border-color); transition:all 0.2s;">
          <div style="font-size:32px; margin-bottom:8px;">👥</div>
          <div style="font-weight:bold; font-size:14px; margin-bottom:4px;">Tur Kayıtları</div>
          <div style="font-size:11px; color:var(--text-muted);" id="stat-tours-label">Yükleniyor...</div>
        </div>

        <div class="card card--dark admin-module-card" data-module="tourmanage" style="padding:20px; text-align:center; cursor:pointer; border:1px solid var(--border-color); transition:all 0.2s;">
          <div style="font-size:32px; margin-bottom:8px;">🕋</div>
          <div style="font-weight:bold; font-size:14px; margin-bottom:4px;">Tur Yönetimi</div>
          <div style="font-size:11px; color:var(--text-muted);">Turları düzenle</div>
        </div>

        <div class="card card--dark admin-module-card" data-module="campaigns" style="padding:20px; text-align:center; cursor:pointer; border:1px solid var(--border-color); transition:all 0.2s; grid-column: span 2;">
          <div style="font-size:32px; margin-bottom:8px;">💎</div>
          <div style="font-weight:bold; font-size:14px; margin-bottom:4px;">Bağış Kampanyaları</div>
          <div style="font-size:11px; color:var(--text-muted);" id="stat-campaigns-label">Yükleniyor...</div>
        </div>
      </div>

      <!-- MODULE CONTENTS (Initially Hidden) -->
      <div id="admin-content-area" style="display:none;">
        <div id="tab-content-questions"></div>
        <div id="tab-content-announce" style="display:none;"></div>
        <div id="tab-content-tours" style="display:none;"></div>
        <div id="tab-content-tourmanage" style="display:none;"></div>
        <div id="tab-content-campaigns" style="display:none;"></div>
      </div>
    </div>
  `;

  // Navigation Logic
  const grid = document.getElementById('admin-dashboard-grid');
  const contentArea = document.getElementById('admin-content-area');
  const backBtn = document.getElementById('btn-back-to-menu');
  const titleEl = document.getElementById('admin-title');

  const showView = (module) => {
    if (module === 'dashboard') {
      grid.style.display = 'grid';
      contentArea.style.display = 'none';
      backBtn.style.display = 'none';
      titleEl.textContent = '⚙️ Yönetim Paneli';
    } else {
      grid.style.display = 'none';
      contentArea.style.display = 'block';
      backBtn.style.display = 'block';
      
      const titles = {
        'questions': '🙋 Gelen Sorular',
        'announce': '📢 Duyuru Yayınla',
        'tours': '👥 Tur Kayıtları',
        'tourmanage': '🕋 Turları Yönet',
        'campaigns': '💎 Kampayaları Yönet'
      };
      titleEl.textContent = titles[module] || 'Yönetim';

      // Hide all contents, show active one
      ['questions', 'announce', 'tours', 'tourmanage', 'campaigns'].forEach(m => {
        document.getElementById(`tab-content-${m}`).style.display = m === module ? 'block' : 'none';
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  container.querySelectorAll('.admin-module-card').forEach(card => {
    card.addEventListener('click', () => showView(card.dataset.module));
  });

  backBtn.addEventListener('click', () => showView('dashboard'));

  // Load data
  await Promise.all([loadQuestions(), loadAnnounceForm(), loadTourRegistrations(), loadTourManagement(), loadCampaignManagement()]);

  async function loadQuestions() {
    const questions = await apiFetch('/ilim/questions/unanswered/', { requireAuth: true });
    const el = document.getElementById('tab-content-questions');
    const label = document.getElementById('stat-questions-label');
    if (label) label.textContent = questions._error ? 'Hata' : `${questions.length} bekleyen`;

    if (questions._error || questions.length === 0) {
      el.innerHTML = '<div class="card card--dark" style="padding:24px; text-align:center; color:var(--text-muted); font-size:14px;">🎉 Tüm sorular cevaplanmış! Bekleyen soru yok.</div>';
      return;
    }

    el.innerHTML = questions.map(q => `
      <div class="card card--dark" style="padding:16px; margin-bottom:12px;" id="q-card-${q.id}">
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span style="font-size:11px; color:var(--text-muted);">${q.is_anonymous ? 'Anonim' : (q.asked_by || 'Üye')} · ${q.date || ''}</span>
          <span style="font-size:10px; background:var(--bg-secondary); padding:2px 8px; border-radius:8px; color:var(--text-secondary);">ID #${q.id}</span>
        </div>
        <div style="font-size:14px; margin-bottom:12px; line-height:1.5;">${q.text || q.question}</div>
        <textarea class="form-textarea" id="answer-${q.id}" placeholder="Cevabınızı buraya yazın..." rows="2" style="margin-bottom:8px;"></textarea>
        <button class="btn btn--primary btn--sm btn--full answer-btn" data-qid="${q.id}">Cevapla ve Yayınla</button>
      </div>
    `).join('');

    el.querySelectorAll('.answer-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const qid = btn.dataset.qid;
        const answer = document.getElementById(`answer-${qid}`).value;
        if (!answer.trim()) return;

        btn.disabled = true;
        btn.textContent = 'Gönderiliyor...';

        const res = await apiFetch(`/ilim/questions/${qid}/answer/`, {
          method: 'PATCH',
          body: { answer },
          requireAuth: true
        });

        if (!res._error) {
          showToast('Cevabınız başarıyla yayınlandı!', 'success');
          btn.textContent = 'Cevaplandı ✅';
          btn.classList.add('btn--success');
          const card = document.getElementById(`q-card-${qid}`);
          card.style.transition = 'all 0.5s ease';
          card.style.opacity = '0';
          card.style.transform = 'translateY(-10px)';
          setTimeout(() => {
            card.remove();
            // Eğer ekranda başka soru kartı kalmadıysa boş durum menüsünü göster
            const el = document.getElementById('tab-content-questions');
            if (el.querySelectorAll('.card').length === 0) {
              el.innerHTML = '<div class="card card--dark" style="padding:24px; text-align:center; color:var(--text-muted); font-size:14px;">🎉 Tüm sorular cevaplanmış! Bekleyen soru yok.</div>';
            }
          }, 500);

          const label = document.getElementById('stat-questions-label');
          if (label) {
            const current = parseInt(label.textContent) || 0;
            label.textContent = `${Math.max(0, current - 1)} bekleyen`;
          }
        } else {
          showToast('Cevap gönderilirken bir hata oluştu.', 'error');
          btn.disabled = false;
          btn.textContent = 'Cevapla ve Yayınla';
        }
      });
    });
  }

  async function loadAnnounceForm() {
    const el = document.getElementById('tab-content-announce');
    el.innerHTML = `
      <form id="announcement-form" class="card card--dark" style="padding:20px;">
        <div class="form-group">
          <label class="form-label">Kategori</label>
          <select id="ann-category" class="form-select" required>
            <option value="Genel Duyuru">📌 Genel Duyuru</option>
            <option value="Vefat">🕊️ Vefat</option>
            <option value="Etkinlik">🎪 Etkinlik</option>
            <option value="Acil">🚨 Acil</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Başlık</label>
          <input type="text" id="ann-title" class="form-input" placeholder="Duyuru başlığı..." required>
        </div>
        <div class="form-group">
          <label class="form-label">İçerik</label>
          <textarea id="ann-body" class="form-textarea" rows="4" placeholder="Duyuru metni..." required></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Rozet (opsiyonel)</label>
          <input type="text" id="ann-badge" class="form-input" placeholder="Örn: Acil, Yeni, Önemli">
        </div>
        <button type="submit" class="btn btn--primary btn--full" id="ann-submit-btn">📢 Duyuruyu Yayınla</button>
      </form>

      <div class="section-header" style="margin-top:24px;">
        <h3 class="section-title">Mevcut Duyurular</h3>
      </div>
      <div id="ann-list" style="margin-top:8px;">
        <div class="card card--dark" style="padding:20px;text-align:center;color:var(--text-muted);">Yükleniyor...</div>
      </div>
    `;

    // Load existing announcements
    async function renderAnnouncementList() {
      const anns = await apiFetch('/community/announcements/');
      const listEl = document.getElementById('ann-list');

      const statLabel = document.getElementById('stat-announce-label');
      if (statLabel) statLabel.textContent = anns._error ? 'Hata' : `${anns.length} duyuru`;

      listEl.innerHTML = anns.map(a => `
        <div class="card card--dark" style="padding:14px; margin-bottom:10px;" id="ann-card-${a.id}">
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div style="flex:1; min-width:0;">
              <div style="display:flex; align-items:center; gap:6px; margin-bottom:4px;">
                <span style="font-size:10px; background:var(--bg-secondary); padding:2px 8px; border-radius:8px; color:${a.categoryColor};">${a.category}</span>
                ${a.badge ? `<span class="badge badge--accent" style="font-size:9px;">${a.badge}</span>` : ''}
                <span style="font-size:10px; color:var(--text-muted);">${a.date}</span>
              </div>
              <div style="font-weight:600; font-size:14px; margin-bottom:4px;">${a.title}</div>
              <div style="font-size:12px; color:var(--text-secondary); line-height:1.4; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;">${a.body}</div>
            </div>
            <button class="btn btn--danger btn--sm delete-ann-btn" data-id="${a.id}" style="padding:4px 10px; font-size:11px; margin-left:10px; flex-shrink:0;">🗑️ Sil</button>
          </div>
        </div>
      `).join('');

      // Delete buttons
      listEl.querySelectorAll('.delete-ann-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          if (!confirm('Bu duyuruyu kaldırmak istediğinize emin misiniz?')) return;

          const id = btn.dataset.id;
          btn.textContent = '...';
          btn.disabled = true;

          const res = await apiFetch('/community/announcements/' + id + '/delete/', {
            method: 'DELETE',
            requireAuth: true
          });

          if (!res._error) {
            showToast('Duyuru başarıyla kaldırıldı', 'success');
            const card = document.getElementById('ann-card-' + id);
            if (card) {
              card.style.transition = 'opacity 0.3s, transform 0.3s';
              card.style.opacity = '0';
              card.style.transform = 'translateX(20px)';
              setTimeout(() => {
                card.remove();
                // Update count
                const remaining = listEl.querySelectorAll('.card').length;
                document.getElementById('stat-announcements').textContent = remaining;
                if (remaining === 0) {
                  listEl.innerHTML = '<div class="card card--dark" style="padding:20px;text-align:center;color:var(--text-muted);font-size:14px;">Aktif duyuru yok.</div>';
                }
              }, 300);
            }
          } else {
            showToast('Duyuru silinemedi', 'error');
            btn.textContent = '🗑️ Sil';
            btn.disabled = false;
          }
        });
      });
    }

    // New announcement form submit
    document.getElementById('announcement-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('ann-submit-btn');
      btn.disabled = true;
      btn.textContent = 'Yayınlanıyor...';

      const payload = {
        category: document.getElementById('ann-category').value,
        title: document.getElementById('ann-title').value,
        body: document.getElementById('ann-body').value,
        badge: document.getElementById('ann-badge').value || '',
      };

      const res = await apiFetch('/community/announcements/create/', {
        method: 'POST',
        body: payload,
        requireAuth: true
      });

      if (!res._error) {
        showToast('Duyuru başarıyla yayınlandı!', 'success');
        e.target.reset();
        btn.disabled = false;
        btn.textContent = '📢 Duyuruyu Yayınla';
        // Refresh list
        await renderAnnouncementList();
      } else {
        showToast('Duyuru yayınlanırken bir hata oluştu.', 'error');
        btn.disabled = false;
        btn.textContent = '📢 Duyuruyu Yayınla';
      }
    });

    // Initial load
    await renderAnnouncementList();
  }

  async function loadTourRegistrations() {
    const regs = await apiFetch('/ziyaret/registrations/', { requireAuth: true });
    const el = document.getElementById('tab-content-tours');
    const label = document.getElementById('stat-tours-label');
    if (label) label.textContent = regs._error ? 'Hata' : `${regs.length} yeni kayıt`;

    if (regs._error || regs.length === 0) {
      el.innerHTML = '<div class="card card--dark" style="padding:24px; text-align:center; color:var(--text-muted); font-size:14px;">Henüz tur kaydı bulunmuyor.</div>';
      return;
    }

    el.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:10px;">
        ${regs.map(r => `
          <div class="card card--dark" style="padding:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-weight:600; font-size:14px;">${r.full_name}</div>
                <div style="font-size:12px; color:var(--text-muted);">${r.phone} · ${r.passport_no || 'Pasaport yok'}</div>
              </div>
              <span class="badge badge--primary" style="font-size:10px;">${r.status || 'Beklemede'}</span>
            </div>
            ${r.note ? `<div style="font-size:12px; color:var(--text-secondary); margin-top:6px; font-style:italic;">"${r.note}"</div>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  async function loadTourManagement() {
    const el = document.getElementById('tab-content-tourmanage');
    
    const formHTML = `
      <form id="tour-manage-form" class="card card--dark" style="padding:20px; margin-bottom:20px;">
        <h3 id="tm-form-title" style="margin-top:0; margin-bottom:16px;">Yeni Tur Ekle</h3>
        <input type="hidden" id="tm-id" value="">
        <div class="form-group">
          <label class="form-label">Tur Adı</label>
          <input type="text" id="tm-title" class="form-input" required>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div class="form-group">
            <label class="form-label">Başlangıç Tarihi</label>
            <input type="date" id="tm-start" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">Bitiş Tarihi</label>
            <input type="date" id="tm-end" class="form-input" required>
          </div>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div class="form-group">
            <label class="form-label">Süre</label>
            <input type="text" id="tm-duration" class="form-input" placeholder="Örn: 7 gün" required>
          </div>
          <div class="form-group">
            <label class="form-label">Fiyat</label>
            <input type="text" id="tm-price" class="form-input" placeholder="Örn: 850 $" required>
          </div>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px;">
          <div class="form-group">
            <label class="form-label">Kontenjan</label>
            <input type="number" id="tm-seats" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">Durum</label>
            <input type="text" id="tm-status" class="form-input" placeholder="Örn: Kayıt Açık" required>
          </div>
          <div class="form-group">
            <label class="form-label">Renk</label>
            <select id="tm-color" class="form-select">
              <option value="badge--primary">Yeşil</option>
              <option value="badge--accent">Altın</option>
              <option value="badge--danger">Kırmızı</option>
            </select>
          </div>
          </div>
        </div>
        <div style="display:flex; gap:10px;">
          <button type="submit" class="btn btn--primary btn--full" id="tm-submit-btn" style="flex:2;">Turu Ekle</button>
          <button type="button" class="btn btn--danger" id="tm-cancel-btn" style="display:none; flex:1;">İptal</button>
        </div>
      </form>
      <div id="tm-list"></div>
    `;
    el.innerHTML = formHTML;

    const renderTourList = async () => {
      const tours = await apiFetch('/ziyaret/admin/tours/', { requireAuth: true });
      const listEl = document.getElementById('tm-list');
      if (tours._error || tours.length === 0) {
        listEl.innerHTML = '<div style="text-align:center; color:var(--text-muted); font-size:14px;">Mevcut tur bulunamadı.</div>';
        return;
      }
      
      listEl.innerHTML = tours.map(t => `
        <div class="card card--dark" style="padding:14px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-weight:bold; font-size:14px;">${t.title}</div>
            <div style="font-size:12px; color:var(--text-muted);">${t.date_start} - ${t.date_end} · ${t.price}</div>
          </div>
          <div style="display:flex; gap:6px;">
            <button class="btn btn--primary btn--sm edit-tour-btn" data-tour='${JSON.stringify(t).replace(/'/g, "&apos;")}' style="padding:4px 8px; font-size:11px;">Düzenle</button>
            <button class="btn btn--danger btn--sm delete-tour-btn" data-id="${t.id}" style="padding:4px 8px; font-size:11px;">Sil</button>
          </div>
        </div>
      `).join('');

      listEl.querySelectorAll('.delete-tour-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          if (!confirm('Bu turu silmek istediğinize emin misiniz?')) return;
          const id = btn.dataset.id;
          btn.textContent = '...';
          btn.disabled = true;
          const res = await apiFetch('/ziyaret/admin/tours/' + id + '/', { method: 'DELETE', requireAuth: true });
          if (!res._error) {
            showToast('Tur başarıyla silindi', 'success');
            renderTourList();
          } else {
            showToast('Tur silinemedi', 'error');
            btn.textContent = 'Sil';
            btn.disabled = false;
          }
        });
      });

      listEl.querySelectorAll('.edit-tour-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const t = JSON.parse(btn.dataset.tour);
          document.getElementById('tm-id').value = t.id;
          document.getElementById('tm-title').value = t.title;
          document.getElementById('tm-start').value = t.date_start;
          document.getElementById('tm-end').value = t.date_end;
          document.getElementById('tm-duration').value = t.duration;
          document.getElementById('tm-price').value = t.price;
          document.getElementById('tm-seats').value = t.total_seats;
          document.getElementById('tm-status').value = t.status;
          document.getElementById('tm-color').value = t.status_color;
          
          document.getElementById('tm-form-title').textContent = 'Turu Düzenle';
          document.getElementById('tm-submit-btn').textContent = 'Güncelle';
          document.getElementById('tm-cancel-btn').style.display = 'block';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });
    };

    document.getElementById('tm-cancel-btn').addEventListener('click', () => {
      document.getElementById('tour-manage-form').reset();
      document.getElementById('tm-id').value = '';
      document.getElementById('tm-form-title').textContent = 'Yeni Tur Ekle';
      document.getElementById('tm-submit-btn').textContent = 'Turu Ekle';
      document.getElementById('tm-cancel-btn').style.display = 'none';
    });

    document.getElementById('tour-manage-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('tm-submit-btn');
      btn.disabled = true;

      const tid = document.getElementById('tm-id').value;
      const method = tid ? 'PATCH' : 'POST';
      const endpoint = tid ? '/ziyaret/admin/tours/' + tid + '/' : '/ziyaret/admin/tours/';
      
      btn.textContent = tid ? 'Güncelleniyor...' : 'Ekleniyor...';

      const payload = {
        title: document.getElementById('tm-title').value,
        date_start: document.getElementById('tm-start').value,
        date_end: document.getElementById('tm-end').value,
        duration: document.getElementById('tm-duration').value,
        price: document.getElementById('tm-price').value,
        total_seats: parseInt(document.getElementById('tm-seats').value),
        status: document.getElementById('tm-status').value,
        status_color: document.getElementById('tm-color').value,
        is_active: true
      };

      const res = await apiFetch(endpoint, {
        method: method,
        body: payload,
        requireAuth: true
      });

      if (!res._error) {
        showToast(tid ? 'Tur başarıyla güncellendi!' : 'Tur başarıyla eklendi!', 'success');
        e.target.reset();
        document.getElementById('tm-cancel-btn').click();
        await renderTourList();
      } else {
        showToast(tid ? 'Tur güncellenirken hata oluştu' : 'Tur eklenirken hata oluştu', 'error');
      }
      btn.disabled = false;
      btn.textContent = tid ? 'Güncelle' : 'Turu Ekle';
    });

    await renderTourList();
  }

  async function loadCampaignManagement() {
    const el = document.getElementById('tab-content-campaigns');
    
    el.innerHTML = `
      <form id="campaign-manage-form" class="card card--dark" style="padding:20px; margin-bottom:20px;">
        <h3 id="cm-form-title" style="margin-top:0; margin-bottom:16px;">Yeni Kampanya Ekle</h3>
        <input type="hidden" id="cm-id" value="">
        <div class="form-group">
          <label class="form-label">Kampanya Başlığı</label>
          <input type="text" id="cm-title" class="form-input" required>
        </div>
        <div class="form-group">
          <label class="form-label">Açıklama</label>
          <textarea id="cm-desc" class="form-textarea" rows="3" required></textarea>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div class="form-group">
            <label class="form-label">Hedef Miktar (₺)</label>
            <input type="number" id="cm-target" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">Toplanan Miktar (₺)</label>
            <input type="number" id="cm-collected" class="form-input" value="0" required>
          </div>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div class="form-group">
            <label class="form-label">İkon (Emoji)</label>
            <input type="text" id="cm-icon" class="form-input" placeholder="Örn: 🕌" required>
          </div>
          <div class="form-group">
            <label class="form-label">Durum</label>
            <select id="cm-active" class="form-select">
              <option value="true">Aktif</option>
              <option value="false">Taslak / Kapalı</option>
            </select>
          </div>
        </div>
        <div style="display:flex; gap:10px;">
          <button type="submit" class="btn btn--primary btn--full" id="cm-submit-btn" style="flex:2;">Kampanyayı Ekle</button>
          <button type="button" class="btn btn--danger" id="cm-cancel-btn" style="display:none; flex:1;">İptal</button>
        </div>
      </form>
      <div id="cm-list"></div>
    `;

    const renderCampaignList = async () => {
      const campaigns = await apiFetch('/bagis/admin/campaigns/', { requireAuth: true });
      const listEl = document.getElementById('cm-list');
      const statLabel = document.getElementById('stat-campaigns-label');
      
      if (campaigns._error) {
        listEl.innerHTML = '<div style="text-align:center; color:var(--text-danger); font-size:14px;">Kampanyalar yüklenirken hata oluştu.</div>';
        if (statLabel) statLabel.textContent = 'Hata';
        return;
      }
      
      const activeCount = campaigns.filter(c => c.is_active).length;
      if (statLabel) statLabel.textContent = `${activeCount} aktif kampanya`;

      if (campaigns.length === 0) {
        listEl.innerHTML = '<div style="text-align:center; color:var(--text-muted); font-size:14px;">Henüz kampanya bulunmuyor.</div>';
        return;
      }
      
      listEl.innerHTML = campaigns.map(c => `
        <div class="card card--dark" style="padding:14px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
          <div style="flex:1;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:18px;">${c.icon}</span>
              <div style="font-weight:bold; font-size:14px;">${c.title}</div>
            </div>
            <div style="font-size:12px; color:var(--text-muted); margin-top:4px;">
              ${parseFloat(c.collected_amount).toLocaleString('tr-TR')} / ${parseFloat(c.target_amount).toLocaleString('tr-TR')} ₺
              <span style="margin-left:8px; color:${c.is_active ? 'var(--color-primary)' : 'var(--text-danger)'}; font-size:10px;">
                ● ${c.is_active ? 'Aktif' : 'Kapalı'}
              </span>
            </div>
          </div>
          <div style="display:flex; gap:6px;">
            <button class="btn btn--primary btn--sm edit-campaign-btn" data-campaign='${JSON.stringify(c).replace(/'/g, "&apos;")}' style="padding:4px 8px; font-size:11px;">Düzenle</button>
            <button class="btn btn--danger btn--sm delete-campaign-btn" data-id="${c.id}" style="padding:4px 8px; font-size:11px;">Sil</button>
          </div>
        </div>
      `).join('');

      listEl.querySelectorAll('.delete-campaign-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          if (!confirm('Bu kampanyayı silmek istediğinize emin misiniz?')) return;
          const id = btn.dataset.id;
          btn.textContent = '...';
          btn.disabled = true;
          const res = await apiFetch('/bagis/admin/campaigns/' + id + '/', { method: 'DELETE', requireAuth: true });
          if (!res._error) {
            showToast('Kampanya silindi', 'success');
            renderCampaignList();
          } else {
            showToast('Kampanya silinemedi', 'error');
            btn.textContent = 'Sil';
            btn.disabled = false;
          }
        });
      });

      listEl.querySelectorAll('.edit-campaign-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const c = JSON.parse(btn.dataset.campaign);
          document.getElementById('cm-id').value = c.id;
          document.getElementById('cm-title').value = c.title;
          document.getElementById('cm-desc').value = c.description;
          document.getElementById('cm-target').value = parseInt(c.target_amount);
          document.getElementById('cm-collected').value = parseInt(c.collected_amount);
          document.getElementById('cm-icon').value = c.icon;
          document.getElementById('cm-active').value = c.is_active.toString();
          
          document.getElementById('cm-form-title').textContent = 'Kampanyayı Düzenle';
          document.getElementById('cm-submit-btn').textContent = 'Güncelle';
          document.getElementById('cm-cancel-btn').style.display = 'block';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });
    };

    document.getElementById('cm-cancel-btn').addEventListener('click', () => {
      document.getElementById('campaign-manage-form').reset();
      document.getElementById('cm-id').value = '';
      document.getElementById('cm-form-title').textContent = 'Yeni Kampanya Ekle';
      document.getElementById('cm-submit-btn').textContent = 'Kampanyayı Ekle';
      document.getElementById('cm-cancel-btn').style.display = 'none';
    });

    document.getElementById('campaign-manage-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('cm-submit-btn');
      btn.disabled = true;

      const cid = document.getElementById('cm-id').value;
      const method = cid ? 'PATCH' : 'POST';
      const endpoint = cid ? '/bagis/admin/campaigns/' + cid + '/' : '/bagis/admin/campaigns/';
      
      btn.textContent = cid ? 'Güncelleniyor...' : 'Ekleniyor...';

      const payload = {
        title: document.getElementById('cm-title').value,
        description: document.getElementById('cm-desc').value,
        target_amount: parseFloat(document.getElementById('cm-target').value),
        collected_amount: parseFloat(document.getElementById('cm-collected').value),
        icon: document.getElementById('cm-icon').value,
        is_active: document.getElementById('cm-active').value === 'true'
      };

      const res = await apiFetch(endpoint, {
        method: method,
        body: payload,
        requireAuth: true
      });

      if (!res._error) {
        showToast(cid ? 'Kampanya güncellendi!' : 'Kampanya eklendi!', 'success');
        e.target.reset();
        document.getElementById('cm-cancel-btn').click();
        await renderCampaignList();
      } else {
        showToast(cid ? 'Kampanya güncellenirken hata' : 'Kampanya eklenirken hata', 'error');
      }
      btn.disabled = false;
      btn.textContent = cid ? 'Güncelle' : 'Kampanyayı Ekle';
    });

    await renderCampaignList();
  }

  // Initial load calls
  const annsResult = await apiFetch('/community/announcements/');
  const statAnn = document.getElementById('stat-announce-label');
  if (statAnn) statAnn.textContent = annsResult._error ? 'Hata' : `${annsResult.length} duyuru`;
}
