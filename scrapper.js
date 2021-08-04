const { Scraper, Root, OpenLinks, CollectContent, DownloadContent } = require('nodejs-web-scraper');
const fs = require('fs');

(async () => {

    const pages = [];//All ad pages.

    //pageObject will be formatted as {title,phone,images}, becuase these are the names we chose for the scraping operations below.
    //Note that each key is an array, because there might be multiple elements fitting the querySelector.
    //This hook is called after every page finished scraping.
    //It will also get an address argument. 
    const getPageObject = (pageObject,address) => {                  
        pages.push(pageObject)
    }

    const config = {
        baseSiteUrl: `https://samehadaku.sbs/`,
        startUrl: `https://samehadaku.sbs/`,
        filePath: './images/',
        logPath: './logs/'
    }

    const scraper = new Scraper(config);

    const root = new Root();//Open pages 1-10. You need to supply the querystring that the site uses(more details in the API docs).

    const jobAds = new OpenLinks('.phost-show ul li', { name: 'Ad page', getPageObject });//Opens every job ad, and calls the getPageObject, passing the formatted dictionary.

    const phones = new CollectContent('.details-desc a.tel', { name: 'phone' })//Important to choose a name, for the getPageObject to produce the expected results.

    const titles = new CollectContent('li div.dtla h2.entry-title a', { name: 'title' });

    root.addOperation(jobAds);
     jobAds.addOperation(titles);
     jobAds.addOperation(phones);

    await scraper.scrape(root);
    
    fs.writeFile('./pages.json', JSON.stringify(pages), () => { });//Produces a formatted JSON with all job ads.
})()