// Main App — SPA Router
import { renderHeader } from './components/header.js';
import { renderNavbar } from './components/navbar.js';
import { renderPrayerPage, cleanupPrayerPage } from './pages/prayer.js';
import { renderCommunityPage } from './pages/community.js';
import { renderIlimPage } from './pages/ilim.js';
import { renderBagisPage } from './pages/bagis.js';
import { renderZiyaretPage } from './pages/ziyaret.js';
import { renderKuranPage, cleanupKuranPage } from './pages/kuran.js';
import { renderKvkkPage } from './pages/kvkk.js';
import { renderAuthPage } from './pages/auth.js';
import { renderProfilePage } from './pages/profile.js';
import { renderAdminPage } from './pages/admin.js';
import { isLoggedIn, apiFetch } from './api.js';

// Current page state
let currentPage = 'prayer';

// Navigate to a page
function navigateTo(pageId) {
  // Cleanup previous page
  if (currentPage === 'prayer') {
    cleanupPrayerPage();
  } else if (currentPage === 'kuran') {
    cleanupKuranPage();
  }

  currentPage = pageId;
  window.location.hash = pageId;

  // Update navbar
  renderNavbar(currentPage, navigateTo);

  // Scroll to top
  window.scrollTo(0, 0);

  // Hide/show bottom nav for certain pages
  const navEl = document.querySelector('.bottom-nav');
  const hiddenNavPages = ['kvkk', 'auth', 'profile', 'admin', 'kuran'];
  if (navEl) {
    navEl.style.display = hiddenNavPages.includes(pageId) ? 'none' : 'flex';
  }

  // Render the page
  switch (pageId) {
    case 'prayer':
      renderPrayerPage();
      break;
    case 'community':
      renderCommunityPage();
      break;
    case 'ilim':
      renderIlimPage();
      break;
    case 'bagis':
      renderBagisPage();
      break;
    case 'ziyaret':
      renderZiyaretPage();
      break;
    case 'kuran':
      renderKuranPage();
      break;
    case 'kvkk':
      renderKvkkPage();
      break;
    case 'auth':
      if (isLoggedIn()) {
        navigateTo('profile');
        return;
      }
      renderAuthPage();
      break;
    case 'profile':
      if (!isLoggedIn()) {
        navigateTo('auth');
        return;
      }
      renderProfilePage();
      break;
    case 'admin':
      if (!isLoggedIn()) {
        navigateTo('auth');
        return;
      }
      renderAdminPage();
      break;
    default:
      renderPrayerPage();
  }
}

// Handle hash changes (back/forward)
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#', '') || 'prayer';
  if (hash !== currentPage) {
    navigateTo(hash);
  }
});

// Initialize
function init() {
  renderHeader();

  // Check for hash in URL
  const hash = window.location.hash.replace('#', '');
  const validPages = ['prayer','community','ilim','bagis','ziyaret','kuran','kvkk','auth','profile','admin'];
  if (hash && validPages.includes(hash)) {
    currentPage = hash;
  }

  navigateTo(currentPage);
}

// WebPush init
async function initWebPush() {
  if ('serviceWorker' in navigator && 'PushManager' in window && isLoggedIn()) {
    try {
      const swRegistration = await navigator.serviceWorker.ready;
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const applicationServerKey = urlB64ToUint8Array('BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuB-3qOX7j30CG3EMGWpncwYkU');
        const subscription = await swRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey
        });
        await apiFetch('/auth/webpush/subscribe/', {
          method: 'POST',
          body: {
            status_type: 'subscribe',
            subscription: subscription,
            browser: navigator.userAgent.includes('Chrome') ? 'chrome' : 'other',
            user_agent: navigator.userAgent
          },
          requireAuth: true
        });
      }
    } catch (e) {
      console.error('Push registration failed:', e);
    }
  }
}

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Re-render header when auth state changes
window.addEventListener('authChange', () => {
  renderHeader();
  initWebPush();
});

// Start app when DOM ready or already loaded
function startApp() {
  init();
  setTimeout(initWebPush, 3000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
