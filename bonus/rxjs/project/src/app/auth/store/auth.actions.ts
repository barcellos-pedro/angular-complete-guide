import { createAction, props } from "@ngrx/store";

export const LOGIN_START = createAction(
    '[Auth] Login Start',
    props<{ email: string, password: string }>()
);

export const LOGIN = createAction(
    '[Auth] Login',
    props<{ email: string, userId: string, idToken: string, expiresIn: Date }>()
);

export const LOGIN_FAIL = createAction(
    '[Auth] Login Fail',
    props<{ error: string }>()
)

export const LOGOUT = createAction('[Auth] Logout');