import { createAction, props } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENT = createAction(
    '[ShoppingList] Add Ingredient',
    props<{ newIngredient: Ingredient }>()
);

export const ADD_INGREDIENTS = createAction(
    '[ShoppingList] Add all Ingredients',
    props<{ newIngredients: Ingredient[] }>()
);

export const UPDATE_INGREDIENT = createAction(
    '[ShoppingList] Update Ingredient',
    props<{ newIngredient: Ingredient }>()
)

export const DELETE_INGREDIENT = createAction('[ShoppingList] Delete Ingredient');

export const START_EDITING = createAction(
    '[ShoppingList] Start editing Ingredient',
    props<{ index: number }>()
);

export const STOP_EDITING = createAction('[ShoppingList] Stop editing Ingredient');