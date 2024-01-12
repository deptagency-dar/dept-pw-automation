import axios from 'axios';
import { load } from 'cheerio';

export async function readSitemap(sitemapUrl: string): Promise<string[]> {
    const urls: string[] = [];

    try {
        const response = await axios.get(sitemapUrl);
        const sitemapXml = response.data;
    
        const $ = load(sitemapXml, { xmlMode: true });
        const locElements = $('loc');

        if (locElements.length === 0) {
            console.error('No <loc> elements found in the sitemap.');
            return [];
        }

        locElements.each((index, element) => {
            urls.push($(element).text());
        });

        console.log('Total URLs:', urls.length);
        return urls;
    } catch (error) {
        console.error('Could not read sitemap:', error);
        return [];
    }
}

export async function replaceBaseURL(originalURLs: string[], newBase: string): Promise<string[]> {
    return originalURLs.map(url => {
        let parts = new URL(url);
        return newBase + parts.pathname;
    });
}