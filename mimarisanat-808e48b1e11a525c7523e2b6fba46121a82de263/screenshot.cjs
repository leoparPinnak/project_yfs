const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3001/', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'C:\\Users\\metin\\.gemini\\antigravity\\brain\\6ff2d4fd-b2a7-49a6-a4e3-8b2a50ed1390\\screenshot.png' });
    await browser.close();
})();
