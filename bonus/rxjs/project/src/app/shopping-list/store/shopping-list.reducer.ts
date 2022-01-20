import { Action, createReducer, on } from "@ngrx/store";

import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from './shopping-list.actions';

export interface IngredientsState {
    ingredients: Ingredient[]
}

export const initialState: IngredientsState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ]
}

export const shoppingListReducer = createReducer(
    initialState,
    on(ShoppingListActions.GET_INGREDIENTS, (state) => ({ ...state })),
    on(
        ShoppingListActions.ADD_INGREDIENT,
        (state, { newIngredient }) => ({ ingredients: [...state.ingredients, newIngredient] })
    ),
);

export function reducer(state: IngredientsState | undefined = initialState, action: Action) {
    return shoppingListReducer(state, action);
}