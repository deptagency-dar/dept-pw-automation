import { After, AfterAll, AfterStep, Before, Status } from "@cucumber/cucumber";
import { Browser, chromium, firefox, webkit } from "@playwright/test";
import { finalizeCoverage, saveV8Coverage } from "./coverageHelper";
import { pageFixture } from "./pageFixture";

let browser : Browser;
let worldContext: any;

Before(async function(scenario) {
    try {
        // Determine which browser to us
        await console.log(`Starting scenario: ${scenario.pickle.name}`);
        worldContext = this;

        // Determine which browser to use
        let browserType = process.env.BROWSER_TYPE; // Default to chromium if no env variable is set
        await this.parameter('Browser', browserType); // Set browser type as a parameter
        await this.parentSuite(browserType); // Set browser type as a parent suite (optional)
        let isHeadless = process.env.HEADLESS === 'true'; // Check the HEADLESS environment variable

        let launchOptions = {
            headless: isHeadless,
            args: ['--start-maximized'] // Maximized window is only relevant in non-headless mode
        };

        if(browserType){
            switch (browserType.toLowerCase()) {
                case 'firefox':
                    browser = await firefox.launch(launchOptions);
                    break;
                default:
                    browser = await chromium.launch(launchOptions);
                    break;
            }
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
        const screenshotPath = `./allure-reports/screenshots/${pickle.name}.png`;
        const img = await pageFixture.page.screenshot({ path: screenshotPath, type: 'png' });
        await this.attach(img, 'image/png');
        console.log(`Step failed in scenario '${pickle.name}' with error: ${result.exception}`);
    }
});

After(async function () {
    //await saveV8Coverage(pageFixture.page);
    await pageFixture.page.close();
    await browser.close();
});


AfterAll(async () => {
    //await finalizeCoverage();
});