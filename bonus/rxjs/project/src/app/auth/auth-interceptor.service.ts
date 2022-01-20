import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, take } from "rxjs";

import { AuthService } from "./auth.service";
import { User } from "./user.model";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.user.pipe(
            // Take once the value and then unsubscribe
            take(1),
            // The observable inside exhaustMap will be the one to return
            exhaustMap((user: User) => {
                if (!user) {
                    return next.handle(req);
                }
                const modifiedRequest = req.clone({
                    // In the case of firebase we set the token through queryParams, but generally is through HttpHeaders
                    params: new HttpParams().set('auth', user.token)
                });
                return next.handle(modifiedRequest);
            })
        );
    }
}