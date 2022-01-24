import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, tap, throwError } from "rxjs";

import { User } from "./user.model";
import { environment } from "../../environments/environment";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.reducer";
import { LOGIN, LOGOUT } from "./store/auth.actions";

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

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // With BehaviourSubject we always get the latest value, even if we missed the previous update
    // user: Subject<User> = new BehaviorSubject<User>(null);
    
    private tokenExpirationTimeout: any = null;

    constructor(
        private http: HttpClient,
        private router: Router,
        private store: Store<AppState>
    ) { }

    signUp(email: string, password: string): Observable<SignUpResponse> {
        return this.http.post<SignUpResponse>(environment.SIGN_UP_URL, {
            email,
            password,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleError),
            tap(data => this.handleAuthentication(data.email, data.localId, data.idToken, +data.expiresIn))
        );
    }

    signIn(email: string, password: string) {
        return this.http.post<SignInResponse>(environment.SIGN_IN_URL, {
            email,
            password,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleError),
            tap(data => this.handleAuthentication(data.email, data.localId, data.idToken, +data.expiresIn))
        );
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if (loadedUser.token) {
            // this.user.next(loadedUser);
            this.store.dispatch(LOGIN({
                email: loadedUser.email,
                userId: loadedUser.id,
                idToken: loadedUser.token,
                expiresIn: new Date(userData._tokenExpirationDate)
            }));
            const tokenExpirationTime = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogOut(tokenExpirationTime);
        }
    }

    logOut() {
        // this.user.next(null);
        this.store.dispatch(LOGOUT());
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimeout) {
            clearTimeout(this.tokenExpirationTimeout);
        }
        this.tokenExpirationTimeout = null;
    }

    autoLogOut(expiresIn: number) {
        this.tokenExpirationTimeout = setTimeout(() => {
            this.logOut();
        }, expiresIn);
    }

    private handleAuthentication(email: string, userId: string, idToken: string, expiresIn: number): void {
        const currentTime = new Date().getTime();
        const expirationDate = new Date(currentTime + expiresIn * 1000); // * 1000 because expiresIn is in milliseconds
        const user = new User(email, userId, idToken, expirationDate);
        // this.user.next(user);
        this.store.dispatch(LOGIN({
            email: email,
            userId: userId,
            idToken: idToken,
            expiresIn: expirationDate
        }))
        this.autoLogOut(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(data: any): Observable<never> {
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

        return throwError(() => errorMessage);
    }
}