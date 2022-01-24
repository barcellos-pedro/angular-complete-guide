import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, Observable, of, switchMap, tap } from "rxjs";
import { Action } from "@ngrx/store";

import * as AuthActions from "./auth.actions";
import { environment } from "../../../environments/environment";
import { User } from "../user.model";
import { AuthLogoutService } from "../auth-logout.service";

export interface SignUpResponse {
    idToken: string; // A Firebase Auth ID token for the newly created user.
    email: string; // The email for the newly created user.
    refreshToken: string; // A Firebase Auth refresh token for the newly created user.
    expiresIn: string; // The number of seconds in which the ID token expires.
    localId: string; // The uid of the newly created user.
}

export interface SignInResponse extends SignUpResponse {
    registered: boolean; // Whether the email is for an existing account.
}

@Injectable()
export class AuthEffects {
    authSignUp = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.SIGNUP_START),
            switchMap(data => {
                return this.http.post<SignInResponse>(environment.SIGNUP_URL, {
                    email: data.email,
                    password: data.password,
                    returnSecureToken: true
                }).pipe(
                    map(response => this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn)),
                    catchError(error => this.handleError(error))
                );
            })
        )
    );

    authLogin = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.LOGIN_START),
            // Return a new observable and use the previous observable data
            switchMap(data => {
                return this.http.post<SignInResponse>(environment.SIGNIN_URL, {
                    email: data.email,
                    password: data.password,
                    returnSecureToken: true
                }).pipe(
                    map(response => this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn)),
                    catchError(error => this.handleError(error))
                )
            })
        )
    );

    authRedirect = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.AUTHENTICATE_SUCCESS),
            tap(() => this.router.navigate(['/'])),
        ),
        { dispatch: false }
    );

    authLogout = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.LOGOUT),
            tap(() => {
                this.router.navigate(['/auth']);
                localStorage.removeItem('userData');
                this.authLogoutService.clearLogoutTimer();
            })
        ),
        { dispatch: false }
    );

    autoLogin = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.AUTO_LOGIN),
            map(() => {
                const userData: {
                    email: string,
                    id: string,
                    _token: string,
                    _tokenExpirationDate: string
                } = JSON.parse(localStorage.getItem('userData'));

                if (!userData) {
                    return { type: '[Auth] Auto Login failed' };
                }

                const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

                if (loadedUser.token) {
                    const tokenExpirationTime: number = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                    this.setLogoutTimer(tokenExpirationTime);

                    return AuthActions.AUTHENTICATE_SUCCESS({
                        email: loadedUser.email,
                        userId: loadedUser.id,
                        idToken: loadedUser.token,
                        expiresIn: new Date(userData._tokenExpirationDate)
                    });
                }

                return { type: '[Auth] Auto Login failed' };
            })
        )
    );

    private setLogoutTimer(tokenExpirationDate: number): void {
        const expirationTime = new Date(tokenExpirationDate).getTime() - new Date().getTime();
        this.authLogoutService.setLogoutTimer(expirationTime * 1000);
    }

    /**
     * Return a new Observable<Action> in the createEffect
     * There is no need to use of() because map already returns an observable
     * @param email string
     * @param localId string
     * @param idToken string
     * @param expiresIn string
     * @returns AUTHENTICATE_SUCCESS
     */
    private handleAuthentication(email: string, localId: string, idToken: string, expiresIn: number): Action {
        const currentTime = new Date().getTime();
        const expirationDate = new Date(currentTime + (expiresIn * 1000));
        const user = new User(email, localId, idToken, expirationDate);

        this.setLogoutTimer(expiresIn * 1000);

        // Persist login data on localStorage
        localStorage.setItem('userData', JSON.stringify(user));

        // Persist login data on store
        return AuthActions.AUTHENTICATE_SUCCESS({
            email: email,
            userId: localId,
            idToken: idToken,
            expiresIn: expirationDate
        });
    }

    /**
     * Return an non erroneous observable
     * So the actions$ pipe does not die in case of any errors
     * @param error object
     * @returns Observable<Action>
     */
    private handleError(error: any): Observable<Action> {
        return of(
            AuthActions.AUTHENTICATE_FAIL({
                error: this.getErrorMessage(error)
            })
        );
    }

    /**
     * Get error message based on api response
     * @param data string
     * @returns errorMessage
     */
    private getErrorMessage(data: any): string {
        const errors: { [key: string]: string } = {
            // Sign Up Errors
            "EMAIL_EXISTS": "The email address is already in use by another account.",
            "OPERATION_NOT_ALLOWED": "Password sign-in is disabled for this project.",
            "TOO_MANY_ATTEMPTS_TRY_LATER": "We have blocked all requests from this device due to unusual activity. Try again later.",
            // Sign In Errors
            "EMAIL_NOT_FOUND": "There is no user e-mail associated with that account.",
            "INVALID_PASSWORD": "The password is invalid or the user does not have a password.",
            "USER_DISABLED": "The user account has been disabled."
        };

        const errorMessage: string = errors[data?.error?.error?.message] ?? "An error occured.";

        return errorMessage;
    }

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private authLogoutService: AuthLogoutService
    ) { }
}