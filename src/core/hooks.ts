import { After, AfterAll, AfterStep, Before, Status } from "@cucumber/cucumber";
import { Browser, chromium } from "@playwright/test";
import { finalizeCoverage, saveV8Coverage } from "./coverageHelper";
import { pageFixture } from "./pageFixture";

let browser : Browser;
let worldContext: any;

Before(async function() {
    try {
        worldContext = this; 
        browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });
        const context = await browser.newContext();
        const page = await context.newPage();
        pageFixture.page = page;
        //await pageFixture.page.coverage.startJSCoverage();
    } catch (error) {
        console.log(error)
    }
});

AfterStep(async function({pickle, result}) { 
    if(result.status == Status.FAILED){
        const img = await pageFixture.page.screenshot({path: `./test-results/screenshots/${pickle.name}`, type:"png"});
        await this.attach(img, "image/png");
    }
});

After({timeout:5000},async (scenario) => {
    if(scenario.result?.status == Status.FAILED){
        const img = await pageFixture.page.screenshot({path: `./test-results/screenshots/${scenario.pickle.name}`, type:"png"});
        await worldContext.attach(img, "image/png");
    }
    //await saveV8Coverage(pageFixture.page);
    await pageFixture.page.close();
    await browser.close();
});

AfterAll(async () => {
    //await finalizeCoverage();
});