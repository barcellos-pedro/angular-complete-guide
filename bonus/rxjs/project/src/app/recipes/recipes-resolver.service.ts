import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable, of, switchMap, take } from "rxjs";

import { AppState } from "../store/app.reducer";
import { Recipe } from "./recipe.model";
import * as RecipeActions from '../recipes/store/recipe.actions';

@Injectable({
    providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(
        private store: Store<AppState>,
    ) { }

    private getRecipes(): Observable<Recipe[]> {
        return this.store.select('recipes').pipe(map(state => state.recipes));
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        return this.getRecipes().pipe(
            take(1), // Only listen once for the event and then unsubscribe
            switchMap(recipes => {
                if (recipes.length === 0) {
                    this.store.dispatch(RecipeActions.FETCH_RECIPES());

                    return this.getRecipes().pipe(
                        take(1)
                    );
                } else {
                    return of(recipes);
                }
            })
        );
    }
}