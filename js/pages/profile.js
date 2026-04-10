import { apiFetch, logout, showToast } from '../api.js';
import { initWebPush } from '../app.js';

export async function renderProfilePage() {
  const container = document.getElementById('page-content');
  
  container.innerHTML = `
    <div class="page text-center" style="padding:40px;">
      <div class="skeleton" style="width:100px; height:100px; border-radius:50%; margin: 0 auto 20px auto;"></div>
      <div class="skeleton" style="width:200px; height:20px; border-radius:8px; margin: 0 auto 20px auto;"></div>
      <div class="skeleton" style="width:100%; height:150px; border-radius:12px; margin-bottom:10px;"></div>
    </div>
  `;

  try {
    const profile = await apiFetch('/auth/profile/', { requireAuth: true });
    
    if (profile._error) {
      window.location.hash = '#auth';
      return;
    }

    container.innerHTML = `
      <div class="page" style="padding-bottom:100px;">
        <a href="#prayer" style="display:inline-flex; align-items:center; gap:6px; color:var(--color-primary); text-decoration:none; font-size:14px; padding:12px 0;">
          ← Ana Sayfa
        </a>
        <div style="text-align:center; padding:12px 0;">
          <div style="width:80px; height:80px; background:var(--color-primary); color:#000; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:32px; font-weight:bold; margin:0 auto 12px auto;">
            ${profile.first_name[0] || ''}${profile.last_name[0] || ''}
          </div>
          <h2 style="font-size:20px; margin-bottom:4px;">${profile.first_name} ${profile.last_name}</h2>
          <p style="color:var(--text-muted); font-size:14px; margin-bottom:8px;">${profile.email}</p>
          <div style="display:flex; justify-content:center; gap:8px;">
            <span class="badge ${profile.role === 'admin' || profile.role === 'imam' ? 'badge--accent' : 'badge--primary'}">
              ${profile.role === 'admin' ? 'HADİM' : (profile.role === 'member' ? 'ÜYE' : 'İMAM')}
            </span>
            ${profile.blood_group ? `<span class="badge badge--danger">🩸 ${profile.blood_group}</span>` : ''}
          </div>
          
          ${(profile.role === 'admin' || profile.role === 'imam') ? `
            <button onclick="window.location.hash='#admin'" class="btn btn--accent btn--sm" style="margin-top:16px; padding:8px 16px;">
              ⚙️ Yönetim Paneli
            </button>
          ` : ''}

          <!-- Notification Permission Button -->
          <div id="push-perm-container" style="margin-top:16px; display:none;">
            <button id="btn-enable-push" class="btn btn--outline btn--sm" style="padding:6px 14px; font-size:12px; color:var(--color-primary); border-color:var(--color-primary);">
              🔔 Bildirimleri Aç
            </button>
            <div style="font-size:10px; color:var(--text-muted); margin-top:4px;">Sorularınıza cevap geldiğinde anında haberiniz olsun</div>
          </div>
        </div>

        <!-- History Dashboard -->
        <div class="section-header mt-lg" style="margin-top:20px;">
          <h3 class="section-title">Geçmiş İşlemler</h3>
        </div>

        <div style="display:flex; flex-direction:column; gap:16px;">
          <!-- Donations History -->
          <div class="card card--dark" style="padding:16px;">
            <h4 style="font-size:16px; margin-bottom:12px; display:flex; align-items:center; gap:8px;">💳 Bağış Geçmişi</h4>
            ${profile.donations && profile.donations.length > 0 ? profile.donations.map(d => `
              <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-color);">
                <div>
                  <div style="font-weight:500;">${d.amount} ₺</div>
                  <div style="font-size:11px; color:var(--text-muted);">${d.type}</div>
                </div>
                <div style="font-size:12px; color:var(--text-secondary);">${d.date}</div>
              </div>
            `).join('') : '<p style="font-size:13px; color:var(--text-muted);">Henüz bağış kaydınız bulunmuyor.</p>'}
          </div>

          <!-- Tours History -->
          <div class="card card--dark" style="padding:16px;">
            <h4 style="font-size:16px; margin-bottom:12px; display:flex; align-items:center; gap:8px;">🕋 Tur Kayıtlarım</h4>
            ${profile.tours && profile.tours.length > 0 ? profile.tours.map(t => `
              <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-color);">
                <div style="max-width:70%;">
                  <div style="font-weight:500; font-size:14px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${t.tour_name}</div>
                  <div style="font-size:11px; color:var(--text-muted);">${t.date}</div>
                </div>
                <div><span class="badge badge--primary" style="font-size:10px">${t.status}</span></div>
              </div>
            `).join('') : '<p style="font-size:13px; color:var(--text-muted);">Henüz bir tura kayıt olmadınız.</p>'}
          </div>

          <!-- QA History -->
          <div class="card card--dark" style="padding:16px;">
            <h4 style="font-size:16px; margin-bottom:12px; display:flex; align-items:center; gap:8px;">🙋 Soru ve İstiftalarım</h4>
            ${profile.questions && profile.questions.length > 0 ? profile.questions.map((q, idx) => `
              <div class="profile-qa-item" style="border-bottom:1px solid var(--border-color); padding:10px 0;">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; cursor:pointer;" onclick="const d = document.getElementById('q-detail-${idx}'); d.style.display = d.style.display === 'none' ? 'block' : 'none';">
                  <div style="flex:1; padding-right:10px;">
                    <div style="font-size:14px; margin-bottom:4px; ${q.answer ? 'font-weight:500;' : ''}">${(q.question || '').length > 60 ? (q.question || '').substring(0, 60) + '...' : (q.question || '')}</div>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <span style="font-size:11px; color:var(--text-muted);">${q.date || ''}</span>
                        ${q.is_private ? '<span style="font-size:10px; background:rgba(255,193,7,0.1); color:#ffc107; padding:1px 6px; border-radius:4px;">🔒 Özel</span>' : ''}
                    </div>
                  </div>
                  <div style="font-size:14px;">${q.answer ? '✅' : '⏳'}</div>
                </div>
                <div id="q-detail-${idx}" style="display:none; margin-top:12px; padding:12px; background:var(--bg-body); border-radius:8px; font-size:14px;">
                  <div style="margin-bottom:12px;"><strong>Soru:</strong><br/>${q.question || ''}</div>
                  ${q.answer ? `
                    <div style="color:var(--color-primary); border-top:1px solid var(--border-color); padding-top:12px;">
                      <strong>Hoca Cevabı:</strong><br/>
                      ${q.answer}
                    </div>
                  ` : '<div style="color:var(--text-muted); font-style:italic;">Hocamız henüz cevaplamamış.</div>'}
                </div>
              </div>
            `).join('') : '<p style="font-size:13px; color:var(--text-muted);">Sorduğunuz soru bulunmuyor.</p>'}
          </div>

        </div>

        <button id="logout-btn" class="btn btn--outline btn--full" style="margin-top:32px; color:var(--color-danger); border-color:var(--color-danger);">
          Çıkış Yap
        </button>
      </div>
    `;

    document.getElementById('logout-btn').addEventListener('click', () => {
      logout();
      showToast('Güle güle! Tekrar görüşmek üzere.', 'info');
      window.location.hash = '#auth';
    });

    // Check notification status and show button if needed
    if ('Notification' in window) {
      const pc = document.getElementById('push-perm-container');
      const btn = document.getElementById('btn-enable-push');
      
      if (pc && btn) {
        if (Notification.permission === 'granted') {
           pc.style.display = 'block';
           btn.innerHTML = '🔄 Bildirim Bağlantısını Yenile';
        } else if (Notification.permission !== 'denied') {
           pc.style.display = 'block';
        }
      }
      
      btn?.addEventListener('click', () => {
        initWebPush(true);
      });
    }

    // Hide button if subscribed event fires
    window.addEventListener('pushSubscribed', () => {
      const btn = document.getElementById('btn-enable-push');
      if (btn) btn.innerHTML = '✅ Bağlandı';
      showToast('Bildirimler cihazınıza bağlandı!', 'success');
    });


  } catch (e) {
    container.innerHTML = `<div class="page text-center"><p class="text-danger">Bağlantı hatası: Profil yüklenemedi.</p>
    <button class="btn btn--outline mt-md" onclick="window.location.hash='#auth'">Giriş Sayfasına Dön</button></div>`;
  }
}
