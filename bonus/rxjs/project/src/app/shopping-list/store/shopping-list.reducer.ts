import { Action, createReducer, on } from "@ngrx/store";

import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from './shopping-list.actions';

export interface ShoppingListState {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number
}

const initialState: ShoppingListState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
}

export const shoppingListReducer = createReducer(
    initialState,
    on(ShoppingListActions.GET_INGREDIENTS, (state) => ({ ...state })),
    on(
        ShoppingListActions.ADD_INGREDIENT,
        (state, { newIngredient }) => ({ ...state, ingredients: [...state.ingredients, newIngredient] })
    ),

    on(
        ShoppingListActions.UPDATE_INGREDIENT,
        (state, { newIngredient }) => {
            let updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = newIngredient;

            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredientIndex: -1,
                editedIngredient: null
            }
        }
    ),
    on(ShoppingListActions.DELETE_INGREDIENT,
        (state) => {
            let updatedIngredients = [...state.ingredients];
            updatedIngredients.splice(state.editedIngredientIndex, 1);

            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredientIndex: -1, // reseting to default
                editedIngredient: null // reset to default
            }
        }
    ),
    on(
        ShoppingListActions.START_EDITING,
        (state, { index }) => {
            let updatedIngredients = [...state.ingredients];
            let editedIngredient = updatedIngredients[index];

            return {
                ...state,
                editedIngredientIndex: index,
                editedIngredient: editedIngredient
            }
        }
    ),
    on(
        ShoppingListActions.STOP_EDITING,
        (state) => ({ ...state, editedIngredientIndex: -1, editedIngredient: null })
    )
);

// Wrapper only required for AOT
export function reducer(state: ShoppingListState = initialState, action: Action) {
    return shoppingListReducer(state, action);
}