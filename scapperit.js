var scrapeIt = require("scrape-it")
const fs = require('fs');

scrapeIt("https://genshin.gg/characters/Ayaka", {
    title: "h2",
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