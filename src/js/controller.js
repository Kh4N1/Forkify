import * as model from './model.js';
import recipeView from './views/recipeView'

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// const recipeContainer = document.querySelector('.recipe');



const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpiner()

    // 1 - loading recipe
    await model.loadRecipe(id);
    // const { recipe } = model.state;

    // 2- rendering recipe
    recipeView.render(model.state.recipe)


  } catch (err) {
    console.error(err);
  }
};
// showRecipe();

['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipes));
