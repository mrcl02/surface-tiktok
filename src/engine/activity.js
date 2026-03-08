async function watchAndLike(page, url, durationInSeconds) {
    console.log(`[Activity] Menuju ke: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });

    // Simulasi menonton (random scroll sedikit-sedikit)
    const endTime = Date.now() + (durationInSeconds * 1000);
    while (Date.now() < endTime) {
        await page.mouse.wheel(0, Math.floor(Math.random() * 50));
        await page.waitForTimeout(Math.random() * 3000 + 2000); // Jeda random
    }

    // Klik Like (Gunakan Selector yang paling stabil)
    try {
        const likeBtn = page.locator('button[data-e2e="like-icon"]').first();
        if (await likeBtn.isVisible()) {
            await likeBtn.click();
            console.log("[Activity] Video Liked.");
        }
    } catch (e) {
        console.log("[Activity] Gagal Like/Sudah di-like.");
    }
}

module.exports = { watchAndLike };