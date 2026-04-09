import { icons } from './icons.js';

import { isLoggedIn } from '../api.js';

// Initialize theme
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  return savedTheme;
}
const initialTheme = initTheme();

export function renderHeader() {
  const header = document.getElementById('app-header');
  const userIconColor = isLoggedIn() ? 'var(--color-primary)' : 'var(--text-muted)';
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  
  const iconPath = currentTheme === 'light' 
    ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>' // Moon
    : '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>'; // Sun

  header.innerHTML = `
    <div class="app-header__logo">
      <div class="app-header__icon">🕌</div>
      <div>
        <div class="app-header__title" id="app-title">Ehli-Beyt Ankara</div>
        <div class="app-header__subtitle">Dijital Topluluk Ekosistemi</div>
      </div>
    </div>
    <div style="display:flex; align-items:center; gap: 4px;">
      <button id="theme-toggle" style="background:none; border:none; color:var(--text-muted); cursor:pointer; padding:8px; display:flex; align-items:center; transition: color 0.2s;">
        <svg id="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22">
          ${iconPath}
        </svg>
      </button>
      <a href="#${isLoggedIn() ? 'profile' : 'auth'}" id="header-profile-action" style="color:${userIconColor}; text-decoration:none; display:flex; align-items:center; padding:8px;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
      </a>
    </div>
  `;

  // Attach event listener
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const root = document.documentElement;
    const isLight = root.getAttribute('data-theme') === 'light';
    const newTheme = isLight ? 'dark' : 'light';
    
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon directly
    document.getElementById('theme-icon').innerHTML = newTheme === 'light'
      ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>'
      : '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
  });
}

