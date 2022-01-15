import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

interface AuthResponse {
    idToken: string; // A Firebase Auth ID token for the newly created user.
    email: string; // The email for the newly created user.
    refreshToken: string; // A Firebase Auth refresh token for the newly created user.
    expiresIn: string; // The number of seconds in which the ID token expires.
    localId: string; // The uid of the newly created user.
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly webApiKey: string = "AIzaSyDYSSR-lagSyrFR_9tMLcGhlyf2Q0QuxsQ";
    private readonly URL: string = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.webApiKey}`;

    constructor(private http: HttpClient) { }

    signUp(email: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(this.URL, {
            email,
            password,
            returnSecureToken: true
        }).pipe(
            catchError(errorResponse => {
                const error: string = this.getErrorMessage(errorResponse);
                return throwError(() => new Error(error));
            })
        );
    }

    private getErrorMessage(errorResponse: any): string {
        const errors: any = {
            "EMAIL_EXISTS": "The email address is already in use by another account.",
            "OPERATION_NOT_ALLOWED": "Password sign-in is disabled for this project.",
            "TOO_MANY_ATTEMPTS_TRY_LATER": "We have blocked all requests from this device due to unusual activity. Try again later.",
        };

        return errors[errorResponse.error.error.message] ?? "An error occured.";
    }
}