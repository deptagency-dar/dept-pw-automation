import {Page} from "@playwright/test";

export default class HomePage{

    page: Page;
    readonly profileButton;
    readonly title;
    readonly subtitle;
    readonly requestTimeOffButton;
    readonly checkTimeOffPolicyLink;

    constructor(page:Page){
        this.page = page;

        //Locators
        this.profileButton = () => this.page.getAttribute("Este elemento","No tiene ID");
        this.title = () => this.page.getByText("Time Off",{ exact: true });
        this.subtitle = () => this.page.getByText("It is important to follow the process outlined in the Paid Time Off Policy in order for your vacation to be approved.");
        this.requestTimeOffButton = () => this.page.getByText("Request Time Off", { exact: true });
        this.checkTimeOffPolicyLink = () => this.page.getByText("Check the Paid Time Off Policy");
    }

    public async goto(url: string){
        await this.page.goto(url);
    }

    //Actions

    public async clickRequestTimeOffButton(){
        await this.requestTimeOffButton().click();
    }

    public async clickcheckTimeOffPolicyLink(){
        await this.checkTimeOffPolicyLink().click();
    }

    public async isVisibleTimeOffTitle(){
        return await this.title().isVisible();
    }

    public async isVisibleTimeOffSubtitle(){
        return await this.subtitle().isVisible();
    }

    public async isVisibleRequestTimeOffButton(){
        return await this.requestTimeOffButton().isVisible();
    }

    // Validates the text elements presents on the Home Page
    public async validateTextElements(element:string){
        switch(element){
            case 'title':
                await this.isVisibleTimeOffTitle();
                break;
            case 'subtitle':
                await this.isVisibleTimeOffSubtitle();
                break;
        }
    }
}