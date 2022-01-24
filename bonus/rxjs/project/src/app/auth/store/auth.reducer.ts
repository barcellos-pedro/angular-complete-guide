import { Action, createReducer, on } from '@ngrx/store';

import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface AuthState {
    user: User;
    authError: string;
    loading: boolean;
};

const initialState: AuthState = {
    user: null,
    authError: null,
    loading: false,
};

export const authReducer = createReducer(
    initialState,
    on(
        AuthActions.LOGIN,
        (state, { email, userId, idToken, expiresIn }) => {
            const authenticatedUser = new User(email, userId, idToken, expiresIn);
            return {
                ...state,
                authError: null,
                user: authenticatedUser,
                loading: false
            }
        }
    ),
    on(AuthActions.LOGOUT, (state) => {
        return {
            ...state,
            user: null
        }
    }),
    on(AuthActions.LOGIN_START, (state) => {
        return {
            ...state,
            authError: null,
            loading: true
        }
    }),
    on(AuthActions.LOGIN_FAIL, (state, { error }) => {
        return {
            ...state,
            user: null,
            authError: error,
            loading: false
        }
    })
);

// Wrapper only required for AOT
export function reducer(state: AuthState = initialState, action: Action) {
    return authReducer(state, action);
}