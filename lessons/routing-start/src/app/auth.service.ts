import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {

    loggedIn: boolean = false;

    isAuthenticated(): Promise<boolean> {
        const promise = new Promise<boolean>((resolve, reject) => {
            setTimeout(() => {
                resolve(this.loggedIn);
            }, 500);
        })
        return promise;
    }

    login(): void {
        this.loggedIn = true;
    }

    logout(): void {
        this.loggedIn = false;
    }
}