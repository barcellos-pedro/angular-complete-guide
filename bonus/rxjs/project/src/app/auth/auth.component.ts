import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";

import { AuthService, SignInResponse, SignUpResponse } from "./auth.service";
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

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

    ngOnInit(): void { }

    ngOnDestroy(): void {
        if (this.closeSubscription) {
            this.closeSubscription.unsubscribe();
        }
    }

    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }

        let { email, password } = form.value;
        let authObservable: Observable<SignUpResponse | SignInResponse>;

        this.isLoading = true;

        // Sign In
        if (this.isLoginMode) {
            authObservable = this.authService.signIn(email, password);
        } else { // Sign Up
            authObservable = this.authService.signUp(email, password);
        }

        authObservable.subscribe({
            next: (response) => {
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            error: (errorMessage: string) => {
                this.error = errorMessage;
                this.showErrorAlert(errorMessage);
                this.isLoading = false;
            }
        });

        form.reset();
    }

    onHandleError(): void {
        this.error = null;
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