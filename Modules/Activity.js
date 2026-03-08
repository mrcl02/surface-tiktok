/**
 * MODULE: ACTIVITY
 * Fokus: Simulasi menonton video (30-60 detik) dan memberikan Like secara acak
 */
class Activity {
    constructor(page) {
        this.page = page;
    }

    /**
     * Logika menonton video secara organik (Human-Like)
     * @param {number} min - Durasi minimal nonton (detik)
     * @param {number} max - Durasi maksimal nonton (detik)
     */
    async watchAndEngage(min = 30, max = 60) {
        const duration = Math.floor(Math.random() * (max - min + 1) + min);
        console.log(`[ACTIVITY] Menonton video selama ${duration} detik agar terbaca organik...`);

        const startTime = Date.now();
        while (Date.now() - startTime < duration * 1000) {
            // Peluang 10% untuk memberikan Like (Like acak agar tidak mencurigakan)
            if (Math.random() > 0.9) {
                try {
                    const likeBtn = this.page.locator('button[data-e2e="like-icon"]').first();
                    if (await likeBtn.isVisible()) {
                        await likeBtn.click();
                        console.log(`[ACTIVITY] Memberikan Like pada video.`);
                    }
                } catch (e) {
                    // Abaikan jika gagal klik like
                }
            }
            
            // Tunggu sebentar sebelum interaksi berikutnya
            await this.page.waitForTimeout(5000 + Math.random() * 5000);
        }
    }

    /**
     * Scroll perlahan di FYP (For You Page)
     */
    async simulateBrowsing(scrolls = 5) {
        console.log(`[ACTIVITY] Scrolling beranda secara acak...`);
        for (let i = 0; i < scrolls; i++) {
            await this.page.mouse.wheel(0, 300 + Math.random() * 700);
            await this.page.waitForTimeout(2000 + Math.random() * 3000);
        }
    }
}

module.exports = Activity;