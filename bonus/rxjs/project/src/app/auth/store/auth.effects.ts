import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from "rxjs";

import * as AuthActions from "./auth.actions";
import { environment } from "../../../environments/environment";

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
    authLogin = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.LOGIN_START),
            // Return a new observable and use the previous observable data
            switchMap(data => {
                return this.http.post<SignInResponse>(environment.SIGN_IN_URL, {
                    email: data.email,
                    password: data.password,
                    returnSecureToken: true
                }).pipe(
                    map(response => {
                        const currentTime = new Date().getTime();
                        const expirationDate = new Date(currentTime + (+response.expiresIn * 1000));
                        // We must return a new Observable<Action> in the createEffect
                        // We dont need of() because map already returns an observable
                        return AuthActions.LOGIN({
                            email: response.email,
                            userId: response.localId,
                            idToken: response.idToken,
                            expiresIn: expirationDate
                        });
                    }),
                    // We must always return an non erroneous observable
                    // So the switchMap does not die in case of any errors
                    catchError(error => {
                        return of(AuthActions.LOGIN_FAIL({ error: this.handleError(error) }));
                    })
                )
            })
        )
    );

    authSuccess = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.LOGIN),
            tap(() => this.router.navigate(['/'])),
        ),
        { dispatch: false }
    );

    private handleError(data: any): string {
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
        private router: Router
    ) { }
}