const cheerio = require("cheerio");
const recept_se = async (page, jquery) => {
  const recipeTitleSelector = jquery(".c-recipe__title");
  const RecipeTitle = [];
  recipeTitleSelector.each(function () {
    let title = jquery(this).text();
    console.log("Title:", title);
    RecipeTitle.push(title);
  });

  const recipeDescSelector = jquery(".c-recipe__description p");
  const RecipeDesc = [];
  recipeDescSelector.each(function () {
    let title = jquery(this).text();
    RecipeDesc.push(title);
  });

  const descriptionStepsSelector = await page.$$(".recipe-page-body__text");

  const DescriptionStepsArray = await descriptionStepsSelector.map( async (item, index) => {
    const text = await page.evaluate(element => element.textContent, descriptionStepsSelector[index]);
    return text.replace(/\r?\n|\r/g,'').replace('–', '').trim()
  })

  const DescriptionSteps = await Promise.all(DescriptionStepsArray)

  const metaDataSelector = jquery(".recipe-header__summary");
  const MetaData = [];
  metaDataSelector.each(function () {
    let step = jquery(this).find('span').text();
    MetaData.push(step);
  });

  const portionAmountSelector = await page.$('.serving-size__input')
  const inputValue = await page.evaluate(element => element.value, portionAmountSelector);
  
  console.log(inputValue)
  const PortionsAmount = inputValue;



  const ingredientsRowSelector = await page.$$(".recipe-page-body__ingredients");

  const IngredientsArray = await ingredientsRowSelector.map( async (item, index) => {
    const text = await page.evaluate(element => element.textContent, ingredientsRowSelector[index]);
    return text.replace(/\r?\n|\r/g,'').replace('–', '').trim()
  })

  const Ingredients = await Promise.all(IngredientsArray)


  const imageSelector = jquery(".c-recipe__image picture img")[0].attribs.src;

  return {
    ingredientsRow: Ingredients,
    portionsAmount: `${PortionsAmount} portioner`,
    metaData: MetaData,
    descriptionSteps: DescriptionSteps,
    recipeTitle: RecipeTitle[0].trim(),
    recipeDesc: RecipeDesc[0],
    recipeImage: imageSelector.replace('&px=28&blur=200&q=0&colorquant=16', '')
  };
};

module.exports = recept_se;
