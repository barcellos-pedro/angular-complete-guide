import { createAction, props } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

import { Recipe } from "../recipe.model";

export const SET_RECIPES = createAction(
    '[Recipe] Set Recipes',
    props<{ newRecipes: Recipe[] }>()
);

export const FETCH_RECIPES = createAction(
    '[Recipe] Fetch Recipes'
);

export const ADD_RECIPE = createAction(
    '[Recipe] Add Recipe',
    props<{ newRecipe: Recipe }>()
);

export const UPDATE_RECIPE = createAction(
    '[Recipe] Update Recipe',
    props<{ updatedRecipe: Recipe }>()
);

export const DELETE_RECIPE = createAction('[Recipe] Delete Recipe');

export const START_EDITING = createAction(
    '[Recipe] Start editing Recipe',
    props<{ index: number }>()
);

export const STOP_EDITING = createAction('[Recipe] Stop editing Recipe');

export const STORE_RECIPES = createAction('[Recipe] Store Recipes');