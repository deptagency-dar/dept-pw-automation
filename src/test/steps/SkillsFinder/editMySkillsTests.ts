import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from "../../../core/pageFixture";
import skillsfinderSelectors from '../../locators/skillsfinderSelectors';

Given('I click the "Edit My Skills" button', {}, async function () {
    await pageFixture.page.getByText('Edit my skills').click();
})

Then('I search skill {string} on profile view', {}, async function (skill: string) {
    await pageFixture.page.locator(skillsfinderSelectors.profileViewSearch).fill(skill);
})

Then('I should see {string} in the search results', {}, async function (skill: string) {
    await expect(pageFixture.page.locator(skillsfinderSelectors.skillsContainer)).toContainText(skill);
})

Then('I click on the profile picture', {}, async function () {
    await pageFixture.page.locator(skillsfinderSelectors.profilePicture).click();
})

Then('I click the "Edit Profile" button', {}, async function () {
    await pageFixture.page.locator(skillsfinderSelectors.editProfileButton).click();
})

Then('the edit mode should be enabled', {}, async function () {
    await expect(pageFixture.page.locator(skillsfinderSelectors.profileViewSearch)).toBeEnabled();
})

Then('the edit mode should be disabled', {}, async function () {
    await expect(pageFixture.page.locator(skillsfinderSelectors.profileViewSearch)).toBeHidden();
})
