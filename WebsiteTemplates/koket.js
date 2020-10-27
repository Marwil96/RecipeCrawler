const koket = ($) => {
  const recipeTitle = $(".recipe_wrapper__SEwh1");
  const RecipeTitleData = [];
  recipeTitle.each(function () {
    let title = $(this).find("h1").text();
    console.log("Title:", title);
    RecipeTitleData.push(title);
  });

  const descriptionSteps = $(".step-by-step_numberedList__1Qy46 li");
  const DescriptionStepsData = [];
  descriptionSteps.each(function () {
    let step = $(this).find("span").text();
    console.log("Step", step);
    DescriptionStepsData.push(step);
  });

  const metaData = $(".details_wrapper__3Euwd p");
  const MetaDataData = [];
  metaData.each(function () {
    let step = $(this).text();
    console.log("MetaData", step);
    MetaDataData.push(step);
  });

  const portionAmount = $(".portions_converter_wrapper__2Z8vi");
  const PortionsAmountData = [];
  portionAmount.each(function () {
    let portion = $(this).find("span").text();
    console.log("PortionSize", portion);
    PortionsAmountData.push(portion);
  });

  const ingredientsRow = $(".ingredients ul li .ingredient");
  const IngredientData = [];
  ingredientsRow.each(function () {
    let ingredient = $(this).find("span").text();
    console.log("Ingredient:", ingredient);
    IngredientData.push(ingredient);
  });

  return {
    ingredientsRow: IngredientData,
    portionsAmount: PortionsAmountData[0],
    metaData: MetaDataData,
    descriptionSteps: DescriptionStepsData,
    recipeTitle: RecipeTitleData[0],
  };
};

module.exports = koket;
