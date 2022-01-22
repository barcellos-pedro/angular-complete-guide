import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { AppState } from 'src/app/store/app.reducer';

import { ADD_INGREDIENT, DELETE_INGREDIENT, STOP_EDITING, UPDATE_INGREDIENT } from '../store/shopping-list.actions';
import { ShoppingListState } from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  editMode = false;
  editedIngredient: Ingredient;
  @ViewChild('form', { static: false }) shoppingListForm: NgForm;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.listenToEditing();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(STOP_EDITING());
  }

  listenToEditing(): void {
    this.subscription = this.store.select('shoppingList').subscribe((state: ShoppingListState) => {
      if (state.editedIngredientIndex == -1) {
        this.editMode = false;
      } else {
        this.editMode = true;
        this.editedIngredient = state.editedIngredient;
        this.shoppingListForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
        });
      }
    });
  }

  onSubmit(form: NgForm): void {
    let { name, amount } = form.value;
    const newIngredient = new Ingredient(name, +amount);

    if (this.editMode) {
      this.store.dispatch(UPDATE_INGREDIENT({
        newIngredient: newIngredient
      }));
    } else {
      this.store.dispatch(ADD_INGREDIENT({
        newIngredient: newIngredient
      }));
    }

    this.onClear();
  }

  onDelete(): void {
    this.store.dispatch(DELETE_INGREDIENT());
    this.onClear();
  }

  onClear(): void {
    this.editMode = false;
    this.shoppingListForm.reset();
    this.store.dispatch(STOP_EDITING());
  }
}
