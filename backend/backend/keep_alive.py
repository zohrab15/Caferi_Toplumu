import threading
import time
import urllib.request
import os
import logging

# Loglama konfiqurasiyası
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def ping_self():
    """Tətbiqin öz-özünə sorğu göndərərək oyaq qalmasını təmin edən funksiya."""
    # Render tərəfindən təqdim olunan URL (və ya manual URL)
    url = os.environ.get('RENDER_EXTERNAL_URL')
    
    if not url:
        logger.warning("RENDER_EXTERNAL_URL mühit dəyişəni tapılmadı. Keep-alive aktiv edilmədi.")
        return
    
    logger.info(f"Keep-alive başladıldı: {url}")
    
    while True:
        try:
            logger.info(f"Pinging {url} to keep alive...")
            # HTTP GET sorğusu göndəririk
            with urllib.request.urlopen(url) as response:
                status = response.getcode()
                logger.info(f"Ping uğurlu: Status {status}")
        except Exception as e:
            logger.error(f"Keep-alive ping xətası: {e}")
        
        # 10 dəqiqə gözləyirik (600 saniyə)
        time.sleep(600)

def start_keep_alive():
    """Arxa planda daemon thread olaraq keep-alive işə salır."""
    # Render-də olduğumuzu yoxlayırıq (və ya URL təyin edilibsə)
    if os.environ.get('RENDER_EXTERNAL_URL'):
        thread = threading.Thread(target=ping_self, daemon=True)
        thread.start()
        logger.info("Keep-awake thread arxa planda işə salındı.")
