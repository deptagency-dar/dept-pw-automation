import {expect, Page} from "playwright/test";

export default class RequestPage{
    page: Page;
    readonly backButton;
    readonly title;
    readonly subtitle;
    readonly requestTimeOffLabel;
    readonly checkTimeOffPolicyLink;

    constructor(page:Page){
        this.page = page;
        
        //Locators
        this.backButton = () => this.page.getAttribute("Este elemento","No tiene ID");
        this.title = () => this.page.getByText("Time Off");
        this.subtitle = () => this.page.getByText("It is important to follow the process outlined in the Paid Time Off Policy in order for your vacation to be approved.");
        this.requestTimeOffLabel = () => this.page.getByText("Request Time Off");
        this.checkTimeOffPolicyLink = () => this.page.getByText("Check the Paid Time Off Policy");
    }

    public async goto(){
        await this.page.goto("https://dept-central-client-mlbp.vercel.app/")
    }

    //Actions

    public async clickcheckTimeOffPolicyLink(){
        await this.checkTimeOffPolicyLink().click();
    }
}