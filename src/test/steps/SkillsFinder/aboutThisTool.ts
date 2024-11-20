import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from "../../../core/pageFixture";
import skillsfinderSelectors from '../../locators/skillsfinderSelectors';

When('I click on the About This Tool link', {}, async function () {
    await pageFixture.page.locator(skillsfinderSelectors.aboutThisToolLink).click();
});

Then('I should see the following titles:', {}, async function (dataTable) {
    const titles = await pageFixture.page.locator(skillsfinderSelectors.aboutThisToolTitles).allInnerTexts();
    const expectedTitles = dataTable.rawTable.flat();
    expectedTitles.forEach((expectedTitle: string) => {
        expect(titles).toContain(expectedTitle)
    });
 });