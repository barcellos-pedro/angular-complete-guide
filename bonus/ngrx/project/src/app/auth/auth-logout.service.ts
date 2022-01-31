import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { AppState } from "../store/app.reducer";
import * as AuthActions from './store/auth.actions';

@Injectable({
    providedIn: 'root'
})
export class AuthLogoutService {
    private tokenExpirationTimeout: any = null;

    constructor(private store: Store<AppState>) { }

    clearLogoutTimer() {
        if (this.tokenExpirationTimeout) {
            clearTimeout(this.tokenExpirationTimeout);
        }
        this.tokenExpirationTimeout = null;
    }

    setLogoutTimer(expiresIn: number) {
        this.tokenExpirationTimeout = setTimeout(() => {
            this.store.dispatch(AuthActions.LOGOUT());
        }, expiresIn);
    }
}