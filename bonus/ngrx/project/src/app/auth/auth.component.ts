import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { AppState } from "../store/app.reducer";
import * as AuthActions from "./store/auth.actions";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
    isLoginMode: boolean = true;
    isLoading: boolean = false;
    error: any = null;
    @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
    closeSubscription: Subscription;
    storeSubscription: Subscription;

    ngOnInit(): void {
        this.storeSubscription = this.store.select('auth').subscribe(state => {
            this.isLoading = state.loading;
            this.error = state.authError;
            if (this.error) {
                this.showErrorAlert(this.error);
            }
        })
    }

    ngOnDestroy(): void {
        if (this.closeSubscription) {
            this.closeSubscription.unsubscribe();
        }
        if (this.storeSubscription) {
            this.storeSubscription.unsubscribe();
        }
    }

    constructor(
        private store: Store<AppState>
    ) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }

        let { email, password } = form.value;

        // Sign In
        if (this.isLoginMode) {
            this.store.dispatch(AuthActions.LOGIN_START({
                email: email,
                password: password
            }));
        } else { // Sign Up
            this.store.dispatch(AuthActions.SIGNUP_START({
                email: email,
                password: password
            }))
        }

        form.reset();
    }

    // Only needed if we use the app-alert component
    onHandleError(): void {
        this.store.dispatch(AuthActions.CLEAR_ERROR());
    }

    private showErrorAlert(errorMessage: string) {
        const hostViewContainerRef = this.alertHost.viewContainerRef;

        hostViewContainerRef.clear(); // Clear anything that might be rendered before

        const componentRef = hostViewContainerRef.createComponent(AlertComponent);

        componentRef.instance.message = errorMessage; // Access the new created component instance and set props

        this.closeSubscription = componentRef.instance.close.subscribe(() => {
            this.closeSubscription.unsubscribe();
            hostViewContainerRef.clear();
        });
    }
}