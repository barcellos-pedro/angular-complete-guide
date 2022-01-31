import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription, switchMap, tap } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { AppState } from 'src/app/store/app.reducer';
import { Recipe } from '../recipe.model';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;
  isLoading: boolean = true;
  loadRecipeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    if (this.loadRecipeSubscription) {
      this.loadRecipeSubscription.unsubscribe();
    }
    this.store.dispatch(RecipeActions.STOP_EDITING());
  }

  onSubmit(): void {
    const { name, description, imagePath, ingredients } = this.recipeForm.value;
    const newRecipe = new Recipe(name, description, imagePath, ingredients);

    if (this.editMode) {
      this.store.dispatch(RecipeActions.UPDATE_RECIPE({
        updatedRecipe: newRecipe
      }));
    } else {
      this.store.dispatch(RecipeActions.ADD_RECIPE({
        newRecipe: newRecipe
      }));
    }

    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddIngredient(): void {
    let ingredientsFormArray = this.recipeForm.get('ingredients') as FormArray;

    ingredientsFormArray.push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onDeleteIngredient(index: number): void {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  onClearIngredients(): void {
    (this.recipeForm.get('ingredients') as FormArray).clear();
  }

  get ingredientControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private loadRecipe(): Observable<Recipe> {
    return this.route.params.pipe(
      map((params: Params) => +params['id']),
      tap(paramId => {
        this.id = paramId;
        this.editMode = !isNaN(paramId);
      }),
      switchMap(paramId => {
        return this.store.select('recipes').pipe(
          map(data => data.recipes[paramId])
        );
      })
    );
  }

  private initForm(): void {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    this.loadRecipeSubscription = this.loadRecipe().subscribe((loadedRecipe: Recipe) => {
      if (this.editMode || loadedRecipe) {
        recipeName = loadedRecipe?.name;
        recipeImagePath = loadedRecipe?.imagePath;
        recipeDescription = loadedRecipe?.description;

        if (loadedRecipe?.ingredients.length) {
          loadedRecipe?.ingredients.forEach((ingredient: Ingredient) => {
            recipeIngredients.push(new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            }))
          })
        }
      }

      this.recipeForm = new FormGroup({
        name: new FormControl(recipeName, Validators.required),
        imagePath: new FormControl(recipeImagePath, Validators.required),
        description: new FormControl(recipeDescription, Validators.required),
        ingredients: recipeIngredients
      });

      this.isLoading = false;
    });
  }

}
