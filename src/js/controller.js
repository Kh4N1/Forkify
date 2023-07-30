import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpiner();

    // 0 - update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // 1 - loading recipe
    await model.loadRecipe(id);
    // const { recipe } = model.state;

    // 2- rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    // console.error(`${err} 🤦‍♂️🤦‍♂️🤦‍♂️🤦‍♂️ IN controller.js 🤦‍♂️`);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpiner();

    // Get search Query
    const query = searchView.getQuery();
    if (!query) return;

    // load search results
    await model.loadSearchResults(query);

    //rendering result
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage(1));

    // render initail pagination bottoms
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (gotoPage) {
  // rendering new result
  // resultsView.render(model.state.search.results);
  resultsView.render(model.getSearchResultsPage(gotoPage));

  // render new pagination bottoms
  paginationView.render(model.state.search);
};

const controlServings = function (newServ) {
  // update the recipe servings (in state)
  model.updateServings(newServ);

  // update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) render bookmarks
  recipeView.update(model.state.recipe);

  // 3) render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
