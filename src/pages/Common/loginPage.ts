import {expect, Page} from "@playwright/test";

export default class LoginPage{

    page: Page;
    readonly usernameInput;
    readonly passwordInput;
    readonly submitButton;

    constructor(page:Page){
        this.page = page;

        //Locators
        this.usernameInput = () => this.page.locator('//*[@id="username"]');
        this.passwordInput = () => this.page.locator('//*[@id="password"]')
        this.submitButton = () => this.page.locator('//html/body/div/main/section/div/div/div/form/div[2]/button')

    }

    public async goto(url: string){
        await this.page.goto(url);
    }

    //Actions

    public async typeUsername(username: string){
        await this.usernameInput().fill(username)
    }

    public async typePassword(password: string){
        await this.passwordInput().fill(password)
    }

    public async clickSubmit(){
        await this.submitButton().click();
    }

    public async isVisible() {
        var millisecondsToWait = 500000;
        setTimeout(function() {
            // Whatever you want to do after the wait
        }, millisecondsToWait);
    }
}