const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    // Launch browser
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        viewport: { width: 1280, height: 720 }
    });
    const page = await context.newPage();

    console.log("Navigating to Instagram...");
    try {
        await page.goto('https://www.instagram.com/mimarisanatt/', { waitUntil: 'networkidle', timeout: 30000 });
    } catch (e) {
        console.log("Initial load timeout, proceeding anyway...");
    }

    await page.waitForTimeout(5000);

    // Take a screenshot to see what's on the screen
    await page.screenshot({ path: 'instagram_debug.png' });
    console.log("Saved screenshot to instagram_debug.png");

    // Check URL
    console.log("Current URL:", page.url());

    // Get HTML
    const html = await page.content();
    fs.writeFileSync('instagram_debug.html', html);

    await browser.close();
})();
