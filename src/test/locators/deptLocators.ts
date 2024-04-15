export class deptLocators {
    //Dictionary key-value
    static readonly deptPage: { [key: string]: string } = {
        body: 'body',
    }

    //Access the dictionary
    static getElementLocator(elementName: string): string {
            return this.deptPage[elementName];
    }
}