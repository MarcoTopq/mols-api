var scrapeIt = require("scrape-it")
const fs = require('fs');

scrapeIt("https://mangakita.net/daftar-manga/?list", {
    title: "ul li a.series",
    // desc: ".header h2",
    // avatar: {
    //     selector: "img.table-image",
    //     attr: "src"
    // }
}).then(({
    data,
    response
}) => {
    
    console.log(`Status Code: ${response.statusCode}`)
    console.log(data);
    fs.writeFile('./pages.json', JSON.stringify(data), () => { });
})