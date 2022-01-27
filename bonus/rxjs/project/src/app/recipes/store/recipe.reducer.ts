import { Action, createReducer, on } from "@ngrx/store";

import { Recipe } from "../recipe.model";
import * as RecipeActions from './recipe.actions';

export interface RecipeState {
    recipes: Recipe[];
    editedRecipe: Recipe;
    editedRecipeIndex: number;
};

const initialState: RecipeState = {
    recipes: [],
    editedRecipe: null,
    editedRecipeIndex: -1
}

export const recipeReducer = createReducer(
    initialState,
    on(
        RecipeActions.SET_RECIPES,
        (state, { newRecipes }) => {
            return {
                ...state,
                recipes: newRecipes
            }
        }
    ),
    on(
        RecipeActions.ADD_RECIPE,
        (state, { newRecipe }) => {
            return {
                ...state,
                recipes: [...state.recipes, newRecipe]
            }
        }
    ),
    on(
        RecipeActions.UPDATE_RECIPE,
        (state, { updatedRecipe }) => {
            let updatedRecipes = [...state.recipes];
            updatedRecipes[state.editedRecipeIndex] = updatedRecipe;

            return {
                ...state,
                recipes: updatedRecipes,
                editedRecipeIndex: -1,
                editedRecipe: null
            }
        }
    ),
    on(RecipeActions.DELETE_RECIPE,
        (state) => {
            let updatedRecipes = [...state.recipes];
            updatedRecipes.splice(state.editedRecipeIndex, 1);

            return {
                ...state,
                recipes: updatedRecipes,
                editedRecipeIndex: -1,
                editedRecipe: null
            }
        }
    ),
    on(
        RecipeActions.START_EDITING,
        (state, { index }) => {
            let updatedRecipes = [...state.recipes];
            let editedRecipe = updatedRecipes[index];

            return {
                ...state,
                editedRecipeIndex: index,
                editedRecipe: editedRecipe
            }
        }
    ),
    on(
        RecipeActions.STOP_EDITING,
        (state) => ({ ...state, editedRecipeIndex: -1, editedRecipe: null })
    )
);

// Wrapper only required for AOT
export function reducer(state: RecipeState = initialState, action: Action) {
    return recipeReducer(state, action);
}