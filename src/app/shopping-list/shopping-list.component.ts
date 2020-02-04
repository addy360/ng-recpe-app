import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'

import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from './shopping-list.service'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  // providers:[ShoppingListService]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  iGsub:Subscription;
  ingredients:Ingredient[] 
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients()
    this.iGsub = this.shoppingListService.ingredientsChanged.subscribe((ing:Ingredient[])=>{
      this.ingredients = ing
    })
  }

  onEdit(idx){
    this.shoppingListService.startedEditing.next(idx)
    // console.log(idx)
  }

  ngOnDestroy(){
    this.iGsub.unsubscribe()
  }
  

}
