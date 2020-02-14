import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'

import { RecipeService } from '../recipe.service'
// model
import {Recipe} from '../recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  subscription:Subscription;
  constructor(private recipeService: RecipeService) { }
	recipes:Recipe[]

  ngOnInit() {
  	this.subscription= this.recipeService.recipeChanged
  	.subscribe(recipes=>{
  		// console.log(recipes)
  		this.recipes = recipes
  	})
    this.recipes  = this.recipeService.getRecipe()
  }

 ngOnDestroy(){
 	this.subscription.unsubscribe()
 }

}
