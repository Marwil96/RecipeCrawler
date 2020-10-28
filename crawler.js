var express = require("express");
const koket  = require('./WebsiteTemplates/koket.js')
const ica = require("./WebsiteTemplates/ica.js");
const axios = require("axios");
const cheerio = require("cheerio");
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
fetchData(url).then((res) => {
  const html = res.data;
  const $ = cheerio.load(html);
  let data;

  if (url.includes("koket")) {
    data = koket($);
  } else if (url.includes("ica")) {
    data = ica($);
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