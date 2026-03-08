/**
 * LAUNCHER UTAMA (Electron)
 * Fokus: Menjalankan GUI Dashboard dan menghubungkan Tim Marketing dengan sistem Bot.
 */

const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

// Fungsi untuk membuat jendela utama aplikasi
function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 850,
        minWidth: 1000,
        minHeight: 700,
        title: "Surface TikTok - Professional Automation",
        icon: path.join(__dirname, 'assets/icon.ico'), // Opsional: Tambahkan icon jika ada
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true // Set ke false jika ingin mengunci konsol di versi produksi
        },
        backgroundColor: '#0f172a' // Warna latar belakang saat loading (Slate 900)
    });

    // Menghilangkan menu bar standar (File, Edit, dll) agar tampilan seperti software premium
    Menu.setApplicationMenu(null);

    // Memuat file Dashboard HTML dari Root Folder
    win.loadFile('dashboard.html');

    // Event saat jendela ditutup
    win.on('closed', () => {
        console.log("[SYSTEM] Dashboard ditutup oleh pengguna.");
    });
}

// Inisialisasi Electron saat sistem siap
app.whenReady().then(() => {
    console.log("[SYSTEM] Memulai Surface TikTok Launcher...");
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Keluar dari aplikasi saat semua jendela ditutup (kecuali pada MacOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

/**
 * IPC (Inter-Process Communication)
 * Bagian ini digunakan jika Dashboard ingin mengirim perintah ke skrip Core/Modules
 * Contoh: Klik tombol 'Start' di Dashboard akan memicu fungsi di Browser-Engine.js
 */
ipcMain.on('start-task', (event, data) => {
    console.log(`[LAUNCHER] Perintah baru diterima dari Dashboard: ${data.taskType}`);
    // Di sini Anda bisa memanggil class dari Core/Browser-Engine.js
});