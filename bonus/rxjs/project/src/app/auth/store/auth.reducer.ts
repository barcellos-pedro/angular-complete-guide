import { Action, createReducer, on } from '@ngrx/store';

import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface AuthState {
    user: User
};

const initialState: AuthState = {
    user: null
};

/**
 * TODO: Create actions
 */
export const authReducer = createReducer(
    initialState,
    on(
        AuthActions.LOGIN,
        (state, { email, userId, idToken, expiresIn }) => {
            const authenticatedUser = new User(email, userId, idToken, expiresIn);
            return {
                ...state,
                user: authenticatedUser
            }
        }
    ),
    on(AuthActions.LOGOUT, (state) => {
        return {
            ...state,
            user: null
        }
    })
);

// Wrapper only required for AOT
export function reducer(state: AuthState = initialState, action: Action) {
    return authReducer(state, action);
}