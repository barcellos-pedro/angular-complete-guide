import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/app.reducer';

import { START_EDITING } from './store/shopping-list.actions';
import { ShoppingListState } from './store/shopping-list.reducer';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {

  ingredients$: Observable<ShoppingListState>;

  constructor(
    // The Store Generic <> will be the object declared in the StoreModule.forRoot(...) on app.module
    private store: Store<AppState>
  ) { }

  onEditItem(index: number): void {
    this.store.dispatch(START_EDITING({
      index: index
    }))
  }

  ngOnInit(): void {
    this.ingredients$ = this.store.select('shoppingList');
  }
}
