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

          <!-- Google Sign-In Button Container -->
          <div id="google-login-btn-container" style="display:flex; justify-content:center; width: 100%;"></div>
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

          <!-- Google Sign-In Button Container -->
          <div id="google-register-btn-container" style="display:flex; justify-content:center; width: 100%;"></div>
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

  // Initialize Google Sign-In with visible rendered buttons
  function initGoogleSignIn() {
    if (typeof google === 'undefined' || !google.accounts) {
      setTimeout(initGoogleSignIn, 500);
      return;
    }

    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleCredential,
      auto_select: false,
      context: "signin",
    });

    const loginContainer = document.getElementById('google-login-btn-container');
    const registerContainer = document.getElementById('google-register-btn-container');

    const buttonConfig = {
      type: 'standard',
      theme: 'outline',
      size: 'large',
      text: 'signin_with',
      shape: 'rectangular',
      logo_alignment: 'left',
      width: loginContainer ? loginContainer.offsetWidth : 300
    };

    if (loginContainer) {
      google.accounts.id.renderButton(loginContainer, buttonConfig);
    }
    
    if (registerContainer) {
      google.accounts.id.renderButton(registerContainer, {
        ...buttonConfig,
        text: 'signup_with'
      });
    }
    
    // Also display the One Tap prompt as a convenience
    google.accounts.id.prompt();
  }

  initGoogleSignIn();
  
  // Re-render Google buttons when window resizes to keep them full width
  window.addEventListener('resize', () => {
    // optional optimization could go here
  });
}
