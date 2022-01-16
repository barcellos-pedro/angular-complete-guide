import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

import { AuthService, SignInResponse, SignUpResponse } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    isLoginMode: boolean = true;
    isLoading: boolean = false;
    error: any = null;

    ngOnInit(): void { }

    constructor(private authService: AuthService, private router: Router) { }

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
                console.log(response);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            error: (errorMessage) => {
                this.error = errorMessage;
                this.isLoading = false;
            }
        });

        form.reset();
    }
}