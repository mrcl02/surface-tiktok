const axios = require('axios');
const fs = require('fs');
const { exec } = require('child_process');

const VERSION_FILE = './version.json';
const UPDATE_SERVER_URL = 'https://api.tokoanda.com/updates'; // URL server kamu

async function checkUpdate() {
    try {
        const localVersion = JSON.parse(fs.readFileSync(VERSION_FILE, 'utf8')).version;
        const response = await axios.get(`${UPDATE_SERVER_URL}/check?v=${localVersion}`);

        if (response.data.hasUpdate) {
            console.log("Update ditemukan! Mengunduh file terbaru...");
            const newCode = await axios.get(response.data.downloadUrl);
            
            // Overwrite file engine utama
            fs.writeFileSync('./src/main.js', newCode.data);
            
            // Update file version.json
            fs.writeFileSync(VERSION_FILE, JSON.stringify({ version: response.data.newVersion }));
            console.log("Update selesai. Menjalankan aplikasi...");
        } else {
            console.log("Versi sudah terbaru.");
        }
        
        // Jalankan aplikasi utama
        exec('node ./src/main.js', (err, stdout, stderr) => {
            if (err) console.error(err);
            console.log(stdout);
        });

    } catch (error) {
        console.error("Gagal update, menjalankan versi lokal...");
        exec('node ./src/main.js');
    }
}

checkUpdate();