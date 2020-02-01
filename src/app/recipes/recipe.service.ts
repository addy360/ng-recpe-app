import { EventEmitter, Injectable } from '@angular/core'

import { Recipe } from './recipe.model'
import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from '../shopping-list/shopping-list.service'

@Injectable()
export class RecipeService{
	constructor(private shoppingListService: ShoppingListService) {
		// code...
	}
	recipeSelected = new EventEmitter<Recipe>()
	private recipes:Recipe[] = [
		new Recipe('test recipe one','recipe one for testing purposes','../img/test.png',[new Ingredient('meat',2)]),
		new Recipe('test recipe two','recipe two for testing purposes','../img/test.png',[new Ingredient('chips',1)]),
	]

	getRecipe(){
		return this.recipes.slice()
	}

	addIngredient(ingredients:Ingredient[]){
		this.shoppingListService.addIngredients(ingredients)
	}

	findById(id:number){
		return this.recipes[id]
	}
}