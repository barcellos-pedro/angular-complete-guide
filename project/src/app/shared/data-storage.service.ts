import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { Recipe } from "../recipes/recipe.model";

import { RecipeService } from "../recipes/recipe.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    private readonly URL: string = "https://ng-course-recipe-book-e4d1a-default-rtdb.firebaseio.com/recipes.json";

    constructor(
        private http: HttpClient,
        private recipesService: RecipeService
    ) { }

    storeRecipes() {
        const recipes = this.recipesService.getRecipes();
        // Firebase enable us to send an PUT to override all data stored
        this.http.put(this.URL, recipes).subscribe();
    }

    fetchRecipes(): Observable<Recipe[]>{
        return this.http.get<Recipe[]>(this.URL)
            .pipe(
                // Make sure that every recipe has at least an empty array of ingredients
                map(data => {
                    return data.map(recipe => {
                       return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                    });
                }),
                tap(data => this.recipesService.setRecipes(data))
            );
    }
}