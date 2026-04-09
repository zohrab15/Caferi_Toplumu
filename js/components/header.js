import { icons } from './icons.js';

import { isLoggedIn } from '../api.js';

export function renderHeader() {
  const header = document.getElementById('app-header');
  const userIconColor = isLoggedIn() ? 'var(--color-primary)' : 'var(--text-muted)';

  header.innerHTML = `
    <div class="app-header__logo">
      <div class="app-header__icon">🕌</div>
      <div>
        <div class="app-header__title" id="app-title">Ehli-Beyt Ankara</div>
        <div class="app-header__subtitle">Dijital Topluluk Ekosistemi</div>
      </div>
    </div>
    <a href="#${isLoggedIn() ? 'profile' : 'auth'}" id="header-profile-action" style="color:${userIconColor}; text-decoration:none; display:flex; align-items:center; padding:8px;">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    </a>
  `;
}
