const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    // Launch browser
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    console.log("Navigating to Instagram...");
    try {
        await page.goto('https://www.instagram.com/mimarisanatt/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    } catch (e) {
        console.log("Initial load timeout, proceeding anyway...");
    }

    // Wait a bit and try to dismiss login modal if it appears
    await page.waitForTimeout(4000);
    try {
        console.log("Attempting to close login modal...");
        // Press Escape multiple times
        await page.keyboard.press('Escape');
        await page.waitForTimeout(500);
        await page.keyboard.press('Escape');
        await page.waitForTimeout(1000);

        // Also try clicking the generic close button SVG if present
        const closeBtn = page.locator('div[role="button"]:has(svg), button:has(svg)').filter({ hasText: '' }).first();
        if (await closeBtn.isVisible({ timeout: 1000 })) {
            await closeBtn.click();
            await page.waitForTimeout(1000);
        }
    } catch (e) {
        console.log("No login modal or couldn't close it.");
    }

    console.log("Scrolling to load all posts...");
    // Scroll down multiple times to load more posts
    for (let i = 0; i < 7; i++) {
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(2000);
    }

    // Get all post links
    const postLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[href^="/p/"]'));
        return links.map(a => a.href);
    });

    // Deduplicate logic
    const uniquePostLinks = [...new Set(postLinks)];
    console.log(`Found ${uniquePostLinks.length} posts.`);

    const results = [];

    // Loop through each post by navigating properly (to avoid modal issues and ensure videos load)
    for (let i = 0; i < uniquePostLinks.length; i++) {
        const postUrl = uniquePostLinks[i];
        console.log(`\nProcessing post ${i + 1}/${uniquePostLinks.length}: ${postUrl}`);

        try {
            await page.goto(postUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
        } catch (e) {
            console.log("Timeout on post load, continuing...");
        }
        await page.waitForTimeout(4000); // give it time to load video/images

        // Close modal if it pops up on the individual page
        try {
            const closeBtn = page.locator('div[role="dialog"] button:has-text("Kapat"), div[role="dialog"] button:has-text("Close"), svg[aria-label="Kapat"], svg[aria-label="Close"]').first();
            if (await closeBtn.isVisible({ timeout: 1000 })) {
                await closeBtn.click();
                await page.waitForTimeout(1000);
            }
        } catch (e) { }

        const postData = {
            caption: "",
            mediaUrls: []
        };

        // Extract caption
        try {
            const captionLoc = page.locator('h1, span[dir="auto"]').first();
            if (await captionLoc.isVisible()) {
                postData.caption = await captionLoc.innerText();
            }
        } catch (e) {
            console.log("Could not extract caption:", e.message);
        }

        let hasNext = true;
        let attempt = 0;

        while (hasNext && attempt < 10) {
            attempt++;

            // Check for video first
            const videoSrcs = await page.evaluate(() => {
                const srcs = [];
                document.querySelectorAll('video').forEach(vid => {
                    if (vid.src && !vid.src.startsWith('blob:')) srcs.push(vid.src);
                    vid.querySelectorAll('source').forEach(src => {
                        if (src.src && !src.src.startsWith('blob:')) srcs.push(src.src);
                    });
                });
                return srcs;
            });

            // Check for images
            const imageSrcs = await page.evaluate(() => {
                const srcs = [];
                // Instagram typically sets object-fit on main post media
                document.querySelectorAll('img[style*="object-fit"]').forEach(img => {
                    if (img.src && !img.src.includes('profile_pic_url_hd')) { // ignore profile pic
                        srcs.push(img.src);
                    }
                });
                return srcs;
            });

            const newMedia = [...videoSrcs, ...imageSrcs];
            newMedia.forEach(url => {
                if (url && !postData.mediaUrls.includes(url) && !url.startsWith('blob:')) {
                    postData.mediaUrls.push(url);
                }
            });

            // Check for next button (carousel)
            hasNext = false;
            try {
                // Usually indicated by an aria-label "Next" or "İleri"
                const nextBtn = page.locator('button[aria-label="Next"], button[aria-label="İleri"], div[aria-label="Next"], div[aria-label="İleri"], .coreSpriteRightChevron').first();
                if (await nextBtn.isVisible({ timeout: 1000 })) {
                    await nextBtn.click();
                    await page.waitForTimeout(1500); // wait for slide transition
                    hasNext = true;
                }
            } catch (e) {
                // No next button found
            }
        }

        console.log(`Extracted caption: ${postData.caption.substring(0, 30)}... and ${postData.mediaUrls.length} media URLs`);
        results.push(postData);
    }

    fs.writeFileSync('data_full.json', JSON.stringify(results, null, 2));
    console.log("\nData saved to data_full.json");

    await browser.close();
})();
