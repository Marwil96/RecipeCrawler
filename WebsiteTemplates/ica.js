const cheerio = require("cheerio");
const ica = ($) => {
  const recipeTitleSelector = $(".recipepage__headline");
  const RecipeTitle = [];
  recipeTitleSelector.each(function () {
    let title = $(this).text();
    console.log("Title:", title);
    RecipeTitle.push(title);
  });

  const recipeDescSelector = $(".recipe-preamble");
  const RecipeDesc = [];
  recipeDescSelector.each(function () {
    let title = $(this).text();
    RecipeDesc.push(title);
  });

  const descriptionStepsSelector = $(".recipe-howto-steps li");
  const DescriptionSteps = [];
  descriptionStepsSelector.each(function () {
    let step = $(this).text();
    DescriptionSteps.push(step);
  });

  const metaDataSelector = $(".recipe-meta--header");
  const MetaData = [];
  metaDataSelector.each(function () {
    let step = $(this).find('span').text();
    MetaData.push(step);
  });

  const portionAmountSelector = $(".portions_converter_wrapper__2Z8vi");
  const PortionsAmount = [];
  portionAmountSelector.each(function () {
    let portion = $(this).find("span").text();
    PortionsAmount.push(portion);
  });

  const ingredientsRowSelector = $(".ingredients__list li");
  const Ingredients = [];
  ingredientsRowSelector.each(function () {
    let ingredient = $(this).find("span").text();
    Ingredients.push(ingredient);
  });

  const imageSelector = $(".recipe-image-square__image").css('background-image');

  return {
    ingredientsRow: Ingredients,
    portionsAmount: '4 portioner',
    metaData: MetaData,
    descriptionSteps: DescriptionSteps,
    recipeTitle: RecipeTitle[0],
    recipeDesc: RecipeDesc[0],
    recipeImage: imageSelector
  };
};

module.exports = ica;
