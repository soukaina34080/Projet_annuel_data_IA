const axios = require('axios');
const cheerio = require('cheerio');

const scrapeHomePageTitle = async () => {
    const url = "https://www.lacentrale.fr/";
    try {
        // Fetch
        const response = await axios.get(url, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
                "Accept-Language": "en-US,en;q=0.9",
                "Accept-Encoding": "gzip, deflate, br",
                Referer: "https://www.google.com/",
            },
        })


        // Load the response HTML into Cheerio 
        const $ = cheerio.load(response.data);


        // Get the title of the home page
        const pageTitle = $("title").text().trim();
        console.log(pageTitle)

        return pageTitle;

    } catch (error) {
        console.error("Error:", error);

        return false;
    }
};

scrapeHomePageTitle();
