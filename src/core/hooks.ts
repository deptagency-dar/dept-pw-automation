import { After, AfterAll, AfterStep, Before, Status } from "@cucumber/cucumber";
import { Browser, chromium, firefox, webkit, devices, BrowserContext } from "@playwright/test";
import { finalizeCoverage, saveV8Coverage } from "./coverageHelper";
import { pageFixture } from "./pageFixture";
import { exec } from "child_process";

let browser : Browser;
let worldContext: any;
let browserContext: BrowserContext | undefined;

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
            args: ['--start-maximized'] // Maximized window is only relevant in non-headless mode
        };

        if(browserType){
            switch (browserType.toLowerCase()) {
                case 'firefox':
                    browser = await firefox.launch(launchOptions);
                    break;
                case 'edge':
                    browser = await chromium.launch({...launchOptions, channel: 'msedge'});
                    break;
                case 'mobilechrome':
                    const Pixel2 = devices['Pixel 2'];
                    browser = await chromium.launch(launchOptions);
                    browserContext = await browser.newContext({
                        ...Pixel2,
                    });
                    break;
                case 'mobilesafari':
                    const iPhone11 = devices['iPhone 11'];
                    browser = await webkit.launch({
                        ...launchOptions,
                        ...iPhone11,
                    });
                    console.log(iPhone11);
                case 'webkit':
                    browser = await webkit.launch(launchOptions);
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
        const img = await pageFixture.page.screenshot({path: `./test-results/screenshots/${pickle.name}`, type:"png"});
        await this.attach(img, "image/png");
        console.log(`Step failed in scenario '${pickle.name}' with error: ${result.exception}`);
    }
});

After(async function () {
    //await saveV8Coverage(pageFixture.page);
    await pageFixture.page.close();
    await browserContext?.close();
    await browser.close();
});


AfterAll(async () => {
    await finalizeCoverage();
    // Cerrar el proceso de Playwright
    exec("pkill -f playwright");
});