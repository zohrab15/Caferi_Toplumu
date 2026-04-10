// Prayer Times Page — Namaz Vakitleri
// Öncelikli olarak statik Caferi verileri kullanır (ehlibeytalimleri.com)
// Statik veri yoksa offline PrayTimes hesaplamasına geçer

import { getPrayerTimes, getHijriDate } from '../praytimes.js';
import { getStaticPrayerTimes, getStaticDataRange, STATIC_PRAYER_TIMES } from '../prayerdata.js';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

// Ankara coordinates & timezone
const ANKARA_LAT = 39.9334;
const ANKARA_LNG = 32.8597;
const ANKARA_TZ = 3; // UTC+3 (Turkey)

const PRAYER_NAMES = [
  { key: 'Fajr', name: 'İmsak', icon: '🌙' },
  { key: 'Sunrise', name: 'Güneş', icon: '🌅' },
  { key: 'Dhuhr', name: 'Öğle', icon: '☀️' },
  { key: 'Asr', name: 'İkindi', icon: '🌤️' },
  { key: 'Maghrib', name: 'Akşam', icon: '🌆' },
  { key: 'Isha', name: 'Yatsı', icon: '🌃' },
];

// Ezan audio files
const EZAN_LIST = [
  {
    id: 'haci-ruslan',
    name: 'Hacı Ruslan',
    desc: 'Hacı Ruslan sesi ile ezan',
    file: '/assets/audio/Haci Ruslan.mp3',
  },
  {
    id: 'rahim-muazzinzade',
    name: 'Rahim Müəzzinzade',
    desc: 'Rahim Müəzzinzade sesi ile ezan',
    file: '/assets/audio/Rahim Muazzinzade.mp3',
  },
];

// State
let selectedEzan = localStorage.getItem('selectedEzan') || 'haci-ruslan';
let abdestReminder = localStorage.getItem('abdestReminder') !== 'false'; // default on
let ezanAutoPlay = localStorage.getItem('ezanAutoPlay') !== 'false'; // default on
let countdownInterval = null;
let ezanAudio = null;
let isPlaying = false;
let ezanNotified = {};       // track notified prayers to avoid repeat
let abdestNotified = {};     // track abdest reminders

function calculatePrayerTimes() {
  const now = new Date();

  // 1) Önce statik veri kontrol et (ehlibeytalimleri.com verisi)
  const staticData = getStaticPrayerTimes(now);
  if (staticData) {
    // Statik veride Sunset ve Midnight yok — algoritmadan al
    const algoTimes = getPrayerTimes(now, ANKARA_LAT, ANKARA_LNG, ANKARA_TZ);
    staticData.timings.Sunset = algoTimes.Sunset;
    staticData.timings.Midnight = algoTimes.Midnight;
    return {
      timings: staticData.timings,
      hijri: staticData.hijri,
      date: now,
      isStatic: true,
    };
  }

  // 2) Statik veri yoksa algoritmik hesapla
  const timings = getPrayerTimes(now, ANKARA_LAT, ANKARA_LNG, ANKARA_TZ);
  const hijri = getHijriDate(now);
  
  return {
    timings,
    hijri,
    date: now,
    isStatic: false,
  };
}

function getNextPrayer(timings) {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
  for (const prayer of PRAYER_NAMES) {
    const time = timings[prayer.key];
    if (!time || time === '--:--') continue;
    const [h, m] = time.split(':').map(Number);
    const prayerMinutes = h * 60 + m;
    if (prayerMinutes > currentMinutes) {
      return { ...prayer, time, prayerMinutes };
    }
  }
  // If all prayers passed, next is tomorrow's Fajr
  return { ...PRAYER_NAMES[0], time: timings.Fajr, prayerMinutes: 24 * 60 };
}

