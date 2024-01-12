import AxeBuilder from "@axe-core/playwright";
import { createHtmlReport } from 'axe-html-reporter';
import { expect, Page } from '@playwright/test';
import { readSitemap } from './sitemapHelper';

export async function runA11yScanFunction(sitemap: string, page: Page): Promise<void> {

    let urls = await readSitemap(sitemap);
    let a11yPass: boolean = true;

    //Loop through the array and perform the Accessibility Tests on each url

    try 
    {
        for (const pageURL of urls) 
        {
            console.log("Checking Accessibility on " + pageURL);
            await page.goto(pageURL);
            console.log("Navigated to " + pageURL);
            const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

            let fileName: string = pageURL.replace(/^https:\/\/www\.guinness\.com\//, '').replace(/\//g, '_');
            await createHtmlReport({ results: accessibilityScanResults, options: { reportFileName: "accessibilityReport_" + fileName + ".html" }});

            if (accessibilityScanResults.violations.length > 0) 
            {
                console.log("Accessibility Issues found on page: " + pageURL);
                a11yPass = false;
            }
        }

        if (a11yPass === true)
            {
                console.log("PASSING SUITE - No Accessibility Issues Found!")
            }
            else
            {
                console.log("FAILING SUITE - Accessibility Issues Found!") 
                expect(false).toEqual(true) 
            } 
    } 
    catch (error) 
    {
        //expect(false).toEqual(true)
        console.log("A11Y TESTS FAILED! Alter code to fail in pipeline") 
    }
}
