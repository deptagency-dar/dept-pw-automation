import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from "../../../core/pageFixture";
import skillsfinderSelectors from '../../locators/skillsfinderSelectors';

Given('I should see {int} cards on the page', {}, async function (numberOfCards: number) {
    await expect(pageFixture.page.locator(skillsfinderSelectors.cardProfileName)).toHaveCount(numberOfCards);

})

Given('I should be on page {int}', {}, async function (pageNumber: number) {
    await expect(pageFixture.page.locator(skillsfinderSelectors.selectedPage)).toContainText(String(pageNumber));
})

Given('I click on page {int}', {}, async function (pageNumber: number) {
    await pageFixture.page.locator(skillsfinderSelectors.pageLink).getByText(String(pageNumber)).click();
})

Given('I click on the next page', {}, async function () {
    await pageFixture.page.locator(skillsfinderSelectors.nextPageLink).click();
})

Given('I click on the previous page', {}, async function () {
    await pageFixture.page.locator(skillsfinderSelectors.previousPageLink).click();
})

Given('I click on the first page', {}, async function () {
    await pageFixture.page.locator(skillsfinderSelectors.firstPageLink).click();
})

Given('I click on the last page', {}, async function () {
    await pageFixture.page.locator(skillsfinderSelectors.lastPageLink).click();
})

Given('I should be on the last page', {}, async function () {
    
    await pageFixture.page.locator(skillsfinderSelectors.lastPageLink).click();
})