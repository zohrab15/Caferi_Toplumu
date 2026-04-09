import { login, register, googleLogin, showToast } from '../api.js';

// Google Client ID — settings.py ile aynı olmalı
const GOOGLE_CLIENT_ID = '623184133319-q9vipsqbpf4cl15skb6v6g4b9rku9med.apps.googleusercontent.com';

export function renderAuthPage() {
  const container = document.getElementById('page-content');
  
  container.innerHTML = `
    <div class="page" style="padding-top:20px;">
      <a href="#prayer" style="display:inline-flex; align-items:center; gap:6px; color:var(--color-primary); text-decoration:none; font-size:14px; padding:12px 0;">
        ← Ana Sayfa
      </a>
      <div class="auth-container" style="max-width:400px; margin:0 auto;">
        
        <div class="auth-tabs" style="display:flex; border-bottom:1px solid var(--border-color); margin-bottom:24px;">
          <button class="auth-tab active" id="tab-login" style="flex:1; padding:12px; background:none; border:none; color:var(--text-primary); font-weight:bold; border-bottom:2px solid var(--color-primary); cursor:pointer;">Giriş Yap</button>
          <button class="auth-tab" id="tab-register" style="flex:1; padding:12px; background:none; border:none; color:var(--text-muted); cursor:pointer;">Kayıt Ol</button>
        </div>

        <!-- Login Form -->
        <form id="login-form">
          <div class="form-group">
            <label class="form-label">E-posta</label>
            <input type="email" id="login-email" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">Şifre</label>
            <input type="password" id="login-password" class="form-input" required>
          </div>
          <button type="submit" class="btn btn--primary btn--full" id="login-btn">Giriş Yap</button>
          <div id="login-error" style="color:var(--color-danger); margin-top:12px; font-size:13px; text-align:center;"></div>

          <!-- Google Divider -->
          <div style="display:flex; align-items:center; gap:12px; margin:20px 0 16px;">
            <div style="flex:1; height:1px; background:var(--border-color);"></div>
            <span style="font-size:12px; color:var(--text-muted); white-space:nowrap;">veya</span>
            <div style="flex:1; height:1px; background:var(--border-color);"></div>
          </div>

          <!-- Google Sign-In Button -->
          <button type="button" id="google-login-btn" class="btn btn--google btn--full" style="display:flex; align-items:center; justify-content:center; gap:10px; padding:12px 16px; background:#fff; color:#3c4043; border:1px solid #dadce0; border-radius:8px; font-size:14px; font-weight:500; cursor:pointer; transition:all 0.2s ease; box-shadow:0 1px 3px rgba(0,0,0,0.08);">
            <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
            Google ile Giriş Yap
          </button>
        </form>

        <!-- Register Form -->
        <form id="register-form" style="display:none;">
          <div class="form-group">
            <label class="form-label">Ad</label>
            <input type="text" id="reg-firstname" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">Soyad</label>
            <input type="text" id="reg-lastname" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">Telefon</label>
            <input type="tel" id="reg-phone" class="form-input" placeholder="+90 5XX XXX XX XX" required>
          </div>
          <div class="form-group">
            <label class="form-label">E-posta</label>
            <input type="email" id="reg-email" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">Şifre</label>
            <input type="password" id="reg-password" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">Kan Grubu <span style="font-size:11px; color:var(--text-muted);">(Acil durumlar için)</span></label>
            <select id="reg-blood" class="form-select" required>
              <option value="">Seçiniz</option>
              <option value="A Rh+">A Rh+</option><option value="A Rh-">A Rh-</option>
              <option value="B Rh+">B Rh+</option><option value="B Rh-">B Rh-</option>
              <option value="0 Rh+">0 Rh+</option><option value="0 Rh-">0 Rh-</option>
              <option value="AB Rh+">AB Rh+</option><option value="AB Rh-">AB Rh-</option>
            </select>
          </div>
          <div class="form-group" style="padding:12px; background:var(--bg-secondary); border-radius:8px;">
            <label style="display:flex; align-items:flex-start; gap:10px; cursor:pointer;" for="reg-kvkk">
              <input type="checkbox" id="reg-kvkk" required style="accent-color:var(--color-primary); margin-top:3px;">
              <span style="font-size:12px; color:var(--text-secondary);">
                <a href="#kvkk" style="color:var(--color-primary);">KVKK Metnini</a> okudum ve onaylıyorum.
              </span>
            </label>
          </div>
          <button type="submit" class="btn btn--accent btn--full" id="register-btn">Kayıt Ol</button>
          <div id="register-error" style="color:var(--color-danger); margin-top:12px; font-size:13px; text-align:center;"></div>

          <!-- Google Divider -->
          <div style="display:flex; align-items:center; gap:12px; margin:20px 0 16px;">
            <div style="flex:1; height:1px; background:var(--border-color);"></div>
            <span style="font-size:12px; color:var(--text-muted); white-space:nowrap;">veya</span>
            <div style="flex:1; height:1px; background:var(--border-color);"></div>
          </div>

          <!-- Google Sign-In Button (Register) -->
          <button type="button" id="google-register-btn" class="btn btn--google btn--full" style="display:flex; align-items:center; justify-content:center; gap:10px; padding:12px 16px; background:#fff; color:#3c4043; border:1px solid #dadce0; border-radius:8px; font-size:14px; font-weight:500; cursor:pointer; transition:all 0.2s ease; box-shadow:0 1px 3px rgba(0,0,0,0.08);">
            <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
            Google ile Kayıt Ol
          </button>
        </form>

      </div>
    </div>
  `;

  // Switching tabs
  document.getElementById('tab-login').addEventListener('click', (e) => {
    e.target.classList.add('active');
    e.target.style.color = 'var(--text-primary)';
    e.target.style.fontWeight = 'bold';
    e.target.style.borderBottom = '2px solid var(--color-primary)';
    
    const regTab = document.getElementById('tab-register');
    regTab.classList.remove('active');
    regTab.style.color = 'var(--text-muted)';
    regTab.style.fontWeight = 'normal';
    regTab.style.borderBottom = 'none';

    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
  });

  document.getElementById('tab-register').addEventListener('click', (e) => {
    e.target.classList.add('active');
    e.target.style.color = 'var(--text-primary)';
    e.target.style.fontWeight = 'bold';
    e.target.style.borderBottom = '2px solid var(--color-primary)';
    
    const logTab = document.getElementById('tab-login');
    logTab.classList.remove('active');
    logTab.style.color = 'var(--text-muted)';
    logTab.style.fontWeight = 'normal';
    logTab.style.borderBottom = 'none';

    document.getElementById('register-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
  });

  // Login handler
  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('login-btn');
    btn.disabled = true;
    btn.textContent = 'Giriş yapılıyor...';

    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;

    const success = await login(email, pass);
    if (success) {
      showToast('Başarıyla giriş yapıldı. Merhaba!', 'success');
      window.location.hash = '#profile';
      window.dispatchEvent(new Event('authChange'));
    } else {
      showToast('E-posta veya şifre hatalı!', 'error');
      btn.disabled = false;
      btn.textContent = 'Giriş Yap';
    }
  });

  // Register handler
  document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('register-btn');
    btn.disabled = true;
    btn.textContent = 'Kaydediliyor...';

    const data = {
      username: document.getElementById('reg-email').value.split('@')[0], // Generate dummy username
      email: document.getElementById('reg-email').value,
      password: document.getElementById('reg-password').value,
      first_name: document.getElementById('reg-firstname').value,
      last_name: document.getElementById('reg-lastname').value,
      phone: document.getElementById('reg-phone').value,
      blood_group: document.getElementById('reg-blood').value
    };

    const res = await register(data);
    if (!res._error) {
      showToast('Kaydınız başarıyla oluşturuldu!', 'success');
      // Auto login after register
      await login(data.email, data.password);
      window.location.hash = '#profile';
      window.dispatchEvent(new Event('authChange'));
    } else {
      const msg = res.email ? 'Bu e-posta zaten kayıtlı.' : 'Kayıt işlemi başarısız oldu.';
      showToast(msg, 'error');
      btn.disabled = false;
      btn.textContent = 'Kayıt Ol';
    }
  });

  // ─── Google Sign-In Handler ───
  async function handleGoogleCredential(response) {
    const result = await googleLogin(response.credential);
    if (result.success) {
      const msg = result.created
        ? 'Google hesabınızla kayıt oldunuz. Hoş geldiniz!'
        : 'Google ile giriş yapıldı. Merhaba!';
      showToast(msg, 'success');
      window.location.hash = '#profile';
      window.dispatchEvent(new Event('authChange'));
    } else {
      showToast('Google ile giriş başarısız oldu.', 'error');
    }
  }

  // Make callback globally accessible for Google
  window._handleGoogleCredential = handleGoogleCredential;

  // Initialize Google Sign-In with a hidden rendered button
  function initGoogleSignIn() {
    if (typeof google === 'undefined' || !google.accounts) {
      // Google script hasn't loaded yet, retry after a short delay
      setTimeout(initGoogleSignIn, 500);
      return;
    }

    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleCredential,
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    // Create a hidden container for Google's rendered button
    let hiddenDiv = document.getElementById('g_id_signin_hidden');
    if (!hiddenDiv) {
      hiddenDiv = document.createElement('div');
      hiddenDiv.id = 'g_id_signin_hidden';
      hiddenDiv.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;';
      document.body.appendChild(hiddenDiv);
    }

    google.accounts.id.renderButton(hiddenDiv, {
      type: 'standard',
      size: 'large',
      width: 300,
    });
  }

  function triggerGoogleSignIn() {
    if (typeof google === 'undefined' || !google.accounts) {
      showToast('Google servisleri yükleniyor, lütfen tekrar deneyin.', 'error');
      return;
    }

    // Try to click the hidden Google button
    const hiddenDiv = document.getElementById('g_id_signin_hidden');
    if (hiddenDiv) {
      const googleBtn = hiddenDiv.querySelector('[role="button"]') 
                     || hiddenDiv.querySelector('div[tabindex="0"]')
                     || hiddenDiv.querySelector('iframe');
      if (googleBtn) {
        googleBtn.click();
        return;
      }
    }

    // Fallback: use prompt
    google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // If prompt fails, show manual message
        showToast('Google popup açılamadı. Popup engelleyiciyi kapatıp tekrar deneyin.', 'error');
      }
    });
  }

  initGoogleSignIn();

  document.getElementById('google-login-btn').addEventListener('click', triggerGoogleSignIn);
  document.getElementById('google-register-btn').addEventListener('click', triggerGoogleSignIn);

  // Add hover effect for Google buttons
  document.querySelectorAll('.btn--google').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.background = '#f8f9fa';
      btn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.12)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.background = '#fff';
      btn.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
    });
  });
}
