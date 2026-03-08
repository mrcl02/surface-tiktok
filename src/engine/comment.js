async function typeComment(page, text) {
    const inputSelector = 'div[data-e2e="comment-input"] div[contenteditable="true"]';
    const postBtn = 'button[data-e2e="comment-post"]';

    await page.waitForSelector(inputSelector);
    await page.focus(inputSelector);

    // Simulasi ketikan manusia (delay acak tiap huruf)
    for (const char of text) {
        await page.keyboard.type(char, { delay: Math.random() * 200 + 100 });
    }

    await page.waitForTimeout(1000);
    await page.click(postBtn);
    console.log(`[Comment] Berhasil posting: "${text}"`);
}

module.exports = { typeComment };