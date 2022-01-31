import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  recipes: Recipe[] = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('recipes').subscribe(data => this.recipes = data.recipes);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
