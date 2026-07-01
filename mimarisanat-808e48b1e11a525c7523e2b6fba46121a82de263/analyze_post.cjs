const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        viewport: { width: 1280, height: 900 }
    });
    const page = await context.newPage();

    console.log("Navigating to Instagram post...");
    try {
        await page.goto('https://www.instagram.com/mimarisanatt/p/DSmPdhDDDR9/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    } catch (e) {
        console.log("Timeout, continuing...");
    }

    await page.waitForTimeout(5000);

    // Dismiss modal
    await page.keyboard.press('Escape');
    await page.waitForTimeout(2000);

    // ===================== ANALYZE FULL PAGE DOM =====================
    const analysis = await page.evaluate(() => {
        const result = { allImgs: [], allVideos: [], allButtons: [], dotsInfo: null, totalDots: 0 };

        // ALL images on the page
        document.querySelectorAll('img').forEach((img, i) => {
            result.allImgs.push({
                i: i,
                src: img.src ? img.src.substring(0, 150) : 'none',
                alt: img.alt ? img.alt.substring(0, 100) : '',
                width: img.width,
                height: img.height,
                classList: img.className
            });
        });

        // ALL videos on the page
        document.querySelectorAll('video').forEach((vid, i) => {
            result.allVideos.push({
                i: i,
                src: vid.src || 'none',
                poster: vid.poster ? vid.poster.substring(0, 120) : 'none'
            });
        });

        // ALL buttons with aria-label or SVGs inside
        document.querySelectorAll('button').forEach((btn, i) => {
            const label = btn.getAttribute('aria-label') || '';
            if (label || btn.querySelector('svg')) {
                result.allButtons.push({
                    i: i,
                    ariaLabel: label,
                    hasChevron: btn.innerHTML.includes('polygon') || btn.innerHTML.includes('polyline') || btn.innerHTML.includes('path'),
                    boundingRect: btn.getBoundingClientRect()
                });
            }
        });

        // Look for dots (small circles / indicators)
        // On Instagram these are usually tiny circles at the bottom of the carousel
        const dotContainers = document.querySelectorAll('div._acnb, div[style*="display: flex"]');
        // Check for dots based on very small circular child divs
        document.querySelectorAll('div').forEach(div => {
            if (div.children.length > 3 && div.children.length < 25) {
                const children = Array.from(div.children);
                const allSmallCircles = children.every(c => {
                    const rect = c.getBoundingClientRect();
                    return rect.width > 3 && rect.width < 12 && rect.height > 3 && rect.height < 12;
                });
                if (allSmallCircles && children.length > 3) {
                    result.dotsInfo = {
                        totalChildren: children.length,
                        className: div.className,
                        parentTag: div.parentElement ? div.parentElement.tagName : '?'
                    };
                    result.totalDots = children.length;
                }
            }
        });

        return result;
    });

    console.log("\n=== ALL IMAGES ===");
    analysis.allImgs.forEach(img => {
        console.log(`  [${img.i}] ${img.width}x${img.height}  alt="${img.alt}"  src=${img.src}`);
    });

    console.log("\n=== ALL VIDEOS ===");
    analysis.allVideos.forEach(v => console.log(`  [${v.i}] src=${v.src}`));

    console.log("\n=== BUTTONS with SVG ===");
    analysis.allButtons.forEach(b => {
        if (b.hasChevron) {
            console.log(`  [${b.i}] ariaLabel="${b.ariaLabel}" chevron=true rect=(${Math.round(b.boundingRect.x)},${Math.round(b.boundingRect.y)},${Math.round(b.boundingRect.width)}x${Math.round(b.boundingRect.height)})`);
        }
    });

    console.log("\n=== DOTS ===");
    console.log(`  Total dots (slides): ${analysis.totalDots}`);
    if (analysis.dotsInfo) console.log(`  Container class: "${analysis.dotsInfo.className}"`);

    // ===================== CLICK NEXT =====================
    console.log("\n--- Clicking Next (chevron) button ---");
    const nextClicked = await page.evaluate(() => {
        const btns = document.querySelectorAll('button');
        for (const btn of btns) {
            const rect = btn.getBoundingClientRect();
            // The Next button is usually on the right half of the image, vertically centered
            if (btn.querySelector('svg') && rect.x > 400 && rect.y > 200 && rect.y < 600 && rect.width < 50) {
                btn.click();
                return `Clicked button at (${Math.round(rect.x)}, ${Math.round(rect.y)}) ariaLabel="${btn.getAttribute('aria-label')}"`;
            }
        }
        return 'NOT_FOUND';
    });
    console.log("Result:", nextClicked);

    await page.waitForTimeout(2000);

    // Analyze images again after click
    const imgAfter = await page.evaluate(() => {
        const imgs = [];
        document.querySelectorAll('img').forEach((img, i) => {
            if (img.width > 200 && img.height > 200) {  // Only big images (post content)
                imgs.push({
                    i: i,
                    src: img.src ? img.src.substring(0, 150) : 'none',
                    alt: img.alt ? img.alt.substring(0, 100) : '',
                    width: img.width,
                    height: img.height,
                });
            }
        });
        return imgs;
    });

    console.log("\n=== AFTER NEXT CLICK - BIG IMAGES ===");
    imgAfter.forEach(img => {
        console.log(`  [${img.i}] ${img.width}x${img.height}  alt="${img.alt}"  src=${img.src}`);
    });

    await page.screenshot({ path: 'post_analysis_after_next.png', fullPage: false });

    // Click next again
    console.log("\n--- Clicking Next again ---");
    const nextClicked2 = await page.evaluate(() => {
        const btns = document.querySelectorAll('button');
        for (const btn of btns) {
            const rect = btn.getBoundingClientRect();
            if (btn.querySelector('svg') && rect.x > 400 && rect.y > 200 && rect.y < 600 && rect.width < 50) {
                btn.click();
                return `Clicked at (${Math.round(rect.x)}, ${Math.round(rect.y)}) ariaLabel="${btn.getAttribute('aria-label')}"`;
            }
        }
        return 'NOT_FOUND';
    });
    console.log("Result:", nextClicked2);
    await page.waitForTimeout(2000);

    const imgAfter2 = await page.evaluate(() => {
        const imgs = [];
        document.querySelectorAll('img').forEach((img, i) => {
            if (img.width > 200 && img.height > 200) {
                imgs.push({
                    i: i,
                    src: img.src ? img.src.substring(0, 150) : 'none',
                    width: img.width, height: img.height,
                });
            }
        });
        return imgs;
    });
    console.log("\n=== AFTER 2ND NEXT - BIG IMAGES ===");
    imgAfter2.forEach(img => {
        console.log(`  [${img.i}] ${img.width}x${img.height}  src=${img.src}`);
    });

    await browser.close();
    console.log("\nDone!");
})();
