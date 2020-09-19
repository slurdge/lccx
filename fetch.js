const { chromium } = require('playwright');

const url = '';
const headless = true;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async() => {
    const browser = await chromium.launch({
        headless: headless
    });
    const page = await browser.newPage();
    await page.goto(url);
    //await page.waitForNavigation({ waitUntil: 'networkidle' });
    await sleep(15000);
    await page.screenshot({ path: `fishing.png` });
    await page.content().then(function(value) {
        console.log('Current page url:', page.url());
    });
    await browser.close();
})();