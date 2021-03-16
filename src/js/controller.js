import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView';
import searchView from './views/searchView.js';
import BookmarkView from './views/bookmarkView.js';
import bookmarkView from './views/bookmarkView.js';
// console.log(icons);

// if (module.hot) {
//   module.hot.accept();
// }

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    // update result view to mark selected search result
    resultView.update(model.getSearchResultPage());
    bookmarkView.update(model.state.bookmark);
    //1 Loading Recipe
    await model.loadRecipe(id);

    //2) RENDER RECIPE
    recipeView.render(model.state.recipe);
  } catch (err) {
    // alert(err);
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    resultView.renderSpinner();
    //1) GET SEARCH QUERY
    const query = searchView.getQuery();
    if (!query) return;
    // 2) LOAD SEARCH QUERY
    await model.loadSearchResult(query);
    // 3) RENDER RESULTS
    // console.log(model.state.search.result);
    resultView.render(model.getSearchResultPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 3) RENDER RESULTS
  // console.log(model.state.search.result);
  resultView.render(model.getSearchResultPage(goToPage));

  // 4) Render initial pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServing) {
  // Update the recipe serving (in state)
  model.updateServing(newServing);

  // Update the recipeView
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // console.log(model.state.recipe);
  // 2) update recipe view
  recipeView.update(model.state.recipe);
  //3 render bookmark
  bookmarkView.render(model.state.bookmark);
};

const init = function () {
  recipeView.handlerRender(controlRecipe);
  recipeView.handleServing(controlServings);
  recipeView.handleAddBookmark(controlAddBookmark);
  searchView.handlerSearchView(controlSearchResult);
  paginationView._handleClickPagination(controlPagination);
};
init();

// controlRecipe();
// window.addEventListener('hashchange', showRecipe)
// console.log(recipeContainer);
