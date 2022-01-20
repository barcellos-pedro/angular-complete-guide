import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { IngredientsState } from './store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  ingredients$: Observable<IngredientsState>;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: IngredientsState }>
  ) { }

  onEditItem(index: number): void {
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnInit(): void {
    // Old way
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.subscription = this.shoppingListService.ingredientsChanged
    //   .subscribe((ingredients: Ingredient[]) => this.ingredients = ingredients);

    // NgRx
    this.ingredients$ = this.store.select('shoppingList');
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
}
