// Religious Content Page — Dini İçerik & Eğitim (İlim Portalı)
import { apiFetch, isLoggedIn, showToast } from '../api.js';

const books = [
  { icon: '📖', title: 'Mefatihul-Cinan', author: 'Şeyh Abbas Kummi', lang: 'TR / AZ', desc: 'En kapsamlı dua ve ziyaretname mecmuası. Muharrem\'den Zilhicce\'ye kadar tüm ay ve gün dualarını içerir.', link: 'https://www.caferilik.com/kutuphane/mefatihul-cinan/' },
  { icon: '📕', title: 'Nehcü\'l Belağa', author: 'Hz. Ali (a.s)', lang: 'TR', desc: 'Hz. Ali\'nin hutbeleri, mektupları ve hikmetli sözlerinden oluşan eşsiz eser.', link: 'https://www.caferilik.com/pdf/Nehcul-Belaga-www.caferilik.com.pdf' },
  { icon: '📗', title: 'Sahife-i Seccadiye', author: 'İmam Zeyn\'el-Abidin (a.s)', lang: 'TR / AZ', desc: '4. İmam\'ın 54 münacaatını içeren, "Âl-i Muhammed\'in Zeburu" olarak bilinen dua kitabı.', link: 'https://www.caferilik.com/pdf/Sahife-i%20Seccadiye-www.caferilik.com.pdf' },
  { icon: '📘', title: 'Usul-u Kâfi', author: 'Şeyh Kuleyni', lang: 'TR', desc: 'Şia hadis külliyatının en önemli dört kitabından biri. İman, akıl, ilim ve tevhid bölümleri.', link: 'https://www.caferilik.com/pdf/Usul_u_kafi_caferilik_com.pdf' },
  { icon: '📙', title: 'Risale-i Ameliye', author: 'Büyük Merciler', lang: 'TR / AZ', desc: 'Günlük ibadet ve fıkhi meselelerde mükellefin amelî hükümleri.', link: 'https://www.sistani.org/turkish/' },
  { icon: '⚖️', title: 'El-Müracaat', author: 'S. A. Şerefuddin el-Musevi', lang: 'TR', desc: 'Doğruyu Arayanların Rehberi: Şia ve Sünni alimleri arasındaki ilmi ve tarihi mektuplaşmaları içeren başyapıt.', link: 'https://www.al-islam.org/printpdf/book/export/html/41984' },
];

let expandedBook = null;

