const cheerio = require("cheerio");
const coop = ($) => {
  const recipeTitleSelector = $(".Main-container h1");
  const RecipeTitle = [];
  recipeTitleSelector.each(function () {
    let title = $(this).text();
    console.log("Title:", title);
    RecipeTitle.push(title);
  });

  const recipeDescSelector = $(".Preamble");
  const RecipeDesc = [];
  recipeDescSelector.each(function () {
    let title = $(this).text();
    RecipeDesc.push(title);
  });

  const descriptionStepsSelector = $(".Tab-panel .u-paddingVxlg div ol").children();

  const DescriptionSteps = [];
  descriptionStepsSelector.each(function () {
    // let step = $(this).find("li").text();

    DescriptionSteps.push(this.children[0].data);
  });

  // const metaDataSelector = $(".recipe-header__summary");
  const MetaData = [];
  // metaDataSelector.each(function () {
  //   let step = $(this).find('span').text();
  //   MetaData.push(step);
  // });

  // const portionAmountSelector = $(".portions_converter_wrapper__2Z8vi");
  // const PortionsAmount = [];
  // portionAmountSelector.each(function () {
  //   let portion = $(this).find("span").text();
  //   PortionsAmount.push(portion);
  // });

  const ingredientsRowSelector = $(".IngredientList .IngredientList-container .IngredientList-content .List--section").children();

  // console.log(ingredientsRowSelector[0])

  const Ingredients = [];
  ingredientsRowSelector.each(function () {
    let ingredient = $(this);
    console.log(ingredient.text())

    Ingredients.push(ingredient.text().replace(/\r?\n|\r/g,'').trim());
  });
  

  const imageSelector = $(".Hero-media--recipePage").css('background-image');

  return {
    ingredientsRow: [...new Set(Ingredients.filter(value => Object.keys(value).length !== 0))],
    portionsAmount: '4 portioner',
    metaData: MetaData,
    descriptionSteps: DescriptionSteps,
    recipeTitle: RecipeTitle[0],
    recipeDesc: RecipeDesc[0],
    recipeImage: imageSelector.replace('url', '').replace('(', '').replace(')', '').replace('//', 'https://').replace(/['"]+/g, '')
  };
};

module.exports = coop;