function formatCountdown(targetTime) {
  const now = new Date();
  const [h, m] = targetTime.split(':').map(Number);
  let diff = (h * 60 + m) - (now.getHours() * 60 + now.getMinutes());
  if (diff < 0) diff += 24 * 60;
  
  const hours = Math.floor(diff / 60);
  const mins = diff % 60;
  const secs = 59 - now.getSeconds();
  
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function getMinutesUntil(targetTime) {
  const now = new Date();
  const [h, m] = targetTime.split(':').map(Number);
  let diff = (h * 60 + m) - (now.getHours() * 60 + now.getMinutes());
  if (diff < 0) diff += 24 * 60;
  return diff;
}

// Play/Pause ezan audio
function playEzan(ezanId) {
  const ezan = EZAN_LIST.find(e => e.id === ezanId);
  if (!ezan) return;

  // If already playing this ezan, pause it
  if (ezanAudio && isPlaying) {
    ezanAudio.pause();
    isPlaying = false;
    updatePlayButtons();
    updateWaveform(false);
    return;
  }

  // If different ezan or new play
  if (ezanAudio) {
    ezanAudio.pause();
    ezanAudio = null;
  }

  ezanAudio = new Audio(ezan.file);
  ezanAudio.volume = 1.0;
  isPlaying = true;

  ezanAudio.play().catch(err => {
    console.warn('Ezan playing failed:', err);
    isPlaying = false;
  });

  ezanAudio.addEventListener('ended', () => {
    isPlaying = false;
    updatePlayButtons();
    updateWaveform(false);
  });

  ezanAudio.addEventListener('timeupdate', () => {
    updateProgress(ezanAudio);
  });

  updatePlayButtons();
  updateWaveform(true);
}

function stopEzan() {
  if (ezanAudio) {
    ezanAudio.pause();
    ezanAudio.currentTime = 0;
    ezanAudio = null;
    isPlaying = false;
    updatePlayButtons();
    updateWaveform(false);
  }
}

function updatePlayButtons() {
  document.querySelectorAll('.ezan-play-btn').forEach(btn => {
    const id = btn.dataset.ezanId;
    if (id === selectedEzan && isPlaying) {
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>`;
      btn.classList.add('playing');
    } else {
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><polygon points="5,3 19,12 5,21"/></svg>`;
      btn.classList.remove('playing');
    }
  });
}

function updateWaveform(active) {
  const waveform = document.getElementById('ezan-waveform');
  if (waveform) {
    if (active) {
      waveform.classList.add('active');
    } else {
      waveform.classList.remove('active');
    }
  }
}

function updateProgress(audio) {
  const bar = document.getElementById('ezan-progress-fill');
  const timeEl = document.getElementById('ezan-time');
  if (bar && audio.duration) {
    const pct = (audio.currentTime / audio.duration) * 100;
    bar.style.width = `${pct}%`;
  }
  if (timeEl && audio.duration) {
    const cur = formatAudioTime(audio.currentTime);
    const dur = formatAudioTime(audio.duration);
    timeEl.textContent = `${cur} / ${dur}`;
  }
}

function formatAudioTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

// Check if it's time for prayer and auto-play ezan
function checkPrayerNotification(timings) {
  const now = new Date();
  const currentKey = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  for (const prayer of PRAYER_NAMES) {
    const time = timings[prayer.key];
    if (!time || time === '--:--') continue;
    
    // Abdest hatırlatması: 15 dakika önce
    if (abdestReminder) {
      const minsUntil = getMinutesUntil(time);
      if (minsUntil === 15 && !abdestNotified[prayer.key]) {
        abdestNotified[prayer.key] = true;

        // Show abdest reminder notification
        if (Notification.permission === 'granted') {
          new Notification(`🚿 Abdest Vaktidir`, {
            body: `${prayer.icon} ${prayer.name} namazına 15 dakika kaldı — Abdest almayı unutmayın!`,
            icon: '/assets/favicon.svg',
            tag: `abdest-${prayer.key}`,
          });
        }

        // Show in-app toast
        showAbdestToast(prayer);
      }
    }
    
    // Ezan vakti — sadece imsak (Fajr), öğle (Dhuhr) ve akşam (Maghrib) vakitlerinde otomatik ezan okunur
    const isEzanTime = ['Fajr', 'Dhuhr', 'Maghrib'].includes(prayer.key);
    
    // DEV_TEST = Sadece test amaçlı tetikleme
    if (prayer.forceTest || (ezanAutoPlay && isEzanTime && time === currentKey && !ezanNotified[prayer.key])) {
      if (!prayer.forceTest) ezanNotified[prayer.key] = true;

      // Show browser notification
      if (Notification.permission === 'granted') {
        new Notification(`${prayer.icon} ${prayer.name} Vakti`, {
          body: `${prayer.name} vakti geldi — Ezan okunuyor`,
          icon: '/assets/favicon.svg',
          tag: `ezan-${prayer.key}`,
        });
      }

      // Auto-play ezan
      playEzan(selectedEzan);
    }
  }
}

function showAbdestToast(prayer) {
  // Remove previous toast if exists
  const prev = document.getElementById('abdest-toast');
  if (prev) prev.remove();

  const toast = document.createElement('div');
  toast.id = 'abdest-toast';
  toast.className = 'abdest-toast abdest-toast--show';
  toast.innerHTML = `
    <div class="abdest-toast__icon">🚿</div>
    <div class="abdest-toast__text">
      <strong>Abdest Vaktidir!</strong>
      <span>${prayer.icon} ${prayer.name} namazına 15 dakika kaldı</span>
    </div>
    <button class="abdest-toast__close" id="abdest-toast-close">✕</button>
  `;
  document.body.appendChild(toast);

  document.getElementById('abdest-toast-close')?.addEventListener('click', () => {
    toast.classList.remove('abdest-toast--show');
    setTimeout(() => toast.remove(), 400);
  });

  // Auto dismiss after 10 seconds
  setTimeout(() => {
    if (document.getElementById('abdest-toast')) {
      toast.classList.remove('abdest-toast--show');
      setTimeout(() => toast.remove(), 400);
    }
  }, 10000);
}

function startCountdown(timings) {
  if (countdownInterval) clearInterval(countdownInterval);
  
  const update = () => {
    const next = getNextPrayer(timings);
    const countdownEl = document.getElementById('prayer-countdown');
    const nameEl = document.getElementById('prayer-next-name');
    if (countdownEl) countdownEl.textContent = formatCountdown(next.time);
    if (nameEl) nameEl.textContent = `${next.icon} ${next.name}`;

    // Update abdest reminder bar
    const minsUntil = getMinutesUntil(next.time);
    const abdestBar = document.getElementById('abdest-reminder-bar');
    if (abdestBar && abdestReminder) {
      if (minsUntil <= 15 && minsUntil > 0) {
        abdestBar.style.display = 'flex';
        abdestBar.querySelector('.abdest-bar__text').textContent = 
          `🚿 Abdest vaktidir — ${next.name} namazına ${minsUntil} dk kaldı`;
      } else {
        abdestBar.style.display = 'none';
      }
    }

    // Check if any prayer time has arrived
    checkPrayerNotification(timings);
  };
  
  update();
  countdownInterval = setInterval(update, 1000);
}

function generateWaveformBars(count = 24) {
  return Array.from({ length: count }, (_, i) => {
    const delay = (i * 0.08).toFixed(2);
    return `<span class="waveform-bar" style="animation-delay:${delay}s"></span>`;
  }).join('');
}

export async function renderPrayerPage() {
  const container = document.getElementById('page-content');
  
  // Show skeleton loading
  container.innerHTML = `
    <div class="page">
      <div class="prayer-hero">
        <div class="prayer-hero__mosque">🕌</div>
        <div class="prayer-hero__next-label">BİR SONRAKİ NAMAZ</div>
        <div class="skeleton" style="height:32px;width:150px;margin:8px auto"></div>
        <div class="skeleton" style="height:48px;width:200px;margin:8px auto"></div>
      </div>
    </div>
  `;
  
  // Request notification permission
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }

  // Calculate — statik veri öncelikli, yoksa algoritmik
  const data = calculatePrayerTimes();
  const timings = data.timings;
  const isStatic = data.isStatic;
  const hijri = data.hijri;
  const nextPrayer = getNextPrayer(timings);
  
  const hijriDate = `${hijri.day} ${hijri.monthNameAr} ${hijri.year} H.`;
  const hijriDateTr = `${hijri.day} ${hijri.monthName} ${hijri.year}`;
  const miladi = new Date().toLocaleDateString('tr-TR', { 
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
  });

  const minsUntilNext = getMinutesUntil(nextPrayer.time);

  container.innerHTML = `
    <div class="page">
      <!-- Abdest Reminder Bar -->
      <div class="abdest-reminder-bar" id="abdest-reminder-bar" style="display:${(abdestReminder && minsUntilNext <= 15 && minsUntilNext > 0) ? 'flex' : 'none'}">
        <div class="abdest-bar__icon">🚿</div>
        <div class="abdest-bar__text">🚿 Abdest vaktidir — ${nextPrayer.name} namazına ${minsUntilNext} dk kaldı</div>
      </div>

      <!-- Hero: Next prayer countdown -->
      <div class="prayer-hero">
        <div class="prayer-hero__mosque">🕌</div>
        <div class="prayer-hero__next-label">BİR SONRAKİ NAMAZ</div>
        <div class="prayer-hero__next-name" id="prayer-next-name">${nextPrayer.icon} ${nextPrayer.name}</div>
        <div class="prayer-hero__countdown" id="prayer-countdown">${formatCountdown(nextPrayer.time)}</div>
        <div class="prayer-hero__date">
          ${miladi}<br/>
          <span class="text-arabic text-accent">${hijriDate}</span><br/>
          <span class="text-muted" style="font-size:12px">${hijriDateTr}</span>
        </div>
      </div>

      <!-- Method badge -->
      <div style="text-align:center;margin-bottom:16px">
        <span class="badge badge--primary" style="font-size:11px;padding:6px 14px">
          ${isStatic 
            ? '✦ Caferi Ezan Vakitleri · ehlibeytalimleri.com' 
            : '✦ Caferi (Jafari) Hesaplaması · Offline'}
        </span>
      </div>

      <!-- Prayer times list -->
      <div class="section-header">
        <h2 class="section-title">Günlük Vakitler</h2>
        <span class="badge badge--accent">Ankara</span>
      </div>
      <div class="prayer-list">
        ${PRAYER_NAMES.map(p => {
          const isActive = nextPrayer.key === p.key;
          return `
            <div class="prayer-item ${isActive ? 'prayer-item--active' : ''}">
              <div class="prayer-item__left">
                <div class="prayer-item__icon">${p.icon}</div>
                <span class="prayer-item__name">${p.name}</span>
              </div>
              <span class="prayer-item__time">${timings[p.key] || '--:--'}</span>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Extra: Midnight -->
      <div class="card card--glass" style="margin-bottom:20px;text-align:center;padding:14px">
        <span class="text-muted" style="font-size:13px">🕐 Gece Yarısı (Nisf-ul Leyl): </span>
        <span class="text-accent" style="font-weight:600">${timings.Midnight || '--:--'}</span>
        <span class="text-muted" style="font-size:11px;display:block;margin-top:4px">Caferi hesabı: Güneş batışından imsaka kadar olan sürenin ortası</span>
      </div>

      <!-- Ezan Selection & Player -->
      <div class="ezan-selector">
        <div class="section-header">
          <h2 class="section-title">Ezan Sesi</h2>
          <span class="badge badge--accent${!ezanAutoPlay ? ' badge--muted' : ''}" id="ezan-status">${isPlaying ? '🔊 Çalıyor' : (ezanAutoPlay ? '🔔 Aktif' : '🔇 Sessiz')}</span>
        </div>

        <!-- Audio player card -->
        <div class="ezan-player-card" id="ezan-player-card">
          <div class="ezan-player__header">
            <div class="ezan-player__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="24" height="24">
                <path d="M9 18V5l12-2v13"/>
                <circle cx="6" cy="18" r="3"/>
                <circle cx="18" cy="16" r="3"/>
              </svg>
            </div>
            <div>
              <div class="ezan-player__title">Şu an seçili</div>
              <div class="ezan-player__muezzin" id="ezan-current-name">${EZAN_LIST.find(e => e.id === selectedEzan)?.name || 'Hacı Ruslan'}</div>
            </div>
          </div>

          <!-- Waveform -->
          <div class="ezan-waveform" id="ezan-waveform">
            ${generateWaveformBars(28)}
          </div>

          <!-- Progress bar -->
          <div class="ezan-progress">
            <div class="ezan-progress__bar">
              <div class="ezan-progress__fill" id="ezan-progress-fill"></div>
            </div>
            <div class="ezan-progress__time" id="ezan-time">0:00 / 0:00</div>
          </div>
        </div>

        <!-- Ezan options -->
        <div class="ezan-options">
          ${EZAN_LIST.map(e => `
            <div class="ezan-option ${selectedEzan === e.id ? 'ezan-option--active' : ''}" data-ezan="${e.id}" id="ezan-${e.id}">
              <div class="ezan-option__radio"></div>
              <div class="ezan-option__info">
                <div class="ezan-option__label">${e.name}</div>
                <div class="ezan-option__desc">${e.desc}</div>
              </div>
              <button class="ezan-play-btn" data-ezan-id="${e.id}" id="ezan-play-${e.id}" title="Dinle">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><polygon points="5,3 19,12 5,21"/></svg>
              </button>
            </div>
          `).join('')}
        </div>

        <!-- Settings toggles -->
        <div class="ezan-settings-card">
          <div class="ezan-setting-row">
            <div class="ezan-setting__info">
              <span class="ezan-setting__icon">🔔</span>
              <div>
                <div class="ezan-setting__label">Otomatik Ezan Bildirimi</div>
                <div class="ezan-setting__desc">Namaz vakti geldiğinde ezan otomatik olarak okunacaktır</div>
              </div>
            </div>
            <label class="toggle" for="toggle-ezan">
              <input type="checkbox" id="toggle-ezan" ${ezanAutoPlay ? 'checked' : ''} />
              <span class="toggle__slider"></span>
            </label>
          </div>
          <div class="ezan-setting-row">
            <div class="ezan-setting__info">
              <span class="ezan-setting__icon">🚿</span>
              <div>
                <div class="ezan-setting__label">Abdest Hatırlatması</div>
                <div class="ezan-setting__desc">Namaz vaktine 15 dakika kala bildirim gönderir</div>
              </div>
            </div>
            <label class="toggle" for="toggle-abdest">
              <input type="checkbox" id="toggle-abdest" ${abdestReminder ? 'checked' : ''} />
              <span class="toggle__slider"></span>
            </label>
          </div>
          
          <!-- Test Button -->
          <div class="ezan-setting-row" style="margin-top: 10px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 16px;">
            <div class="ezan-setting__info">
              <span class="ezan-setting__icon">🧪</span>
              <div>
                <div class="ezan-setting__label">Ezanı Test Et</div>
                <div class="ezan-setting__desc" style="font-size:11px;">Namaz vaktinin geldiğini simüle eder</div>
              </div>
            </div>
            <button id="btn-test-ezan" class="btn btn--outline" style="padding: 4px 12px; font-size: 12px;">Test Et</button>
          </div>
        </div>
      </div>


    </div>
  `;

  // Ezan selection events
  container.querySelectorAll('.ezan-option').forEach(opt => {
    opt.addEventListener('click', (e) => {
      if (e.target.closest('.ezan-play-btn')) return;

      selectedEzan = opt.dataset.ezan;
      localStorage.setItem('selectedEzan', selectedEzan);
      
      if (Capacitor.isNativePlatform()) {
        scheduleNativeNotifications();
      }

      container.querySelectorAll('.ezan-option').forEach(o => o.classList.remove('ezan-option--active'));
      opt.classList.add('ezan-option--active');

      const nameEl = document.getElementById('ezan-current-name');
      const ezan = EZAN_LIST.find(e => e.id === selectedEzan);
      if (nameEl && ezan) nameEl.textContent = ezan.name;
    });
  });

  // Play button events 
  container.querySelectorAll('.ezan-play-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const ezanId = btn.dataset.ezanId;

      if (ezanId !== selectedEzan) {
        selectedEzan = ezanId;
        localStorage.setItem('selectedEzan', selectedEzan);
        
        if (Capacitor.isNativePlatform()) {
          scheduleNativeNotifications();
        }
        container.querySelectorAll('.ezan-option').forEach(o => o.classList.remove('ezan-option--active'));
        const parentOption = btn.closest('.ezan-option');
        if (parentOption) parentOption.classList.add('ezan-option--active');
        const nameEl = document.getElementById('ezan-current-name');
        const ezan = EZAN_LIST.find(e => e.id === selectedEzan);
        if (nameEl && ezan) nameEl.textContent = ezan.name;
        stopEzan();
      }

      playEzan(ezanId);

      const statusEl = document.getElementById('ezan-status');
      if (statusEl) {
        statusEl.textContent = isPlaying ? '🔊 Çalıyor' : '🔇 Sessiz';
      }
    });
  });

  // Toggle: Otomatik Ezan Bildirimi
  const ezanToggle = document.getElementById('toggle-ezan');
  if (ezanToggle) {
    ezanToggle.checked = ezanAutoPlay;
    ezanToggle.addEventListener('change', () => {
      ezanAutoPlay = ezanToggle.checked;
      localStorage.setItem('ezanAutoPlay', ezanAutoPlay ? 'true' : 'false');
      
      if (Capacitor.isNativePlatform()) {
        scheduleNativeNotifications();
      }

      // Status badge güncelle
      const statusEl = document.getElementById('ezan-status');
      if (statusEl) {
        if (!ezanAutoPlay) {
          statusEl.textContent = '🔇 Sessiz';
          statusEl.classList.add('badge--muted');
        } else {
          statusEl.textContent = isPlaying ? '🔊 Çalıyor' : '🔔 Aktif';
          statusEl.classList.remove('badge--muted');
        }
      }
    });
  }

  // Toggle: Abdest Reminder
  const abdestToggle = document.getElementById('toggle-abdest');
  if (abdestToggle) {
    abdestToggle.addEventListener('change', () => {
      abdestReminder = abdestToggle.checked;
      localStorage.setItem('abdestReminder', abdestReminder ? 'true' : 'false');
      
      if (Capacitor.isNativePlatform()) {
        scheduleNativeNotifications();
      }
    });
  }

  // Start countdown
  startCountdown(timings);
  
  // Test Button Event
  const testBtn = document.getElementById('btn-test-ezan');
  if (testBtn) {
    testBtn.addEventListener('click', () => {
      checkPrayerNotification(timings); // Normally checks time
      // Forcing a fake prayer event trigger
      const fakePrayer = { key: 'Fajr', name: 'İmsak (Test)', icon: '🌙', forceTest: true };
      
      if (Notification.permission === 'granted') {
        new Notification(`${fakePrayer.icon} ${fakePrayer.name} Vakti`, {
          body: `Bu bir test bildirimidir — Ezan okunuyor`,
          icon: '/assets/favicon.svg',
          tag: `ezan-test`,
        });
      } else if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
      playEzan(selectedEzan);
    });
  }
  
  if (Capacitor.isNativePlatform()) {
    scheduleNativeNotifications();
  }
}



export async function scheduleNativeNotifications() {
  if (!Capacitor.isNativePlatform()) return;

  try {
    const hasPerm = await LocalNotifications.checkPermissions();
    if (hasPerm.display !== 'granted') {
      const p = await LocalNotifications.requestPermissions();
      if (p.display !== 'granted') return;
    }

    // Cancel all current pending notifications
    const pending = await LocalNotifications.getPending();
    if (pending.notifications.length > 0) {
      await LocalNotifications.cancel({ notifications: pending.notifications });
    }

    if (!ezanAutoPlay && !abdestReminder) return; // Nothing to schedule

    const notifications = [];
    const now = new Date();
    let idCounter = 1;

    // We use selectedEzan
    const soundFile = selectedEzan === 'haci-ruslan' ? 'haci_ruslan.mp3' : 'rahim_muazzinzade.mp3';

    // Ensure channel exists for Android
    if (Capacitor.getPlatform() === 'android') {
      await LocalNotifications.createChannel({
        id: 'ezan-channel',
        name: 'Ezan Bildirimleri',
        description: 'Vakit girdiğinde ezan okur',
        importance: 5,
        visibility: 1,
        sound: soundFile,
        vibration: true
      });
    }

    Object.entries(STATIC_PRAYER_TIMES).forEach(([dateStr, times]) => {
      const [y, m, d] = dateStr.split('-').map(Number);
      const dayDate = new Date(y, m - 1, d);
      
      // Skip scheduling past days (keep checking from today)
      if (dayDate.getTime() < now.getTime() - 86400000) return;

      ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].forEach(prayerKey => {
         const time = times[prayerKey];
         if (!time || time === '--:--') return;
         const [hours, mins] = time.split(':').map(Number);
         const scheduleDate = new Date(y, m - 1, d, hours, mins, 0);

         // Add Ezan Notification - sadece İmsak, Öğle, Akşam
         const isEzanTime = ['Fajr', 'Dhuhr', 'Maghrib'].includes(prayerKey);
         if (ezanAutoPlay && isEzanTime && scheduleDate.getTime() > now.getTime()) {
             const pInfo = PRAYER_NAMES.find(p => p.key === prayerKey);
             notifications.push({
               title: `${pInfo ? pInfo.icon + ' ' + pInfo.name : prayerKey} Vakti`,
               body: `Otomatik ezan okunuyor`,
               id: idCounter++,
               schedule: { at: scheduleDate, allowWhileIdle: true },
               sound: soundFile,
               channelId: 'ezan-channel'
             });
         }

         // Add Abdest Reminder
         if (abdestReminder) {
             const abdestDate = new Date(scheduleDate.getTime());
             abdestDate.setMinutes(abdestDate.getMinutes() - 15);
             if (abdestDate.getTime() > now.getTime()) {
               const pInfo = PRAYER_NAMES.find(p => p.key === prayerKey);
               notifications.push({
                 title: `🚿 Abdest Vaktidir`,
                 body: `${pInfo ? pInfo.icon + ' ' + pInfo.name : prayerKey} namazına 15 dakika kaldı`,
                 id: idCounter++,
                 schedule: { at: abdestDate, allowWhileIdle: true }
               });
             }
         }
      });
    });

    // Schedule (cap it at 400 to avoid OS limits)
    if (notifications.length > 0) {
      await LocalNotifications.schedule({ notifications: notifications.slice(0, 400) });
      console.log(`[Native] Scheduled ${Math.min(notifications.length, 400)} background notifications.`);
    }

  } catch (err) {
    console.error('Failed to schedule native notifications:', err);
  }
}

// Cleanup on page leave
export function cleanupPrayerPage() {
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
  stopEzan();
}
