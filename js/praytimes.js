//--------------------- PrayTimes Engine ---------------------
// Based on PrayTimes.org algorithms (praytimes.org)
// Jafari (Shia Ithna-Ashari) method
// Offline calculation - no API dependency
//
// Fajr angle: 16°, Isha angle: 14°, Maghrib angle: 4°
// Midnight: Jafari (Sunset to Fajr)
//------------------------------------------------------------

const DEG = Math.PI / 180;
const RAD = 180 / Math.PI;

// Calculation methods
const METHODS = {
  Jafari: { name: 'Shia Ithna-Ashari', fajrAngle: 16, ishaAngle: 14, maghribAngle: 4, midnight: 'Jafari' },
  ISNA: { name: 'Islamic Society of North America', fajrAngle: 15, ishaAngle: 15, maghribAngle: 0, midnight: 'Standard' },
  MWL: { name: 'Muslim World League', fajrAngle: 18, ishaAngle: 17, maghribAngle: 0, midnight: 'Standard' },
};

// Default settings
const DEFAULT_SETTINGS = {
  imsak: '10 min',   // minutes before fajr
  dhuhr: '0 min',    // minutes after midday
  asr: 'Standard',   // Standard or Hanafi
  highLats: 'NightMiddle', // method for high latitudes
};

// ---- Julian Date ----
function julianDate(year, month, day) {
  if (month <= 2) { year -= 1; month += 12; }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
}

// ---- Sun Position ----
function sunPosition(jd) {
  const D = jd - 2451545.0;
  const g = fixAngle(357.529 + 0.98560028 * D);
  const q = fixAngle(280.459 + 0.98564736 * D);
  const L = fixAngle(q + 1.915 * dsin(g) + 0.020 * dsin(2 * g));
  const e = 23.439 - 0.00000036 * D;
  const RA = darctan2(dcos(e) * dsin(L), dcos(L)) / 15;
  const eqt = q / 15 - fixHour(RA);
  const decl = darcsin(dsin(e) * dsin(L));
  return { declination: decl, equation: eqt };
}

// ---- Mid-day Time ----
function midDay(time, eqt) {
  return fixHour(12 - eqt);
}

// ---- Sun Angle Time ----
function sunAngleTime(angle, time, lat, direction) {
  const decl = sunPosition(jDate + time).declination;
  const noon = midDay(time, sunPosition(jDate + time).equation);
  const t = (1 / 15) * darccos(
    (-dsin(angle) - dsin(decl) * dsin(lat)) / (dcos(decl) * dcos(lat))
  );
  return noon + (direction === 'ccw' ? -t : t);
}

// ---- Asr Time ----
function asrTime(factor, time, lat) {
  const decl = sunPosition(jDate + time).declination;
  const angle = -darctan(1 / (factor + dtan(Math.abs(lat - decl))));
  return sunAngleTime(angle, time, lat, 'cw');
}

// ---- Trig helpers in degrees ----
function dsin(d) { return Math.sin(d * DEG); }
function dcos(d) { return Math.cos(d * DEG); }
function dtan(d) { return Math.tan(d * DEG); }
function darcsin(x) { return Math.asin(x) * RAD; }
function darccos(x) { return Math.acos(x) * RAD; }
function darctan(x) { return Math.atan(x) * RAD; }
function darctan2(y, x) { return Math.atan2(y, x) * RAD; }

function fixAngle(a) { return fix(a, 360); }
function fixHour(a) { return fix(a, 24); }
function fix(a, b) { a = a - b * Math.floor(a / b); return a < 0 ? a + b : a; }

// ---- Global state for calculation ----
let jDate;

// ---- Main calculation ----
function computeTimes(date, lat, lng, timezone, method = 'Jafari') {
  const params = METHODS[method] || METHODS.Jafari;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  jDate = julianDate(year, month, day) - lng / (15 * 24);

  // Initial times (approximate)
  let times = {
    imsak: 5, fajr: 5, sunrise: 6, dhuhr: 12,
    asr: 13, sunset: 18, maghrib: 18, isha: 18
  };

  // Iterate for precision
  for (let i = 0; i < 3; i++) {
    times = computeOnce(times, lat, params);
  }

  // Adjust to timezone
  const offset = timezone - lng / 15;
  for (const key in times) {
    times[key] += offset;
  }

  // Imsak: 10 min before fajr
  times.imsak = times.fajr - 10 / 60;

  // Midnight: Jafari method = Sunset to Fajr
  if (params.midnight === 'Jafari') {
    const diff = timeDiff(times.sunset, times.fajr);
    times.midnight = times.sunset + diff / 2;
  } else {
    const diff = timeDiff(times.sunset, times.sunrise);
    times.midnight = times.sunset + diff / 2;
  }

  return times;
}

