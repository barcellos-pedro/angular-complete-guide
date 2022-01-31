import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { AppState } from "../store/app.reducer";
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
    collapsed: boolean = true;
    isAuthenticated: boolean = false;
    private userSubscription: Subscription;

    constructor(private store: Store<AppState>) { }

    ngOnInit(): void {
        this.userSubscription = this.store.select('auth').subscribe(state => this.isAuthenticated = !!state.user);
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    onSaveData() {
        this.store.dispatch(RecipeActions.STORE_RECIPES());
    }

    onFetchData() {
        this.store.dispatch(RecipeActions.FETCH_RECIPES());
    }

    onLogOut() {
        this.store.dispatch(AuthActions.LOGOUT());
    }
}