import { createAction, props } from "@ngrx/store";

export const LOGIN_START = createAction(
    '[Auth] Login Start',
    props<{ email: string, password: string }>()
);

export const SIGNUP_START = createAction(
    '[Auth] SignUp Start',
    props<{ email: string, password: string }>()
);

export const AUTHENTICATE_SUCCESS = createAction(
    '[Auth] Login',
    props<{ email: string, userId: string, idToken: string, expiresIn: Date, redirect: boolean }>()
);

export const AUTHENTICATE_FAIL = createAction(
    '[Auth] Login Fail',
    props<{ error: string }>()
);

export const LOGOUT = createAction('[Auth] Logout');

export const CLEAR_ERROR = createAction('[Auth] Clear Error');

export const AUTO_LOGIN = createAction('[Auth] Auto Login');