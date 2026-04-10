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
export async function initWebPush(userInitiated = false) {
  if (!('serviceWorker' in navigator)) {
    if (userInitiated) alert("Tarayıcınız Service Worker desteklemiyor.");
    return;
  }
  if (!('PushManager' in window)) {
    if (userInitiated) alert("Tarayıcınız (veya telefonunuz) Push bildirimlerini desteklemiyor. (iOS kullanıyorsanız uygulamayı 'Ana Ekrana Ekle' yapmanız gerekebilir.)");
    return;
  }
  if (!isLoggedIn()) {
    if (userInitiated) alert("Bildirim izni için önce giriş yapmalısınız.");
    return;
  }

  try {
    let permission = Notification.permission;
    
    // Sesi olarak veya sayfa yüklendiğinde otomatik sorulmasını engelle
    if (permission === 'default' && userInitiated) {
      permission = await Notification.requestPermission();
    }

    if (permission === 'granted') {
      const swRegistration = await navigator.serviceWorker.ready;
      const applicationServerKey = urlB64ToUint8Array('BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuB-3qOX7j30CG3EMGWpncwYkU');
      const subscription = await swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey
      });
      const API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') 
          ? 'http://localhost:8000/api' : 'https://caferi-toplumu.onrender.com/api';
      
      const res = await fetch(`${API_BASE}/auth/webpush/subscribe/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          status_type: 'subscribe',
          subscription: subscription,
          browser: navigator.userAgent.includes('Chrome') ? 'chrome' : 'other',
          user_agent: navigator.userAgent
        })
      });

      if (!res.ok) {
        throw new Error(`Sunucu hatası: ${res.status}`);
      }
      
      if (userInitiated) {
        const ev = new CustomEvent('pushSubscribed');
        window.dispatchEvent(ev);
      }
    } else {
      if (userInitiated) alert("Bildirim izni reddedildi. Lütfen tarayıcı ayarlarından siteye izin verin.");
    }
  } catch (e) {
    console.error('Push registration failed:', e);
    if (userInitiated) {
      alert("Bildirim bağlantısı kurulamadı: " + e.message + "\nLütfen tarayıcınızın bildirim ayarlarını kontrol edin.");
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
  // initWebPush(); // Legv edildi
});

// Start app when DOM ready or already loaded
function startApp() {
  init();
  // setTimeout(initWebPush, 3000); // Legv edildi
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
