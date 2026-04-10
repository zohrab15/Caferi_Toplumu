export async function renderKuranPage() {
  const container = document.getElementById('page-content');
  
  // Hide bottom nav specifically for this page to show the player
  const navEl = document.querySelector('.bottom-nav');
  if (navEl) navEl.style.display = 'none';

  container.innerHTML = `
    <div class="page kuran-page">
      <div class="kuran-header">
        <button class="back-btn" id="kuran-back-btn">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <h1 class="kuran-title">Kur'an-ı Kerim</h1>
        <div style="width:40px"></div>
      </div>

      <div class="kuran-loading" id="kuran-initial-loader">
        <div class="kuran-loading-spinner"></div>
        <p>Sûreler yükleniyor...</p>
      </div>

      <div id="kuran-content" style="display: none;">
        <select class="surah-selector" id="surah-selector"></select>

        <div class="kuran-info-card" id="surah-info-card">
          <div class="kuran-info-name" id="surah-ar-name"></div>
          <div class="kuran-info-translation" id="surah-tr-name"></div>
          <div class="kuran-info-meta"><span id="surah-revelation"></span> • <span id="surah-ayah-count"></span> Ayet</div>
        </div>

        <div class="verses-list" id="verses-list"></div>
      </div>
    </div>

    <!-- Sticky Audio Player -->
    <div class="kuran-player" id="kuran-player">
      <div class="player-info">
        <span id="player-surah-name">Sûre</span>
        <span id="player-ayah-number">Ayet --</span>
      </div>
      <div class="player-controls">
        <button class="player-btn" id="btn-prev-ayah">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>
        </button>
        <button class="player-btn play-pause" id="btn-play-pause">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        </button>
        <button class="player-btn" id="btn-next-ayah">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
        </button>
      </div>
      <!-- Hidden native audio element -->
      <audio id="kuran-audio" preload="auto"></audio>
    </div>
  `;

  document.getElementById('kuran-back-btn').addEventListener('click', () => {
    window.location.hash = 'ilim';
  });

  // State
  let currentSurah = 1;
  let surahsMeta = [];
  let currentVerses = [];
  let playingIndex = -1; // 0 to N
  let isPlaying = false;

  const audioEl = document.getElementById('kuran-audio');
  const btnPlayPause = document.getElementById('btn-play-pause');

  try {
    // 1. Fetch Surah List
    const metaRes = await fetch('https://api.alquran.cloud/v1/surah');
    const metaData = await metaRes.json();
    surahsMeta = metaData.data;

    const selector = document.getElementById('surah-selector');
    selector.innerHTML = surahsMeta.map(s => `<option value="${s.number}">${s.number}. ${s.englishName} (${s.name})</option>`).join('');

    document.getElementById('kuran-initial-loader').style.display = 'none';
    document.getElementById('kuran-content').style.display = 'block';

    // 2. Event listener for Surah change
    selector.addEventListener('change', (e) => {
      loadSurah(parseInt(e.target.value));
    });

    // 3. Audio Events
    audioEl.addEventListener('ended', () => {
      if (playingIndex < currentVerses.length - 1) {
        playAyah(playingIndex + 1);
      } else {
        pauseAudio(); // end of surah
      }
    });

    audioEl.addEventListener('play', () => {
      isPlaying = true;
      updatePlayPauseIcon();
      highlightAyahCard(playingIndex);
    });

    audioEl.addEventListener('pause', () => {
      isPlaying = false;
      updatePlayPauseIcon();
      highlightAyahCard(playingIndex);
    });

    btnPlayPause.addEventListener('click', () => {
      if (playingIndex === -1) {
        if (currentVerses.length > 0) playAyah(0);
      } else {
        if (isPlaying) {
          audioEl.pause();
        } else {
          audioEl.play();
        }
      }
    });

    document.getElementById('btn-prev-ayah').addEventListener('click', () => {
      if (playingIndex > 0) playAyah(playingIndex - 1);
    });

    document.getElementById('btn-next-ayah').addEventListener('click', () => {
      if (playingIndex < currentVerses.length - 1) playAyah(playingIndex + 1);
    });

    // Load first surah initially
    loadSurah(1);

  } catch (err) {
    console.error('Kuran loading error', err);
    container.innerHTML = `<div class="page text-center"><p class="text-danger">Kur'an verileri yüklenemedi. Lütfen internet bağlantınızı kontrol edin.</p></div>`;
  }

  async function loadSurah(number) {
    currentSurah = number;
    pauseAudio();
    playingIndex = -1;
    
    document.getElementById('kuran-player').classList.remove('visible');
    const listEl = document.getElementById('verses-list');
    listEl.innerHTML = '<div class="kuran-loading"><div class="kuran-loading-spinner"></div><p>Ayetler yükleniyor...</p></div>';

    try {
      // Fetch: Arabic Text (quran-uthmani), Turkish (tr.diyanet), Audio (ar.alafasy)
      const res = await fetch(`https://api.alquran.cloud/v1/surah/${number}/editions/quran-uthmani,tr.diyanet,ar.alafasy`);
      const data = await res.json();
      
      const arEdition = data.data[0];
      const trEdition = data.data[1];
      const auEdition = data.data[2];

      const meta = surahsMeta[number - 1];
      
      // Update Info Card
      document.getElementById('surah-ar-name').textContent = meta.name;
      document.getElementById('surah-tr-name').textContent = meta.englishNameTranslation;
      document.getElementById('surah-revelation').textContent = meta.revelationType === 'Meccan' ? 'Mekki' : 'Medeni';
      document.getElementById('surah-ayah-count').textContent = meta.numberOfAyahs;
      document.getElementById('player-surah-name').textContent = meta.englishName;

      // Zip the ayahs together
      currentVerses = arEdition.ayahs.map((ayah, idx) => ({
        numberInSurah: ayah.numberInSurah,
        textAr: ayah.text,
        textTr: trEdition.ayahs[idx].text,
        audio: auEdition.ayahs[idx].audio
      }));

      // Render verses
      listEl.innerHTML = currentVerses.map((ayah, idx) => `
        <div class="ayah-card" id="ayah-card-${idx}">
          <div class="ayah-header">
            <div class="ayah-number">${ayah.numberInSurah}</div>
            <button class="ayah-play-btn" data-idx="${idx}">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </button>
          </div>
          <div class="ayah-arabic">${ayah.textAr}</div>
          <div class="ayah-turkish">${ayah.textTr}</div>
        </div>
      `).join('');

      // Bind individual play buttons
      document.querySelectorAll('.ayah-play-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.currentTarget.dataset.idx);
          playAyah(idx);
        });
      });

    } catch (e) {
      listEl.innerHTML = `<p class="text-danger" style="text-align:center">Ayetler yüklenemedi.</p>`;
    }
  }

  function playAyah(idx) {
    if (!currentVerses[idx]) return;
    playingIndex = idx;
    const ayah = currentVerses[idx];
    
    audioEl.src = ayah.audio;
    audioEl.play();

    document.getElementById('kuran-player').classList.add('visible');
    document.getElementById('player-ayah-number').textContent = `Ayet ${ayah.numberInSurah}`;

    // Scroll slightly so the ayah is clearly visible
    const card = document.getElementById(`ayah-card-${idx}`);
    if (card) {
      const yOffset = -80; // account for header
      const y = card.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  }

  function pauseAudio() {
    audioEl.pause();
  }

  function updatePlayPauseIcon() {
    if (isPlaying) {
      btnPlayPause.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';
    } else {
      btnPlayPause.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
    }
  }

  function highlightAyahCard(idx) {
    document.querySelectorAll('.ayah-card').forEach(c => c.classList.remove('playing'));
    if (idx !== -1) {
      const activeCard = document.getElementById(`ayah-card-${idx}`);
      if (activeCard && isPlaying) {
        activeCard.classList.add('playing');
      }
    }
  }
}

export function cleanupKuranPage() {
  const audioEl = document.getElementById('kuran-audio');
  if (audioEl) {
    audioEl.pause();
    audioEl.src = '';
  }
}
