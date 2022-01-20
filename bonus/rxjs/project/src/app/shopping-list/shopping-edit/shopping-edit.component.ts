import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';

import { ShoppingListService } from '../shopping-list.service';
import { ADD_INGREDIENT } from '../store/shopping-list.actions';
import { IngredientsState } from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('form', { static: false }) shoppingListForm: NgForm;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: IngredientsState }>
  ) { }

  ngOnInit(): void {
    this.listenToEditing();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  listenToEditing(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.shoppingListForm?.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }

  onSubmit(form: NgForm): void {
    let { name, amount } = form.value;
    const newIngredient = new Ingredient(name, +amount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      // this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(ADD_INGREDIENT({
        newIngredient: newIngredient
      }));
    }

    this.onClear();
  }

  onDelete(): void {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  onClear(): void {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

}
