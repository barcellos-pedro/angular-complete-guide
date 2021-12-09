import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', { static: false }) nameInput?: ElementRef;
  @ViewChild('amountInput', { static: false }) amountInput?: ElementRef;
  @Output() onAdd = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }
  
  add() {
    const name = this.nameInput?.nativeElement.value;
    const amount = this.amountInput?.nativeElement.value;
    this.onAdd.emit(new Ingredient(name, amount));
  }

}
