import { createAction, props } from "@ngrx/store";

export const LOGIN = createAction(
    '[Auth] Login',
    props<{ email: string, userId: string, idToken: string, expiresIn: Date }>()
);

export const LOGOUT = createAction('[Auth] Logout');