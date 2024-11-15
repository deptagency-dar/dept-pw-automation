import { Given, Then, When } from '@cucumber/cucumber';
import { pageFixture } from "../../../core/pageFixture";
import SearchPage from '../../../pages/SkillsFinder/searchPage';

let searchPage:SearchPage;

Then('Search for {string}', {}, async function (criteria: string) {
    searchPage = new SearchPage(pageFixture.page);
    await searchPage.search(criteria);
})