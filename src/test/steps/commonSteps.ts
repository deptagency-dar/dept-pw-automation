import { Given, Then, When } from '@cucumber/cucumber';
import assert from "assert";
import { pageFixture } from "../../core/pageFixture";
import rawConfig from '../../core/config.json';
import { AppConfig } from '../../core/config.types';
import { deptLocators } from '../locators/deptLocators';
import LoginPage from '../../pages/Common/loginPage';

const environment = process.env.ENV || 'production'; // Default to production if ENV is not set
const defaultParams = rawConfig.defaultAgreementParameter;
const config: AppConfig = rawConfig as AppConfig;
let loginPage:LoginPage;
const username = process.env.username || 'test';
const password = process.env.password || 'test';

Given('I navigate to {string}', {timeout:20000}, async function (website: string) {
    await pageFixture.page.goto(website);
});

Then('I am redirected to {string}',{}, async function (expected: string) {
    await pageFixture.page.waitForFunction(
        `window.location.href === "${expected.replace(/"/g, '\\"')}"`,
        { timeout: 4000 } // Timeout after 10000 ms, for example
      );
    assert.strictEqual(await pageFixture.page.url(), expected);
});

When('I navigate to relative path {string}',{}, async function (relativePath: string) {
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

Then('I can see that the element {string} is displayed', {}, async function (element:string) {
    await pageFixture.page.locator(await deptLocators.getElementLocator(element)).isVisible();
});

When('I fill the element {string} with the text {string}', {}, async function (element:string, text:string) {
    await pageFixture.page.locator(await deptLocators.getElementLocator(element)).fill(text);
});

When('I click the element that has the value {string} by {string}',{}, async function (value: string, type: string) {
    switch (type){
        case 'label':
            await pageFixture.page.getByLabel(value).click();
            break;
        case 'placeholder':
            pageFixture.page.getByPlaceholder(value).click();
            break;
        case 'text':
            await pageFixture.page.getByText(value).click();
            break;
        case 'title':
            await pageFixture.page.getByTitle(value).click();
            break;
        case 'altText':
            await pageFixture.page.getByAltText(value).click();
            break;
    }
});

Then('I see that the element with value {string} by {string} is visible',{}, async function (value: string, type: string) {
    switch (type){
        case 'label':
            await pageFixture.page.getByLabel(value).isVisible();
            break;
        case 'placeholder':
            pageFixture.page.getByPlaceholder(value).isVisible();
            break;
        case 'text':
            await pageFixture.page.getByText(value).isVisible();
            break;
        case 'title':
            await pageFixture.page.getByTitle(value).isVisible();
            break;
        case 'altText':
            await pageFixture.page.getByAltText(value).isVisible();
            break;
    }
});

When('I click element {string} by role {string}',{}, async function (element: any, role: string) {
    await pageFixture.page.getByRole(element, { name: role }).click();
});

When('I select the element {string}', {}, async function (element: string) {
    let locator = await deptLocators.getElementLocator(element);
    await pageFixture.page.locator(locator).click();
});

When('I type {string}',{}, async function(text: string) {
    await pageFixture.page.keyboard.type(text);
})

When('I check the element {string}',{}, async function(element: string) {
    let locator = await deptLocators.getElementLocator(element);
    // Select the checkbox by its name attribute
    const checkbox = await pageFixture.page.$(locator);
    if(checkbox){
        await checkbox.check();
    } else {
        throw 'Checkbox not found';
    }
})

Then('Sign in with test user', {}, async function () {
    loginPage = new LoginPage(pageFixture.page)
    await loginPage.typeUsername(username);
    await loginPage.typePassword(password);
    await loginPage.clickSubmit();
});
