import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap, tap } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';

import { Recipe } from '../recipe.model';
import * as RecipeActions from '../store/recipe.actions';
import * as ShppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.loadRecipe();
  }

  private loadRecipe() {
    this.route.params.pipe(
      map((params: Params) => +params['id']),
      tap(paramId => this.id = paramId),
      switchMap(id => {
        return this.store.select('recipes').pipe(
          map(data => data.recipes[id])
        );
      })
    ).subscribe(loadedRecipe => this.recipe = loadedRecipe);
  }

  toShoppingList(): void {
    this.store.dispatch(ShppingListActions.ADD_INGREDIENTS({
      newIngredients: this.recipe.ingredients
    }))
    this.router.navigate(['/shopping-list']);
  }

  onEdit(): void {
    this.store.dispatch(RecipeActions.START_EDITING({ index: this.id }));
    this.router.navigate(['./edit'], { relativeTo: this.route });
  }

  onDelete(): void {
    this.store.dispatch(RecipeActions.START_EDITING({ index: this.id }));
    this.store.dispatch(RecipeActions.DELETE_RECIPE());
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
