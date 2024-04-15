import { After, AfterAll, AfterStep, Before, Status } from "@cucumber/cucumber";
import { Browser, chromium, firefox, webkit } from "@playwright/test";
import { finalizeCoverage, saveV8Coverage } from "./coverageHelper";
import { pageFixture } from "./pageFixture";

let browser : Browser;
let worldContext: any;

Before(async function(scenario) {
    try {
        console.log(`Starting scenario: ${scenario.pickle.name}`);
        worldContext = this;
        
        // Determine which browser to use
        const browserType = process.env.BROWSER_TYPE || 'chromium'; // Default to chromium if no env variable is set

        let browser;
        switch (browserType.toLowerCase()) {
            case 'firefox':
                browser = await firefox.launch({ headless: false, args: ['--start-maximized'] });
                break;
            case 'webkit':
                browser = await webkit.launch({ headless: false, args: ['--start-maximized'] });
                break;
            default:
                browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });
                break;
        }

        const context = await browser.newContext();
        const page = await context.newPage();
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

After({timeout:5000},async (scenario) => {
    // Close the page and browser if they are open
    if (pageFixture.page && !pageFixture.page.isClosed()) {
        await pageFixture.page.close();
    }
    if (browser && browser.isConnected()) {
        await browser.close();
    }
});

AfterAll(async () => {
    //await finalizeCoverage();
});