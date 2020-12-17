const cheerio = require("cheerio");
const ica = ($) => {
  const recipeTitleSelector = $(".recipe-header__title");
  const RecipeTitle = [];
  recipeTitleSelector.each(function () {
    let title = $(this).text();
    console.log("Title:", title);
    RecipeTitle.push(title);
  });

  const recipeDescSelector = $(".recipe-header__preamble");
  const RecipeDesc = [];
  recipeDescSelector.each(function () {
    let title = $(this).text();
    RecipeDesc.push(title);
  });

  const descriptionStepsSelector = $(".cooking-steps-group .cooking-steps-main__text");
  const DescriptionSteps = [];
  descriptionStepsSelector.each(function () {
    let step = $(this).text();
    DescriptionSteps.push(step);
  });

  const metaDataSelector = $(".recipe-header__summary");
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

  const ingredientsRowSelector = $(".ingredients-list .ingredients-list-group");
  const Ingredients = [];
  // ingredientsRowSelector.each(function () {

    let ingredientCards = $(".ingredients-list-group__card");
    ingredientCards.each(function () {
       let ingredientUnit = $(this).find(".ingredients-list-group__card__qty span").text().replace(/\r?\n|\r/,'').trim();
      let ingredientName = $(this).find(".ingredients-list-group__card__ingr span").text().replace(/\r?\n|\r/,'').trim();


      Ingredients.push(`${ingredientUnit} ${ingredientName}`);
    });
  
  // });

  const imageSelector = $(".recipe-header__desktop-image-wrapper__inner img")[0].attribs.src;

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
