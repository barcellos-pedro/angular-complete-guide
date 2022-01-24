import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { DataStorageService } from "../shared/data-storage.service";
import { AppState } from "../store/app.reducer";
import * as AuthActions from '../auth/store/auth.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
    collapsed: boolean = true;
    isAuthenticated: boolean = false;
    private userSubscription: Subscription;

    constructor(
        private dataStorageService: DataStorageService,
        private store: Store<AppState>
    ) { }

    ngOnInit(): void {
        this.userSubscription = this.store.select('auth').subscribe(state => this.isAuthenticated = !!state.user);
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogOut() {
        this.store.dispatch(AuthActions.LOGOUT());
    }
}