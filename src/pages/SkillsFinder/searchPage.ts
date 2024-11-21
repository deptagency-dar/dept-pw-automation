import {expect, Page} from "@playwright/test";

export default class SearchPage{

    page: Page;
    readonly searchField;

    constructor(page:Page){
        this.page = page;

        //Locators
        this.searchField = () => this.page.getByTestId('mainSearch').locator('input');

    }

    public async goto(url: string){
        await this.page.goto(url);
    }

    //Actions

    public async search(criteria: string){
        await this.searchField().fill(criteria)
    }
}