// @param {number} page
// @param {number} kmMin
// @param {number} kmMax
// @returns {Array|boolean} returns an array of values or false (if error)

const axios = require('axios');
const cheerio = require('cheerio');

const scrapePage = async (page = initialPage, kmMin, kmMax) => {
    console.log(`Scraping kmMin: ${kmMin} kmMax: ${kmMax} page: ${page}`);

    const url = `https://www.lacentrale.fr/listing?makesModelsCommercialNames=&mileageMax=${kmMax}&mileageMin=${kmMin}&options=&page=${page}&sortBy=firstOnlineDateDesc`;
    try {
        // Fetch
        const response = await axios({
            url: url,
            method: "GET",
            headers: {
                "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
                "Accept-Language": "en-US,en;q=0.9",
                "Accept-Encoding": "gzip, deflate, br",
                Referer: "https://www.google.com/",
            },
        });

        // Load the response HTML into Cheerio 
        const $ = cheerio.load(response.data);

        // Array for result
        const scrapedContent = [];

        // Promises
        const promises = [];
        // Loop through each car listed
        $(".Vehiculecard_Vehiculecard_vehiculeCard").each((index, element) => {
            promises.push(
                new Promise(async (resolve, reject) => {
                    // Push elements to result
                    const href = $(element).find("a").attr("href");
                    if (!href) {
                        const content = contentScrapper(element, $);
                        scrapedContent.push(content);
                        console.log("Scrapped Content:", content);
                        resolve("Finish");
                    } else {
                        const content = await contentScraperAdditional(page, element, $);
                        scrapedContent.push(content);
                        console.log("Scrapped Content Additional:", content);
                        resolve("Finish");
                    }
                })
            );
        });

        // Wait for all promises to resolve
        await Promise.all(promises);

        return scrapedContent;
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
};

scrapePage(1,1,1)
