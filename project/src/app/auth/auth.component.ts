import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthService } from "./auth.service";

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

    constructor(private authService: AuthService) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }

        this.isLoading = true;

        if (this.isLoginMode) {
            //
        } else {
            let { email, password } = form.value;
            this.authService.signUp(email, password).subscribe(response => {
                console.log(response);
                this.isLoading = false;
            },
            errorMessage => {
                console.error(errorMessage);
                this.error = errorMessage;
                this.isLoading = false;
            });
        }

        form.reset();
    }
}