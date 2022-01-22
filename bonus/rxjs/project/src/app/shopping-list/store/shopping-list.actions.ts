import { createAction, props } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';

export const GET_INGREDIENTS = createAction(
    '[ShoppingList Get all Ingredients]'
);

export const GET_INGREDIENT = createAction(
    '[ShoppingList Get one Ingredient]',
    props<{ index: number }>()
);

export const ADD_INGREDIENT = createAction(
    '[ShoppingList Add an Ingredient]',
    props<{ newIngredient: Ingredient }>()
);

export const ADD_INGREDIENTS = createAction(
    '[ShoppingList Add all Ingredients]',
    props<{ newIngredients: Ingredient[] }>()
);

export const UPDATE_INGREDIENT = createAction(
    '[ShoppingList Update an Ingredient]',
    props<{ newIngredient: Ingredient }>()
)

export const DELETE_INGREDIENT = createAction('[ShoppingList Delete an Ingredient]');

export const START_EDITING = createAction(
    '[ShoppingList Start editing an Ingredient]',
    props<{ index: number }>()
);

export const STOP_EDITING = createAction('[ShoppingList Stop editing an Ingredient]');