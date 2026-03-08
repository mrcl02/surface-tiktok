/**
 * CORE: BROWSER ENGINE
 * Fokus: Manipulasi Fingerprint, WebGL, dan Touch Emulation (Playwright Stealth)
 */
const { chromium } = require('playwright');

class BrowserEngine {
    constructor(config = {}) {
        // Konfigurasi emulasi perangkat mobile (iPhone 13 Pro style)
        this.viewport = config.viewport || { width: 390, height: 844 };
        this.userAgent = config.userAgent || 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1';
    }

    /**
     * Membuat instance browser dengan "Persistent Context"
     * Menambahkan manipulasi WebGL dan Fingerprint agar tidak terdeteksi Bot.
     */
    async createInstance(userDataDir, proxyConfig = null) {
        console.log(`[ENGINE] Inisialisasi Browser Stealth di: ${userDataDir}`);
        
        return await chromium.launchPersistentContext(userDataDir, {
            headless: false, // GUI aktif agar tim marketing bisa melihat prosesnya
            viewport: this.viewport,
            userAgent: this.userAgent,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            proxy: proxyConfig ? { server: proxyConfig } : undefined,
            args: [
                '--disable-blink-features=AutomationControlled', // Sembunyikan navigator.webdriver
                '--use-gl=desktop', // Manipulasi WebGL: Menggunakan profil GPU desktop asli
                '--disable-web-security',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-features=IsolateOrigins,site-per-process',
                '--font-render-hinting=none'
            ]
        });
    }
}

module.exports = BrowserEngine;
