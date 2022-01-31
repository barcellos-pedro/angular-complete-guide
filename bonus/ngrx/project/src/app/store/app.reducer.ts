import { ActionReducerMap } from '@ngrx/store';

import * as ShoppingListReducer from '../shopping-list/store/shopping-list.reducer';
import * as AuthReducer from '../auth/store/auth.reducer';
import * as RecipeReducer from '../recipes/store/recipe.reducer';


export interface AppState {
    shoppingList: ShoppingListReducer.ShoppingListState;
    recipes: RecipeReducer.RecipeState;
    auth: AuthReducer.AuthState
}

export const reducer: ActionReducerMap<AppState> = {
    shoppingList: ShoppingListReducer.reducer,
    recipes: RecipeReducer.reducer,
    auth: AuthReducer.reducer
}