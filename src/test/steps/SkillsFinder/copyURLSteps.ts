import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from "../../../core/pageFixture";
import skillsfinderSelectors from '../../locators/skillsfinderSelectors';

Given('I click the Copy URL button', {}, async function () {
    await pageFixture.page.locator(skillsfinderSelectors.copyURLButton).click();
})

Then('the clipboard text should contain {string} and {string}', {}, async function (text1: string, text2: string) {
    const handle = await pageFixture.page.evaluateHandle(() => navigator.clipboard.readText());
    const clipboardContent = await handle.jsonValue();
    
    expect(clipboardContent).toContain(text1);
    expect(clipboardContent).toContain(text2);
})
