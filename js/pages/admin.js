import { apiFetch, isLoggedIn, showToast } from '../api.js';

export async function renderAdminPage() {
  const container = document.getElementById('page-content');
  
  if (!isLoggedIn()) {
    window.location.hash = '#auth';
    return;
  }

  container.innerHTML = `
    <div class="page" style="padding-bottom:100px;">
      <a href="#profile" style="display:inline-flex; align-items:center; gap:6px; color:var(--color-primary); text-decoration:none; font-size:14px; padding:12px 0;">
        ← Profil
      </a>
      <div class="section-header" style="margin-top:8px;">
        <h2 class="section-title">⚙️ Yönetim Paneli</h2>
      </div>

      <!-- Stats -->
      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; margin-bottom:24px;">
        <div class="card card--accent" style="padding:14px; text-align:center;">
          <div style="font-size:22px; font-weight:bold;" id="stat-questions">…</div>
          <div style="font-size:11px; color:var(--text-secondary);">Bekleyen Soru</div>
        </div>
        <div class="card card--accent" style="padding:14px; text-align:center;">
          <div style="font-size:22px; font-weight:bold;" id="stat-tours">…</div>
          <div style="font-size:11px; color:var(--text-secondary);">Tur Kaydı</div>
        </div>
        <div class="card card--accent" style="padding:14px; text-align:center;">
          <div style="font-size:22px; font-weight:bold;" id="stat-announcements">…</div>
          <div style="font-size:11px; color:var(--text-secondary);">Duyuru</div>
        </div>
      </div>

      <!-- Tabs -->
      <div style="display:flex; border-bottom:1px solid var(--border-color); margin-bottom:20px; overflow-x:auto;">
        <button class="admin-tab admin-tab--active" data-tab="questions" style="flex:1; padding:10px; background:none; border:none; color:var(--text-primary); font-weight:bold; border-bottom:2px solid var(--color-primary); cursor:pointer; font-size:13px; white-space:nowrap;">🙋 Sorular</button>
        <button class="admin-tab" data-tab="announce" style="flex:1; padding:10px; background:none; border:none; color:var(--text-muted); cursor:pointer; font-size:13px; white-space:nowrap;">📢 Duyuru Ekle</button>
        <button class="admin-tab" data-tab="tours" style="flex:1; padding:10px; background:none; border:none; color:var(--text-muted); cursor:pointer; font-size:13px; white-space:nowrap;">👥 Tur Kayıt</button>
        <button class="admin-tab" data-tab="tourmanage" style="flex:1; padding:10px; background:none; border:none; color:var(--text-muted); cursor:pointer; font-size:13px; white-space:nowrap;">🕋 Tur Yönetimi</button>
      </div>

      <!-- Tab Content -->
      <div id="tab-content-questions"></div>
      <div id="tab-content-announce" style="display:none;"></div>
      <div id="tab-content-tours" style="display:none;"></div>
      <div id="tab-content-tourmanage" style="display:none;"></div>
    </div>
  `;

  // Tab switching
  container.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      container.querySelectorAll('.admin-tab').forEach(t => {
        t.classList.remove('admin-tab--active');
        t.style.color = 'var(--text-muted)';
        t.style.fontWeight = 'normal';
        t.style.borderBottom = 'none';
      });
      tab.classList.add('admin-tab--active');
      tab.style.color = 'var(--text-primary)';
      tab.style.fontWeight = 'bold';
      tab.style.borderBottom = '2px solid var(--color-primary)';

      document.getElementById('tab-content-questions').style.display = tab.dataset.tab === 'questions' ? 'block' : 'none';
      document.getElementById('tab-content-announce').style.display = tab.dataset.tab === 'announce' ? 'block' : 'none';
      document.getElementById('tab-content-tours').style.display = tab.dataset.tab === 'tours' ? 'block' : 'none';
      document.getElementById('tab-content-tourmanage').style.display = tab.dataset.tab === 'tourmanage' ? 'block' : 'none';
    });
  });

  // Load data
  await Promise.all([loadQuestions(), loadAnnounceForm(), loadTourRegistrations(), loadTourManagement()]);

  async function loadQuestions() {
    const questions = await apiFetch('/ilim/questions/unanswered/', { requireAuth: true });
    const el = document.getElementById('tab-content-questions');
    document.getElementById('stat-questions').textContent = questions._error ? '?' : questions.length;

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
          const card = document.getElementById(`q-card-${qid}`);
          card.style.opacity = '0.5';
          card.style.pointerEvents = 'none';
          const stat = document.getElementById('stat-questions');
          stat.textContent = Math.max(0, parseInt(stat.textContent) - 1);
        } else {
          showToast('Cevap gönderilirken bir hata oluştu.', 'error');
          btn.disabled = false;
          btn.textContent = 'Cevapla ve Yayınla';
        }
      });
    });
  }

  function loadAnnounceForm() {
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
    `;

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
        const stat = document.getElementById('stat-announcements');
        stat.textContent = parseInt(stat.textContent || 0) + 1;
        btn.disabled = false;
        btn.textContent = '📢 Duyuruyu Yayınla';
      } else {
        showToast('Duyuru yayınlanırken bir hata oluştu.', 'error');
        btn.disabled = false;
        btn.textContent = '📢 Duyuruyu Yayınla';
      }
    });
  }

  async function loadTourRegistrations() {
    const regs = await apiFetch('/ziyaret/registrations/', { requireAuth: true });
    const el = document.getElementById('tab-content-tours');
    document.getElementById('stat-tours').textContent = regs._error ? '?' : regs.length;

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

  // Load announcement count
  const anns = await apiFetch('/community/announcements/');
  document.getElementById('stat-announcements').textContent = anns._error ? '?' : anns.length;
}
