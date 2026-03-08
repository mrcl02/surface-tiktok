/**
 * CORE: ACCOUNT MANAGER
 * Fokus: Manajemen Folder Sesi, Cookies, dan Data Lokal Per Akun
 */
const fs = require('fs');
const path = require('path');

class AccountManager {a
    constructor(basePath) {
        // Default direktori adalah folder /Data/Accounts
        this.basePath = basePath || path.join(__dirname, '../Data/Accounts');
        this.initStorage();
    }

    /**
     * Inisialisasi folder utama jika belum ada
     */
    initStorage() {
        if (!fs.existsSync(this.basePath)) {
            fs.mkdirSync(this.basePath, { recursive: true });
        }
    }

    /**
     * Mendapatkan path spesifik untuk folder satu akun TikTok
     */
    getAccountFolder(accountId) {
        const accountDir = path.join(this.basePath, accountId);
        if (!fs.existsSync(accountDir)) {
            fs.mkdirSync(accountDir, { recursive: true });
        }
        return accountDir;
    }

    /**
     * Menyimpan data pendukung seperti log aktivitas terakhir
     */
    async saveMetadata(accountId, metadata) {
        const filePath = path.join(this.getAccountFolder(accountId), 'metadata.json');
        fs.writeFileSync(filePath, JSON.stringify(metadata, null, 2));
    }
}

module.exports = AccountManager;
