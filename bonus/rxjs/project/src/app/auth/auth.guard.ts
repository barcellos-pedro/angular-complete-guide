import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable, take } from "rxjs";

import { AppState } from "../store/app.reducer";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.store.select('auth').pipe(
            take(1), // To make sure we always take the latest value and then unsubscribe
            map(state => {
                const isAuth: boolean = !!state.user;
                if (isAuth) {
                    return true;
                }
                return this.router.createUrlTree(['/auth']);
            })
        );
    }

}