export async function renderIlimPage() {
  const container = document.getElementById('page-content');
  
  container.innerHTML = `
    <div class="page" style="text-align:center;padding:40px;">
      <div class="skeleton" style="width:100%;height:300px;border-radius:24px;margin-bottom:20px;"></div>
    </div>
  `;

  try {
    let [todayHadith, recentQA] = await Promise.all([
      apiFetch('/ilim/hadith/today/'),
      apiFetch('/ilim/questions/')
    ]);

    // Backend henüz güncellenmediyse veya boşsa frontend tarafında varsayılan bir hadis göster
    if (todayHadith._error) {
      todayHadith = {
        text: "İlim talep etmek her Müslüman'a farzdır.",
        source: "Hz. Muhammed (s.a.a)",
        reference: "Usul-u Kâfi, c.1, s.30"
      };
    }
    
    if (recentQA._error) {
      recentQA = [];
    }

    container.innerHTML = `
      <div class="page">
        <!-- Hadith of the Day -->
        <div class="hadith-card">
          <div class="hadith-card__label">📿 Günün Hadisi</div>
          <div class="hadith-card__ornament-left">❁</div>
          <div class="hadith-card__ornament-right">❁</div>
          <p class="hadith-card__text">${todayHadith.text}</p>
          <div class="hadith-card__source">— ${todayHadith.source}</div>
          <p class="hadith-card__ref">${todayHadith.reference}</p>
          <button class="hadith-card__share" id="hadith-share-btn" title="Hadisi paylaş">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
              <polyline points="16 6 12 2 8 6"/>
              <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
            Paylaş
          </button>
        </div>

        <!-- Ask the Imam -->
        <div class="ask-section">
          <div class="ask-header">
            <div class="ask-header__icon">🙋</div>
            <div>
              <h2 class="ask-header__title">Hocaya Soru (İstifta)</h2>
              <p class="ask-header__desc">Dini sorularınızı hocamıza iletin</p>
            </div>
          </div>
          
          ${isLoggedIn() ? `
          <form id="ask-form" class="mb-lg">
            <div class="form-group">
              <label class="form-label">Sorunuz</label>
              <textarea class="form-textarea" id="question-input" placeholder="Dini sorunuzu buraya yazın..." rows="3" required></textarea>
            </div>
            <div class="form-group" style="display:flex;align-items:center;gap:12px">
              <label style="display:flex;align-items:center;gap:6px;font-size:14px;color:var(--text-secondary);cursor:pointer">
                <input type="checkbox" id="anonymous-check" style="accent-color:var(--color-primary)" />
                Anonim gönder
              </label>
            </div>
            <button type="submit" class="btn btn--primary btn--full" id="ask-submit-btn">
              Soruyu Gönder
            </button>
          </form>
          ` : `
          <div class="card card--dark" style="padding:24px; text-align:center; margin-bottom:24px;">
            <p style="margin-bottom:16px; color:var(--text-secondary);">Hocaya soru sormak için giriş yapmanız gerekmektedir.</p>
            <button class="btn btn--outline btn--full" onclick="window.location.hash='auth'">🔑 Giriş Yaparak Soru Sorun</button>
          </div>
          `}

          <!-- Recent Q&A -->
          <div class="section-header">
            <h2 class="section-title">Son Cevaplanan Sorular</h2>
            <span class="badge badge--accent">${recentQA.length || 0} soru</span>
          </div>
          <div class="qa-list" id="qa-list">
            ${recentQA.length > 0 ? recentQA.map((qa, idx) => `
              <div class="qa-item qa-item--collapsed ${idx >= 3 ? 'qa-item--hidden' : ''}" data-qa-idx="${idx}" id="qa-item-${idx}">
                <div class="qa-item__question qa-toggle" data-qa-target="${idx}">
                  <span class="qa-item__q-icon">S</span>
                  <span style="flex:1">${qa.question}</span>
                  <span class="qa-item__chevron">›</span>
                </div>
                <div class="qa-item__answer-wrap" id="qa-answer-${idx}" style="display:none">
                  <div class="qa-item__answer">
                    <span class="qa-item__a-icon">C</span>
                    ${qa.answer}
                  </div>
                  <div class="qa-item__meta">
                    <span class="qa-item__date">${qa.date}</span>
                  </div>
                </div>
              </div>
            `).join('') : '<p class="text-muted" style="font-size:13px;text-align:center;">Henüz cevaplanmış soru bulunmuyor.</p>'}
          </div>
          ${recentQA.length > 3 ? `
          <button class="btn btn--outline btn--full" id="qa-show-more" style="margin-top:12px;border-color:var(--color-primary);color:var(--color-primary);font-size:13px;">
            ▼ Daha Fazla Göster (${recentQA.length - 3} soru daha)
          </button>` : ''}
        </div>

        <!-- Digital Library -->
        <div class="section-header">
          <h2 class="section-title">📚 Dijital Kütüphane</h2>
          <span class="badge badge--primary">${books.length} eser</span>
        </div>
        <div class="library-list">
          ${books.map((b, idx) => `
            <div class="library-item" data-book-idx="${idx}" id="book-${idx}">
              <div class="library-item__icon">${b.icon}</div>
              <div class="library-item__info">
                <div class="library-item__title">${b.title}</div>
                <div class="library-item__author">${b.author} · ${b.lang}</div>
              </div>
              <span class="library-item__arrow">›</span>
            </div>
            <div class="library-detail" id="book-detail-${idx}" style="display:none">
              <p class="library-detail__desc">${b.desc}</p>
              <div class="library-detail__actions">
                <a href="${b.link}" target="_blank" class="btn btn--outline btn--sm" style="text-decoration:none;display:inline-flex;align-items:center;gap:6px">
                  📖 İnternetten Oku / İndir
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Ask Form submission (POST to Django API)
    document.getElementById('ask-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = document.getElementById('question-input');
      const isAnon = document.getElementById('anonymous-check').checked;
      
      if (!input.value.trim()) return;
      
      const btn = document.getElementById('ask-submit-btn');
      btn.disabled = true;
      btn.textContent = 'Gönderiliyor...';

      const res = await apiFetch('/ilim/questions/', {
        method: 'POST',
        body: { text: input.value, is_anonymous: isAnon },
        requireAuth: !isAnon // Token varsa yolla
      });

      if (!res._error) {
        showToast('Sorunuz başarıyla iletildi!', 'success');
        input.value = '';
        btn.disabled = false;
        btn.textContent = 'Soruyu Gönder';
      } else {
        showToast('Soru gönderilirken bir hata oluştu.', 'error');
        btn.disabled = false;
        btn.textContent = 'Soruyu Gönder';
      }
    });

    // Q&A Accordion: click question to toggle answer
    container.querySelectorAll('.qa-toggle').forEach(toggle => {
      toggle.addEventListener('click', () => {
        const idx = toggle.dataset.qaTarget;
        const answerWrap = document.getElementById(`qa-answer-${idx}`);
        const item = document.getElementById(`qa-item-${idx}`);
        const chevron = toggle.querySelector('.qa-item__chevron');

        if (answerWrap.style.display === 'none') {
          answerWrap.style.display = 'block';
          item.classList.remove('qa-item--collapsed');
          item.classList.add('qa-item--expanded');
          if (chevron) chevron.textContent = '⌄';
        } else {
          answerWrap.style.display = 'none';
          item.classList.add('qa-item--collapsed');
          item.classList.remove('qa-item--expanded');
          if (chevron) chevron.textContent = '›';
        }
      });
    });

    // "Daha Fazla Göster" button
    document.getElementById('qa-show-more')?.addEventListener('click', () => {
      container.querySelectorAll('.qa-item--hidden').forEach(item => {
        item.classList.remove('qa-item--hidden');
        item.style.animation = 'fadeIn 0.3s ease';
      });
      document.getElementById('qa-show-more').remove();
    });

    // Book expansion
    container.querySelectorAll('.library-item').forEach(item => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.dataset.bookIdx);
        const detail = document.getElementById(`book-detail-${idx}`);

        if (expandedBook !== null && expandedBook !== idx) {
          const prevDetail = document.getElementById(`book-detail-${expandedBook}`);
          if (prevDetail) prevDetail.style.display = 'none';
        }

        if (detail.style.display === 'none') {
          detail.style.display = 'block';
          expandedBook = idx;
        } else {
          detail.style.display = 'none';
          expandedBook = null;
        }
      });
    });

    // Hadith share
    document.getElementById('hadith-share-btn')?.addEventListener('click', async () => {
      const shareData = {
        title: 'Günün Hadisi — Ehli-Beyt Ankara',
        text: `${todayHadith.text}\n— ${todayHadith.source}\n(${todayHadith.reference})`,
      };
      
      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {}
      } else {
        await navigator.clipboard.writeText(shareData.text);
        showToast('Hadis panoya kopyalandı!', 'success');
      }
    });

  } catch (e) {
    container.innerHTML = `<div class="page text-center"><p class="text-danger">Bağlantı hatası: İçerikler yüklenemedi.</p></div>`;
  }
}
