const cheerio = require("cheerio");
const arla = async (jquery, page) => {

const recipeTitleSelector = await page.$("h1.u-mb--s");
const RecipeTitle = await (await recipeTitleSelector.getProperty('textContent')).jsonValue();

  const recipeDescSelector = await page.$$("div.c-recipe__description");
  const RecipeDesc = await (await recipeDescSelector[0].getProperty('textContent')).jsonValue();


  const descriptionStepsSelector = await page.$$(".c-recipe__instructions-step");

  const DescriptionStepsArray = await descriptionStepsSelector.map( async (item, index) => {
    const text = await page.evaluate(element => element.textContent, descriptionStepsSelector[index]);
    return text
  })

  const DescriptionSteps = await Promise.all(DescriptionStepsArray)


  
  const ingredientsRowSelector = await page.$$("tr");

  const IngredientsArray = await ingredientsRowSelector.map( async (item, index) => {
    const text = await page.evaluate(element => element.textContent, ingredientsRowSelector[index]);
    return text.replace(/\r?\n|\r/g,'').trim()
  })

  const Ingredients = await Promise.all(IngredientsArray)

  const imageSelector = jquery(".c-recipe__image picture img")[0].attribs.src;

  return {
    ingredientsRow: Ingredients,
    portionsAmount: '4 portioner',
    metaData: [],
    descriptionSteps: DescriptionSteps,
    recipeTitle: RecipeTitle,
    recipeDesc: RecipeDesc,
    recipeImage: imageSelector
  };
};

module.exports = arla;
