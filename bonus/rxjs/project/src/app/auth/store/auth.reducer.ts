import { Action, createReducer } from '@ngrx/store';
import { User } from '../user.model';

export interface AuthState {
    user: User
};

const initialState: AuthState = {
    user: null
};

export const authReducer = createReducer(
    initialState,
    /**
     * TODO: Create actions
     */
);

// Wrapper only required for AOT
export function reducer(state: AuthState = initialState, action: Action) {
    return authReducer(state, action);
}