import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, tap, withLatestFrom } from "rxjs";
import { AppState } from "src/app/store/app.reducer";
import { Recipe } from "../recipe.model";

import * as RecipeActions from './recipe.actions';

@Injectable()
export class RecipeEffects {
    private readonly URL: string = "https://ng-course-recipe-book-e4d1a-default-rtdb.firebaseio.com/recipes.json";

    fetchRecipes = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipeActions.FETCH_RECIPES),
            switchMap(() => {
                return this.http.get<Recipe[]>(this.URL).pipe(
                    // Make sure that every recipe has at least an empty array of ingredients
                    map((recipes: Recipe[]) => {
                        return recipes.map(recipe => {
                            return { ...recipe, ingredients: recipe.ingredients.length > 0 ? recipe.ingredients : [] };
                        });
                    }),
                    // Return the action/store state
                    map((recipes: Recipe[]) => {
                        return RecipeActions.SET_RECIPES({
                            newRecipes: recipes
                        })
                    }),
                )
            })
        )
    );

    storeRecipes = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipeActions.STORE_RECIPES),
            withLatestFrom(this.store.select('recipes')),
            map(data => data[1].recipes),
            switchMap(recipes => {
                return this.http.put(this.URL, recipes);
            })
        ),
        { dispatch: false }
    );

    constructor(
        private store: Store<AppState>,
        private actions$: Actions,
        private http: HttpClient
    ) { }
}