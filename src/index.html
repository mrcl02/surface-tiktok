const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { chromium } = require('playwright');

let mainWindow;

// --- FUNGSI SIMULASI MANUSIA (MODUL C PDF) ---
async function humanTyping(page, selector, text) {
    await page.focus(selector);
    for (const char of text) {
        // Delay acak 150ms - 300ms per huruf (Sesuai PDF)
        await page.keyboard.type(char, { delay: Math.random() * (300 - 150) + 150 });
    }
}

// --- ENGINE UTAMA: THE ACTOR ---
async function runAutomation(data) {
    // Folder Session (Modul 1: Persistent Context)
    const userDataDir = path.join(app.getPath('userData'), 'sessions', data.accountId);
    
    const browser = await chromium.launchPersistentContext(userDataDir, {
        headless: false,
        viewport: { width: 375, height: 667 }, // Emulasi Mobile
        userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1",
        args: [
            '--disable-blink-features=AutomationControlled',
            '--no-sandbox'
        ]
    });

    const page = browser.pages()[0] || await browser.newPage();

    try {
        // 1. Scrolling Organik di FYP
        await page.goto('https://www.tiktok.com/foryou');
        console.log("Scrolling FYP...");
        await page.waitForTimeout(3000);
        await page.mouse.wheel(0, 1000);
        await page.waitForTimeout(2000);

        // 2. Buka Video Target
        await page.goto(data.videoUrl);
        
        // 3. Nonton (30-60 detik)
        const watchDuration = Math.floor(Math.random() * (60000 - 30000) + 30000);
        console.log(`Watching for ${watchDuration/1000}s...`);
        await page.waitForTimeout(watchDuration);

        // 4. Like
        const likeBtn = page.locator('button[data-e2e="like-icon"]').first();
        if (await likeBtn.isVisible()) await likeBtn.click();

        // 5. Ghost Writer (The Chain)
        const commentBox = 'div[data-e2e="comment-input"] div[contenteditable="true"]';
        await page.waitForSelector(commentBox);
        await humanTyping(page, commentBox, data.commentText);
        
        // Klik Post
        await page.click('button[data-e2e="comment-post"]');
        console.log("Task Completed Successfully.");

    } catch (error) {
        console.error("Automation Error (Check Proxy/Connection):", error.message);
    } finally {
        await page.waitForTimeout(5000);
        await browser.close();
    }
}

// --- WINDOW MANAGEMENT ---
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 850,
        title: "Surface Tiktok - Premium Automation",
        backgroundColor: '#ffffff',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    mainWindow.loadFile('src/index.html');
}

ipcMain.on('start-task', (event, taskData) => {
    runAutomation(taskData);
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});