import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from "../../../core/pageFixture";
import skillsfinderSelectors from '../../locators/skillsfinderSelectors';


Given('I search on the main field with {string}', {}, async function (criteria: string) {
    await pageFixture.page.locator(skillsfinderSelectors.mainSearchField).fill(criteria);
})

Then('I should see {string} in the profile name', {}, async function (expectedName: string) {
    await expect(pageFixture.page.locator(skillsfinderSelectors.cardProfileName).first()).toHaveText(expectedName);
})

Then('I should see {string} in the profile title', {}, async function (expectedTitle: string) {
    await expect(pageFixture.page.locator(skillsfinderSelectors.cardProfileTitle).first()).toHaveText(expectedTitle);
})

Given('I search by primary skill {string}', {}, async function (skill: string) {
    await pageFixture.page.locator(skillsfinderSelectors.primarySkillSearch).fill(skill);
    await pageFixture.page.locator(skillsfinderSelectors.priamrySkillSearchOptions).getByText(skill).first().click();
})

Then('I should see {string} in the skills panel', {}, async function (skill: string) {
    await expect(pageFixture.page.locator(skillsfinderSelectors.cardSkillsPanel).first()).toContainText(skill);
})

Then('I select skill level {string}', {}, async function (skillLevel: string) {
    await pageFixture.page.locator(skillsfinderSelectors.skillLevelSearch).click();
    await pageFixture.page.locator(skillsfinderSelectors.skillLevelSearchOptions.replace('${level}', skillLevel)).click();
})

Then('I should see {string} with level {string} in the skills panel', {}, async function (skill: string, level: string) {
    const cardSkillWithLevel = await pageFixture.page
                                                    .locator(skillsfinderSelectors.cardSkillsPanel).first()
                                                    .locator(skillsfinderSelectors.cardSkillWithLevel).getByText(skill);
    await expect(cardSkillWithLevel.locator("xpath=../div/span")).toHaveText(level);
})

When('I add an additional skill {string}', {}, async function (skill: string) {
    await pageFixture.page.locator(skillsfinderSelectors.additionalSkillSearch).click();
    await pageFixture.page.locator(skillsfinderSelectors.additionalSkillSearchOptions).getByText(skill).click()
})

Given('I search by communication language {string}', {}, async function (language: string) {
    await pageFixture.page.locator(skillsfinderSelectors.communicationSearch).click();
    await pageFixture.page.locator(skillsfinderSelectors.communicationSearchOptions).getByText(language).click()
}) 

Then('I should see {string} in the communication panel', {}, async function (communication: string) {
    await expect(pageFixture.page.locator(skillsfinderSelectors.cardSkillsPanel).nth(2)).toContainText(communication);
})

Given('I search by team {string}', {}, async function (team: string) {
    await pageFixture.page.locator(skillsfinderSelectors.teamSearch).click();
    await pageFixture.page.locator(skillsfinderSelectors.teamSearchOptions).getByText(team).click()
})

Given('I search by country {string}', {}, async function (country: string) {
    await pageFixture.page.locator(skillsfinderSelectors.countrySearch).click();
    await pageFixture.page.locator(skillsfinderSelectors.countrySearchOptions).getByText(country).click()
})

Given('I search by department {string}', {}, async function (department: string) {
    await pageFixture.page.locator(skillsfinderSelectors.departmentSearch).click();
    await pageFixture.page.locator(skillsfinderSelectors.departmentSearchOptions).getByText(department).first().click()
})

Then('I should see {string} in the profile description', {}, async function (criteria: string) {
    await expect(pageFixture.page.locator(skillsfinderSelectors.cardProfileDescription).first()).toContainText(criteria);
})

When('I clear all filters', {}, async function () {
    await pageFixture.page.locator(skillsfinderSelectors.clearFiltersButton).click();
})

Then('I should see all filters are empty', {}, async function () {
    await expect(pageFixture.page.locator(skillsfinderSelectors.mainSearchField)).toBeEmpty();
    await expect(pageFixture.page.locator(skillsfinderSelectors.primarySkillSearch)).toBeEmpty();
    await expect(pageFixture.page.locator(skillsfinderSelectors.skillLevelSearch)).toHaveText("Unspecified");
    await expect(pageFixture.page.locator(skillsfinderSelectors.additionalSkillSearch)).toBeEmpty();
    await expect(pageFixture.page.locator(skillsfinderSelectors.communicationSearch)).toBeEmpty();
    await expect(pageFixture.page.locator(skillsfinderSelectors.teamSearch)).toBeEmpty();
    await expect(pageFixture.page.locator(skillsfinderSelectors.countrySearch)).toBeEmpty();
    await expect(pageFixture.page.locator(skillsfinderSelectors.departmentSearch)).toBeEmpty();
})

When('I click on the first profile card with name {string}', {}, async function (name: string) {
    await pageFixture.page.locator(skillsfinderSelectors.cardProfileName).getByText(name).first().click();
})

Then('I should see {string} in the profile view header', {}, async function (name: string) {
    await expect(pageFixture.page.locator(skillsfinderSelectors.profileViewHeader)).toContainText(name);
})
