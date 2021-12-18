import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', { static: false }) nameInput?: ElementRef;
  @ViewChild('amountInput', { static: false }) amountInput?: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }
  
  add() {
    const name = this.nameInput?.nativeElement.value;
    const amount = this.amountInput?.nativeElement.value;
    this.shoppingListService.addIngredient(new Ingredient(name, +amount));
  }

}
