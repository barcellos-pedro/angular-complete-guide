import { createAction, props } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';

export const GET_INGREDIENTS = createAction(
    '[ShoppingList Get Ingredients]'
);

export const GET_INGREDIENT = createAction(
    '[ShoppingList Get one Ingredient]',
    props<{ index: number }>()
);

export const ADD_INGREDIENT = createAction(
    '[ShoppingList Add Ingredient]',
    props<{ newIngredient: Ingredient }>()
);

export const ADD_INGREDIENTS = createAction(
    '[ShoppingList Add all Ingredients]',
    props<{ newIngredients: Ingredient[] }>()
);

export const UPDATE_INGREDIENT = createAction(
    '[ShoppingList Add all Ingredients]',
    props<{ index: number, newIngredient: Ingredient }>()
)

export const DELETE_INGREDIENT = createAction(
    '[ShoppingList Delete one Ingredients]',
    props<{ index: number }>()
);