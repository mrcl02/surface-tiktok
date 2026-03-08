/**
 * MODULE: COMMENT ENGINE
 * Fokus: Posting komentar berjadwal (Induk) dan Balas Komentar (Reply)
 */
class CommentEngine {
    constructor(page) {
        this.page = page;
    }

    /**
     * Simulasi mengetik seperti manusia dengan delay antar karakter
     */
    async typeHumanLike(selector, text) {
        await this.page.focus(selector);
        for (const char of text) {
            await this.page.keyboard.type(char, { delay: 100 + Math.random() * 200 });
        }
        await this.page.waitForTimeout(1000);
        await this.page.keyboard.press('Enter');
    }

    /**
     * Posting komentar utama pada video target
     */
    async postMainComment(videoUrl, text) {
        console.log(`[COMMENT] Memproses video: ${videoUrl}`);
        try {
            await this.page.goto(videoUrl, { waitUntil: 'networkidle' });
            
            // Wajib menonton minimal 10 detik sebelum komentar agar tidak dianggap spam
            await this.page.waitForTimeout(10000 + Math.random() * 5000);

            const commentInput = 'div[data-e2e="comment-input"] div[contenteditable="true"]';
            await this.page.waitForSelector(commentInput, { timeout: 15000 });
            
            console.log(`[COMMENT] Mengetik: "${text}"`);
            await this.typeHumanLike(commentInput, text);
            
            return { success: true, timestamp: new Date().toISOString() };
        } catch (error) {
            console.error(`[COMMENT ERROR] Gagal kirim komentar:`, error.message);
            return { success: false, error: error.message };
        }
    }

    /**
     * Membalas komentar orang lain (Reply)
     */
    async replyToUser(targetUsername, replyText) {
        console.log(`[REPLY] Mencari komentar milik @${targetUsername}...`);
        try {
            // Mencari elemen reply berdasarkan username
            const replyBtn = this.page.locator(`text="${targetUsername}"`).locator('..').locator('text="Reply"').first();
            
            if (await replyBtn.isVisible()) {
                await replyBtn.click();
                const replyInput = 'div[data-e2e="comment-reply-input"] div[contenteditable="true"]';
                await this.typeHumanLike(replyInput, replyText);
                console.log(`[REPLY] Berhasil membalas @${targetUsername}`);
                return true;
            }
        } catch (error) {
            console.error(`[REPLY ERROR] Gagal membalas:`, error.message);
        }
        return false;
    }
}

module.exports = CommentEngine;