import { Given, Then, When } from '@cucumber/cucumber';
import { pageFixture } from "../../core/pageFixture";
import HomePage from '../../pages/homePage';

let homePage:HomePage;

Given('I go to {string}', {timeout:20000}, async function (website: string) {
    await pageFixture.page.goto(website);
    homePage = new HomePage(pageFixture.page);
});

Then('I can see that the title {string} is displayed and matches', {}, async function (title) {
    await homePage.isVisibleTimeOffTitle();
});

Then('I can see the subtitle {string} is displayed and matches', {}, async function (subtitle) {
    await homePage.isVisibleTimeOffSubtitle();
});