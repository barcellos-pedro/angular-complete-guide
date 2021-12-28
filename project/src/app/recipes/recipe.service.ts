import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('A Test Recipe',
            'This is simply a test',
            'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fires', 24)
            ]),
        new Recipe('A Test Recipe 2',
            'This is simply a second test',
            'https://i2.wp.com/mercadoeconsumo.com.br/wp-content/uploads/2019/04/Que-comida-saud%C3%A1vel-que-nada-brasileiro-gosta-de-fast-food-1024x683.jpg',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1)
            ])
    ];

    constructor(private shoppingListService: ShoppingListService) {}

    /**
     * 
     * @returns A copy of recipes array
     */
    getRecipes(): Recipe[] {
        return this.recipes.slice();
    }

    getRecipe(id: number): Recipe | undefined {
        return this.getRecipes()[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]): void {
        this.shoppingListService.addIngredients(ingredients);
    }
}