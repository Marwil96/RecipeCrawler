var express = require("express");
const puppeteer = require('puppeteer');
const koket  = require('./WebsiteTemplates/koket.js')
const ica = require("./WebsiteTemplates/ica.js");
const coop = require("./WebsiteTemplates/coop.js");
const axios = require("axios");
const cheerio = require("cheerio");
const arla = require("./WebsiteTemplates/arla.js");
const recept_se = require("./WebsiteTemplates/recept_se.js");
// const url = "https://www.ica.se/recept/svart-pizza-med-champinjoner-725666/"; 
// https://www.ica.se/recept/svart-pizza-med-champinjoner-725666/
// https://www.koket.se/spaghetti-med-morot-och-timjansas

const crawler = express.Router();
crawler.get("/api/world51", (req, res) => res.send("Yo World!"));


crawler.post("/api/save-recipe", async (req, res) => { 
  console.log('URL', req.body.url)
  const data = await WebsiteData(req.body.url)
  console.log(data)
  res.json(data)  
})

const WebsiteData = (url) => 
fetchData(url).then( async (res) => {
  const html = res.data;
  const $ = cheerio.load(html);
  let data;

  if (url.includes("koket")) {
    data = koket($);
  } else if (url.includes("ica")) {
    data = ica($);
  } else if (url.includes("coop")) {
    data = coop($);
  } else if (url.includes("arla")) {
    const browser = await puppeteer.launch({dumpio: true});
    const page = await browser.newPage();
    await page.goto(url,{ waitUntil: 'networkidle0' });
    await page.waitForSelector('.c-recipe__instructions-step-icon');

    data = await arla($, page);
    await browser.close();
  } else if(url.includes("recept.se")) {
    const browser = await puppeteer.launch({dumpio: true});
    const page = await browser.newPage();
    await page.goto(url,{ waitUntil: 'networkidle0' });

    data = await recept_se(page, $)
    await browser.close();
  } else {
    return false
  }
  return data
  console.log("DATA", data);
});

async function fetchData(url) {
  console.log("Crawling data...");
  // make http call to url
  let response = await axios(url).catch((err) => console.log(err));

  if (response.status !== 200) {
    console.log("Error occurred while fetching data");
    return;
  }
  return response;
}

module.exports = crawler;