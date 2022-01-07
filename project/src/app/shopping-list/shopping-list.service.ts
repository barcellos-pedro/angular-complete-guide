import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";

@Injectable()
export class ShoppingListService {

    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

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

    getIngredient(index: number): Ingredient {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient): void {
        this.ingredients.push(ingredient);
        this.changeIngredients();
    }

    addIngredients(ingredientsList: Ingredient[]): void {
        this.ingredients = [...this.ingredients, ...ingredientsList];
        this.changeIngredients();
    }

    updateIngredient(index: number, newIngredient: Ingredient): void {
        this.ingredients[index] = newIngredient;
        this.changeIngredients();
    }

    deleteIngredient(index: number): void {
        this.ingredients.splice(index, 1);
        this.changeIngredients();
    }

    changeIngredients(): void {
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}