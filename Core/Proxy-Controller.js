/**
 * CORE: PROXY CONTROLLER
 * Fokus: Rotasi IP Mobile menggunakan API URL dari provider proxy
 */
const axios = require('axios');

class ProxyController {
    constructor(proxyServer, rotationUrl = null) {
        this.proxyServer = proxyServer; // Format: http://user:pass@host:port
        this.rotationUrl = rotationUrl; // Link khusus dari provider untuk 'Change IP'
    }

    /**
     * Memanggil API provider untuk merotasi jalur IP Mobile
     */
    async rotateIP() {
        if (!this.rotationUrl) {
            console.log("[PROXY] Tidak ada link rotasi yang dikonfigurasi.");
            return true;
        }

        try {
            console.log("[PROXY] Meminta rotasi IP baru ke server...");
            const response = await axios.get(this.rotationUrl);
            
            // Memberikan waktu jeda 10 detik agar IP baru benar-benar aktif
            console.log(`[PROXY] Status API: ${response.statusText}. Menunggu sinkronisasi jaringan...`);
            await new Promise(resolve => setTimeout(resolve, 10000)); 
            
            return true;
        } catch (error) {
            console.error(`[PROXY ERROR] Gagal melakukan rotasi IP: ${error.message}`);
            return false;
        }
    }

    getProxyConfig() {
        return this.proxyServer;
    }
}

module.exports = ProxyController;
