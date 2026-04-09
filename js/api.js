// API Helper functionality for connecting frontend to Django Backend

// Canlı sunucu adresi oluşturulduğunda buradaki production linkini değiştireceksin
const PROD_API_URL = 'https://ehlibeyt-api.onrender.com';
const DEV_API_URL = 'http://localhost:8000';

const API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') 
    ? `${DEV_API_URL}/api` 
    : `${PROD_API_URL}/api`;

// Utility to get auth headers
function getHeaders(requireAuth = false) {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (requireAuth) {
    const token = localStorage.getItem('access_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
}

// Global API Fetch wrapper
export async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    method: options.method || 'GET',
    headers: getHeaders(options.requireAuth),
    ...options
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    // Auth token expiration logic
    if (response.status === 401 && options.requireAuth) {
      // Refresh logic can be added here, currently just force logout
      logout();
      return { _error: true, message: 'Oturum süresi doldu' };
    }
    
    if (!response.ok) {
      return { _error: true, ...data, status: response.status };
    }
    
    return data;
  } catch (err) {
    console.error('API Error:', err);
    return { _error: true, message: 'Bağlantı xətası!' };
  }
}

// Authentication Methods
export async function login(email, password) {
  const res = await apiFetch('/auth/login/', {
    method: 'POST',
    body: { email, password }
  });
  
  if (!res._error) {
    localStorage.setItem('access_token', res.access);
    localStorage.setItem('refresh_token', res.refresh);
    
    // JWT Parsing in frontend
    try {
      const payload = JSON.parse(atob(res.access.split('.')[1]));
      localStorage.setItem('user_email', payload.email);
      localStorage.setItem('user_role', payload.role);
    } catch(e) {}
    
    return true;
  }
  return false;
}

export async function googleLogin(credential) {
  const res = await apiFetch('/auth/login/google/', {
    method: 'POST',
    body: { credential }
  });

  if (!res._error) {
    localStorage.setItem('access_token', res.access);
    localStorage.setItem('refresh_token', res.refresh);

    // JWT payload parse
    try {
      const payload = JSON.parse(atob(res.access.split('.')[1]));
      localStorage.setItem('user_email', payload.email);
      localStorage.setItem('user_role', payload.role);
    } catch (e) {}

    return { success: true, created: res.created };
  }
  return { success: false };
}

export async function register(data) {
  return await apiFetch('/auth/register/', {
    method: 'POST',
    body: data
  });
}

export function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_email');
  localStorage.removeItem('user_role');
  window.dispatchEvent(new Event('authChange'));
}

export function isLoggedIn() {
  return !!localStorage.getItem('access_token');
}

// Visual Notification Toast System
export function showToast(message, type = 'info', duration = 3000) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  
  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️'
  };

  toast.innerHTML = `
    <span class="toast__icon">${icons[type] || '🔔'}</span>
    <span class="toast__message">${message}</span>
    <button class="toast__close">✕</button>
  `;

  container.appendChild(toast);

  const closeToast = () => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-20px)';
    setTimeout(() => toast.remove(), 300);
  };

  toast.querySelector('.toast__close').addEventListener('click', closeToast);
  
  setTimeout(closeToast, duration);
}
