import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";
import { DataStorageService } from "../shared/data-storage.service";

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
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.userSubscription = this.authService.user.subscribe({
            next: (user: User) => {
                this.isAuthenticated = !!user;
            }
        });
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
        this.authService.logOut();
    }
}