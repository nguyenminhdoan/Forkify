import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { GET_JSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    page: 1,
    resultPerPage: RES_PER_PAGE,
  },
  bookmark: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await GET_JSON(`${API_URL}${id}`);
    // console.log(res);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceURL: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredient: recipe.ingredients,
    };

    // console.log(recipe);

    if (state.bookmark.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    console.error(`${err}🌋🌋🌋🌋`);
    throw err;
  }
  // console.log(state.recipe);
};

export const loadSearchResult = async function (query) {
  try {
    state.query = query;
    const data = await GET_JSON(`${API_URL}?search=${query}`);
    state.search.result = data.data.recipes.map(ing => {
      return {
        id: ing.id,
        title: ing.title,
        publisher: ing.publisher,
        image: ing.image_url,
      };
    });
    state.search.page = 1;

    // console.log(state.search.result);
  } catch (err) {
    console.error(`${err}🌋🌋🌋🌋`);
    throw err;
  }
};

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultPerPage; //0;
  const end = page * state.search.resultPerPage; //9;
  return state.search.result.slice(start, end);
};

export const updateServing = function (newServing) {
  state.recipe.ingredient.forEach(ing => {
    // NewQT = oldQT * newServing / oldServing  ///// 2* 8 / 4 = 4
    ing.quantity = (ing.quantity * newServing) / state.recipe.servings;
  });
  state.recipe.servings = newServing;
};

export const addBookmark = function (recipe) {
  // add bookmark
  state.bookmark.push(recipe);
  // mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

export const deleteBookmark = function (id) {
  const index = state.bookmark.findIndex(el => el.id === id);
  state.bookmark.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};
