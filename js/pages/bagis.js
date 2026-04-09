// Donation Page — Bağış & Şeffaf Yönetim
import { apiFetch, showToast } from '../api.js';

export async function renderBagisPage() {
  const container = document.getElementById('page-content');
  
  container.innerHTML = `
    <div class="page" style="text-align:center;padding:40px;">
      <div class="skeleton" style="width:100%;height:200px;border-radius:12px;margin-bottom:20px;"></div>
    </div>
  `;

  try {
    const campaigns = await apiFetch('/bagis/campaigns/');
    if (campaigns._error) throw new Error("Kampanyalar yüklenemedi");

    container.innerHTML = `
      <div class="page">
        <div class="bagis-hero">
          <div class="bagis-hero__icon">💎</div>
          <h1 class="bagis-hero__title">Bağış & Katkı</h1>
          <p class="bagis-hero__subtitle">"Allah yolunda harcayanların durumu, yedi başak veren bir tohuma benzer..."</p>
        </div>

        <div class="section-header">
          <h2 class="section-title">Aktif Kampanyalar</h2>
        </div>
        <div class="campaign-list">
          ${campaigns.length > 0 ? campaigns.map(c => {
            const perc = Math.min((parseFloat(c.collected) / parseFloat(c.target)) * 100, 100).toFixed(1);
            return `
              <div class="campaign-card">
                <div class="campaign-card__header">
                  <div class="campaign-card__icon">${c.icon}</div>
                  <div class="campaign-card__title">${c.title}</div>
                </div>
                <p class="campaign-card__desc">${c.description}</p>
                <div class="campaign-progress">
                  <div class="campaign-progress__bar">
                    <div class="campaign-progress__fill" style="width: ${perc}%"></div>
                  </div>
                  <div class="campaign-progress__stats">
                    <span class="campaign-progress__collected">${parseFloat(c.collected).toLocaleString('tr-TR')} ₺ toplandı</span>
                    <span class="campaign-progress__target">Hedef: ${parseFloat(c.target).toLocaleString('tr-TR')} ₺</span>
                  </div>
                </div>
              </div>
            `;
          }).join('') : '<p class="text-muted text-center" style="font-size:13px">Aktif kampanya bulunmuyor.</p>'}
        </div>

        <div class="divider"></div>

        <div class="donation-form-container">
          <h3 style="font-size:18px;font-weight:700;margin-bottom:16px;">Güvenli Bağış Yap</h3>
          
          <!-- Donation Types -->
          <div class="donation-type-grid" id="donation-types">
            <div class="donation-type-card donation-type-card--active" data-type="Humus">
              <div style="font-size:24px;margin-bottom:4px">🌾</div>
              <div>Humus</div>
            </div>
            <div class="donation-type-card" data-type="Zekat">
              <div style="font-size:24px;margin-bottom:4px">🪙</div>
              <div>Zekat</div>
            </div>
            <div class="donation-type-card" data-type="Sadaka">
              <div style="font-size:24px;margin-bottom:4px">🤲</div>
              <div>Sadaka</div>
            </div>
            <div class="donation-type-card" data-type="Genel Bağış">
              <div style="font-size:24px;margin-bottom:4px">🕌</div>
              <div>Camiye Katkı</div>
            </div>
          </div>

          <!-- Amounts -->
          <div style="margin-bottom:20px">
            <label class="form-label">Miktar Seçin</label>
            <div class="amount-grid" id="amount-options">
              <div class="amount-btn amount-btn--active" data-amount="50">50 ₺</div>
              <div class="amount-btn" data-amount="100">100 ₺</div>
              <div class="amount-btn" data-amount="250">250 ₺</div>
              <div class="amount-btn" data-amount="500">500 ₺</div>
              <div class="amount-btn" data-amount="1000">1000 ₺</div>
              <div class="amount-btn" data-amount="custom" id="custom-amount-btn">Özel</div>
            </div>
            <div id="custom-amount-container" style="display:none;margin-top:10px">
              <input type="number" id="custom-amount-input" class="form-input" placeholder="Miktar girin (₺)" />
            </div>
          </div>

          <!-- Form -->
          <form id="donation-form">
            <div class="form-group">
              <label class="form-label">Kampanya (Opsiyonel)</label>
              <select id="campaign-select" class="form-select">
                <option value="">İlgili kampanyayı seçebilirsiniz</option>
                ${campaigns.map(c => `<option value="${c.id}">${c.title}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Ad Soyad (Opsiyonel)</label>
              <input type="text" id="donor-name" class="form-input" placeholder="Adınız Soyadınız (Gizli tutmak isterseniz boş bırakın)" />
            </div>
            <button type="submit" class="btn btn--primary btn--full btn--lg" id="donate-submit-btn">
              💳 Bağış Yap
            </button>
            <div style="text-align:center;font-size:11px;color:var(--text-muted);margin-top:12px;display:flex;align-items:center;justify-content:center;gap:4px">
              🔒 256-bit SSL ile güvenli ödeme (Demo)
            </div>
          </form>
        </div>
      </div>
    `;

    // Interaction Logic
    let selectedType = 'Humus';
    let selectedAmount = 50;

    const typeCards = container.querySelectorAll('.donation-type-card');
    typeCards.forEach(card => {
      card.addEventListener('click', () => {
        typeCards.forEach(c => c.classList.remove('donation-type-card--active'));
        card.classList.add('donation-type-card--active');
        selectedType = card.dataset.type;
      });
    });

    const amountBtns = container.querySelectorAll('.amount-btn');
    const customContainer = document.getElementById('custom-amount-container');
    const customInput = document.getElementById('custom-amount-input');

    amountBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        amountBtns.forEach(b => b.classList.remove('amount-btn--active'));
        btn.classList.add('amount-btn--active');
        
        if (btn.dataset.amount === 'custom') {
          customContainer.style.display = 'block';
          customInput.focus();
          selectedAmount = 0;
        } else {
          customContainer.style.display = 'none';
          selectedAmount = parseInt(btn.dataset.amount);
        }
      });
    });

    // Form Submission (POST to API)
    document.getElementById('donation-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      
      let finalAmount = selectedAmount;
      if (document.getElementById('custom-amount-btn').classList.contains('amount-btn--active')) {
        finalAmount = parseInt(customInput.value);
        if (!finalAmount || finalAmount <= 0) {
          showToast('Lütfen geçerli bir miktar girin.', 'error');
          return;
        }
      }

      const campaignId = document.getElementById('campaign-select').value;
      const donorName = document.getElementById('donor-name').value;

      const payload = {
        amount: finalAmount,
        donation_type: selectedType,
        donor_name: donorName || 'Anonim',
      };
      
      if (campaignId) {
        payload.campaign = parseInt(campaignId);
      }

      const btn = document.getElementById('donate-submit-btn');
      btn.disabled = true;
      btn.textContent = 'İşleniyor...';

      const res = await apiFetch('/bagis/donate/', {
        method: 'POST',
        body: payload,
        requireAuth: true // Eğer token varsa gönderir
      });

      if (!res._error) {
        showToast('Bağışınız başarıyla alındı. Allah kabul etsin!', 'success', 5000);
        setTimeout(() => {
          window.location.reload(); // Refresh to update progress bars
        }, 2000);
      } else {
        showToast('Bağış işlemi sırasında bir hata oluştu.', 'error');
        btn.disabled = false;
        btn.textContent = '💳 Bağış Yap';
      }
    });

  } catch (e) {
    container.innerHTML = `<div class="page text-center"><p class="text-danger">Bağlantı hatası: Kampanyalar yüklenemedi.</p></div>`;
  }
}