function computeOnce(times, lat, params) {
  const sun = (t) => sunPosition(jDate + t);

  return {
    imsak: sunAngleTime(params.fajrAngle + 0.5, times.imsak, lat, 'ccw'),
    fajr: sunAngleTime(params.fajrAngle, times.fajr, lat, 'ccw'),
    sunrise: sunAngleTime(riseSetAngle(), times.sunrise, lat, 'ccw'),
    dhuhr: midDay(times.dhuhr, sun(times.dhuhr).equation),
    asr: asrTime(1, times.asr, lat),  // Standard (Shafi/Jafari)
    sunset: sunAngleTime(riseSetAngle(), times.sunset, lat, 'cw'),
    maghrib: sunAngleTime(params.maghribAngle, times.maghrib, lat, 'cw'),
    isha: sunAngleTime(params.ishaAngle, times.isha, lat, 'cw'),
  };
}

function riseSetAngle() {
  // Standard atmosphere refraction + sun semi-diameter
  return 0.833 + 0.0347 * Math.sqrt(0); // elevation = 0
}

function timeDiff(t1, t2) {
  return fixHour(t2 - t1);
}

// ---- Format time ----
function formatTime(hours) {
  if (isNaN(hours)) return '--:--';
  hours = fixHour(hours);
  const h = Math.floor(hours);
  const m = Math.floor((hours - h) * 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

// ---- Public API ----
export function getPrayerTimes(date, latitude, longitude, timezone) {
  const raw = computeTimes(date, latitude, longitude, timezone, 'Jafari');

  return {
    Fajr: formatTime(raw.fajr),
    Sunrise: formatTime(raw.sunrise),
    Dhuhr: formatTime(raw.dhuhr),
    Asr: formatTime(raw.asr),
    Sunset: formatTime(raw.sunset),
    Maghrib: formatTime(raw.maghrib),
    Isha: formatTime(raw.isha),
    Imsak: formatTime(raw.imsak),
    Midnight: formatTime(raw.midnight),
  };
}

// ---- Hijri Date Conversion ----
// Gregorian-to-Hijri using tabular Islamic calendar
export function getHijriDate(date) {
  const gy = date.getFullYear();
  const gm = date.getMonth() + 1;
  const gd = date.getDate();

  // Gregorian to JD (Meeus)
  let y = gy, m = gm;
  if (m <= 2) { y--; m += 12; }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  const JD = Math.floor(365.25 * (y + 4716)) +
             Math.floor(30.6001 * (m + 1)) +
             gd + B - 1524.5;

  // JD to Hijri (civil tabular calendar)
  const L = Math.floor(JD) - 1948440 + 10632;
  const N = Math.floor((L - 1) / 10631);
  const L2 = L - 10631 * N + 354;
  const J = Math.floor((10985 - L2) / 5316) * Math.floor((50 * L2) / 17719) +
            Math.floor(L2 / 5670) * Math.floor((43 * L2) / 15238);
  const L3 = L2 - Math.floor((30 - J) / 15) * Math.floor((17719 * J) / 50) -
             Math.floor(J / 16) * Math.floor((15238 * J) / 43) + 29;
  const hMonth = Math.floor((24 * L3) / 709);
  const hDay = L3 - Math.floor((709 * hMonth) / 24);
  const hYear = 30 * N + J - 30;

  const monthNames = [
    'Muharrem', 'Safer', 'Rebiülevvel', 'Rebiülahir',
    'Cemaziyelevvel', 'Cemaziyelahir', 'Recep', 'Şaban',
    'Ramazan', 'Şevval', 'Zilkade', 'Zilhicce'
  ];

  const monthNamesAr = [
    'مُحَرَّم', 'صَفَر', 'رَبيع الأوَّل', 'رَبيع الثاني',
    'جُمادى الأولى', 'جُمادى الآخرة', 'رَجَب', 'شَعبان',
    'رَمَضان', 'شَوَّال', 'ذو القِعدة', 'ذو الحِجَّة'
  ];

  return {
    day: Math.max(1, Math.min(30, hDay)),
    month: hMonth,
    year: hYear,
    monthName: monthNames[hMonth - 1] || '',
    monthNameAr: monthNamesAr[hMonth - 1] || '',
  };
}

