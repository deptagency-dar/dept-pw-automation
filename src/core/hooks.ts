import { After, AfterAll, AfterStep, Before, Status } from "@cucumber/cucumber";
import { Browser, chromium, firefox, webkit, devices } from "@playwright/test";
import { finalizeCoverage, saveV8Coverage } from "./coverageHelper";
import { pageFixture } from "./pageFixture";
import { exec } from "child_process";
import { channel } from "diagnostics_channel";

let browser : Browser;
let worldContext: any;


Before(async function(scenario) {
    try {
        // Determine which browser to us
        await console.log(`Starting scenario: ${scenario.pickle.name}`);
        worldContext = this;

        // Determine which browser to use
        let browserType = process.env.BROWSER_TYPE; // Default to chromium if no env variable is set
        let isHeadless = process.env.HEADLESS === 'true'; // Check the HEADLESS environment variable

        let launchOptions = {
            headless: isHeadless,
            //args: ['--start-maximized'] // Maximized window is only relevant in non-headless mode
        };

        if(browserType){
            switch (browserType.toLowerCase()) {
                case 'firefox':
                    const firefoxDesktop = devices['Desktop Firefox'];
                    browser = await firefox.launch({
                        ...launchOptions,
                        ...firefoxDesktop,
                    });
                    break;
                case 'chrome':
                    const chromeDesktop = devices['Desktop Chrome'];
                    browser = await chromium.launch({
                        ...launchOptions,
                        ...chromeDesktop,
                    });
                    break;
                case 'edge':
                    const edgeDesktop = devices['Desktop Edge'];
                    browser = await chromium.launch({
                        ...launchOptions,
                        ...edgeDesktop,
                    });
                    break;
                case 'mobilechrome':
                    const Pixel2 = devices['Pixel 2'];
                    browser = await webkit.launch({
                        ...launchOptions,
                        ...Pixel2
                    });
                    break;
                case 'mobilesafari':
                    const iPhone11 = devices['iPhone 11'];
                    browser = await webkit.launch({
                        ...launchOptions,
                        ...iPhone11,
                    });
                    break;
                case 'webkit':
                    const safariDesktop = devices['Desktop Safari'];
                    browser = await webkit.launch({
                        ...launchOptions,
                        ...safariDesktop,
                    });
                    break;
                default:
                    browser = await chromium.launch(launchOptions);
                    break;
            }
        }
        
        const context = await browser.newContext({
            storageState:"./auth.json"
        });
        const page = await context.newPage();
        pageFixture.page = page;
        //await pageFixture.page.coverage.startJSCoverage();
    } catch (error) {
        console.error("Error initializing browser: " + error);
        throw error;
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
    //await saveV8Coverage(pageFixture.page);
    try {
        // Check if browser exists before attempting to close it
        if (browser) {
            await browser.close();
        } else {
            console.log("Browser is not open or already closed.");
        }
    } catch (error) {
        console.error("Error closing browser: " + error);
        throw error; // Rethrow the error to fail the test if closing fails
    }

    try {
        // Check if page and browserContext exist before attempting to close them
        if (pageFixture.page && !pageFixture.page.isClosed()) {
            await pageFixture.page.close();
        }
    } catch (error) {
        console.error("Error closing page and browser context: " + error);
        throw error; // Rethrow the error to fail the test if closing fails
    }
});


AfterAll(async () => {
    try {
        await finalizeCoverage();
        exec("pkill -f playwright");
    } catch (error) {
        console.error("Error during test teardown: " + error);
        throw error; // Relaunch the error to fail the test if closing fails
    }
});