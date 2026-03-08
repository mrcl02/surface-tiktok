/**
 * UPDATER: AUTO UPDATE
 * Fokus: Sinkronisasi ke Server/Git untuk pembaharuan fitur otomatis
 */
const { exec } = require('child_process');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

class AutoUpdater {
    constructor(repoUrl) {
        this.repoUrl = repoUrl;
        this.versionFile = path.join(__dirname, '../version.json');
    }

    /**
     * Memeriksa apakah ada versi baru di server
     */
    async checkForUpdates() {
        console.log("[UPDATER] Memeriksa pembaharuan fitur...");
        try {
            // Contoh mengambil manifest versi dari server/github
            const response = await axios.get(`${this.repoUrl}/raw/main/version.json`);
            const remoteVersion = response.data.version;
            const localVersion = JSON.parse(fs.readFileSync(this.versionFile, 'utf8')).version;

            if (remoteVersion !== localVersion) {
                console.log(`[UPDATER] Versi baru ditemukan: ${remoteVersion}. Memulai update...`);
                return await this.performUpdate();
            }
            console.log("[UPDATER] Sistem sudah menggunakan versi terbaru.");
            return false;
        } catch (error) {
            console.error("[UPDATER ERROR] Gagal memeriksa update:", error.message);
            return false;
        }
    }

    /**
     * Melakukan Git Pull untuk memperbarui kode sumber
     */
    async performUpdate() {
        return new Promise((resolve, reject) => {
            exec('git pull origin main', (error, stdout, stderr) => {
                if (error) {
                    console.error(`[UPDATER ERROR] Gagal melakukan pull: ${error.message}`);
                    return reject(error);
                }
                console.log(`[UPDATER SUCCESS] Sistem diperbarui: ${stdout}`);
                resolve(true);
            });
        });
    }
}

module.exports = AutoUpdater;