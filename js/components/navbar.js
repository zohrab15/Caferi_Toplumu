import { icons } from './icons.js';

const navItems = [
  { id: 'prayer', label: 'Namaz', icon: icons.mosque },
  { id: 'community', label: 'Topluluk', icon: icons.community },
  { id: 'ilim', label: 'İlim', icon: icons.book },
  { id: 'bagis', label: 'Bağış', icon: icons.heart },
  { id: 'ziyaret', label: 'Ziyaret', icon: icons.compass },
];

export function renderNavbar(activePage, onNavigate) {
  const nav = document.getElementById('bottom-nav');
  nav.innerHTML = navItems.map(item => `
    <button class="nav-item ${activePage === item.id ? 'active' : ''}" data-page="${item.id}" id="nav-${item.id}">
      ${item.icon}
      <span>${item.label}</span>
    </button>
  `).join('');

  nav.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const page = btn.dataset.page;
      onNavigate(page);
    });
  });
}
