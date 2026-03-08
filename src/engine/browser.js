const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);

async function createBrowserInstance(accountName, proxyUrl) {
    const userDataDir = `./src/accounts/${accountName}`; // Path session unik per akun
    
    const context = await chromium.launchPersistentContext(userDataDir, {
        headless: false, // Biar tim bisa lihat prosesnya
        proxy: { server: proxyUrl },
        viewport: { width: 390, height: 844 }, // Resolusi iPhone 13
        screen: { width: 390, height: 844 },
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
        hasTouch: true,
        isMobile: true,
        deviceScaleFactor: 3,
        permissions: ['geolocation'],
        args: [
            '--disable-blink-features=AutomationControlled',
            '--no-sandbox',
            '--use-fake-ui-for-media-stream'
        ]
    });

    const page = await context.newPage();
    
    // Masking ekstra agar tidak terdeteksi sebagai Headless/Bot
    await page.addInitScript(() => {
        Object.defineProperty(navigator, 'webdriver', { get: () => false });
        window.chrome = { runtime: {} };
    });

    return { context, page };
}

module.exports = { createBrowserInstance };