import { EventEmitter, Injectable } from "@angular/core";

import { Ingredient } from "../shared/ingredient.model";

@Injectable()
export class ShoppingListService {

    ingredientsChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatos', 10)
    ];

    /**
     * 
     * @returns A copy of ingredients array
     */
    getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient): void {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

    addIngredients(ingredientsList: Ingredient[]): void {
        this.ingredients = [...this.ingredients, ...ingredientsList];
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
}