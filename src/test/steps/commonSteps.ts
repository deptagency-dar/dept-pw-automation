import { Given, Then, When } from '@cucumber/cucumber';
import assert from "assert";
import { pageFixture } from "../../core/pageFixture";
import rawConfig from '../../core/config.json';
import { AppConfig } from '../../core/config.types';
import { deptLocators } from '../locators/deptLocators';

const environment = process.env.ENV || 'production'; // Default to production if ENV is not set
const defaultParams = rawConfig.defaultAgreementParameter;
const config: AppConfig = rawConfig as AppConfig;


Given('I navigate to the {string} website with locale {string}', {timeout:20000}, async function (website: string, locale: string) {
    const websiteConfig = config.websites[website];

    if (!websiteConfig) {
        throw new Error('Website configuration not found.');
    }

    const baseUrl = websiteConfig[environment];
    if (!baseUrl) {
        throw new Error('Environment URL not found.');
    }
    const fullUrl = `${baseUrl}/${locale}/${defaultParams}`;
    await pageFixture.page.goto(fullUrl);
});

Given('I navigate to {string}', {timeout:20000}, async function (website: string) {
    await pageFixture.page.goto(website);
});

Then('I am redirected to {string}',{timeout:10000}, async function (expected: string) {
    await pageFixture.page.waitForFunction(
        `window.location.href === "${expected.replace(/"/g, '\\"')}"`,
        { timeout: 4000 } // Timeout after 10000 ms, for example
      );
    assert.strictEqual(await pageFixture.page.url(), expected);
});

When('I navigate to the {string}',{timeout:10000}, async function (relativePath: string) {
    const currentUrl = new URL(await pageFixture.page.url());

    // Ensure the correct number of slashes between segments
    let newPath = currentUrl.pathname;
    if (!newPath.endsWith('/')) {
        newPath += '/';
    }
    if (relativePath.startsWith('/')) {
        relativePath = relativePath.substring(1);
    }
    newPath += relativePath;

    // Construct the new URL without any query parameters
    const newUrl = `${currentUrl.origin}${newPath}`;
    await pageFixture.page.goto(newUrl);
});

Then('I can see that the element {string} is displayed', {timeout:10000}, async function (element:string) {
    await pageFixture.page.locator(await deptLocators.getElementLocator(element)).isVisible();
});

