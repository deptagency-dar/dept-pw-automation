import { After, AfterAll, AfterStep, Before, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium, firefox, webkit } from "@playwright/test";
import { finalizeCoverage, saveV8Coverage } from "./coverageHelper";
import { pageFixture } from "./pageFixture";

let browser : Browser;
let context: BrowserContext;
let page;

Before(async function(scenario) {
    try {
        console.log(`Starting scenario: ${scenario.pickle.name}`);
        
        // Determine which browser to use
        const browserType = process.env.BROWSER_TYPE || 'chromium'; // Default to chromium if no env variable is set
        const isHeadless = process.env.HEADLESS === 'true'; // Check the HEADLESS environment variable

        let launchOptions = {
            headless: isHeadless,
            args: ['--start-maximized'] // Maximized window is only relevant in non-headless mode
        };

        let browser;
        switch (browserType.toLowerCase()) {
            case 'firefox':
                browser = await firefox.launch(launchOptions);
                break;
            case 'webkit':
                browser = await webkit.launch(launchOptions);
                break;
            default:
                browser = await chromium.launch(launchOptions);
                break;
        }

        context = await browser.newContext();
        page = await context.newPage();
        pageFixture.page = page;
        //await pageFixture.page.coverage.startJSCoverage();
    } catch (error) {
        console.log(error);
    }
});

AfterStep(async function({pickle, result}) { 
    if(result.status == Status.FAILED){
        const img = await pageFixture.page.screenshot({path: `./test-results/screenshots/${pickle.name}`, type:"png"});
        await this.attach(img, "image/png");
        console.log(`Step failed in scenario '${pickle.name}' with error: ${result.exception}`);
    }
});

After(async function () {
    try {
        if (pageFixture.page && !pageFixture.page.isClosed()) {
            console.log('Closing page...');
            await pageFixture.page.close();
        }
        if (context) {
            console.log('Closing context...');
            await context.close();
        }
    } finally {
        if (browser && browser.isConnected()) {
            console.log('Closing browser...');
            await browser.close();
        }
    }
});

AfterAll(async () => {
    process.exit(0);
    //await finalizeCoverage();
});