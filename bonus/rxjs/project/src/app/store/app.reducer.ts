import * as ShoppingListReducer from '../shopping-list/store/shopping-list.reducer';
import * as AuthReducer from '../auth/store/auth.reducer';

import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shoppingList: ShoppingListReducer.ShoppingListState;
    auth: AuthReducer.AuthState
}

export const reducer: ActionReducerMap<AppState> = {
    shoppingList: ShoppingListReducer.reducer,
    auth: AuthReducer.reducer
}