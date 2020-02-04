import {  Injectable } from '@angular/core'
import { Subject } from 'rxjs'

import { Recipe } from './recipe.model'
import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from '../shopping-list/shopping-list.service'

@Injectable({
	providedIn:'root'
})
export class RecipeService{

	recipeChanged = new Subject<Recipe[]>()
	constructor(private shoppingListService: ShoppingListService) {
		// code...
	}
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

	addRecipe(recipe:Recipe){
		this.recipes.push(recipe)
		this.recipeChanged.next(this.recipes.slice())
	}

	updateRecipe(index:number, recipe:Recipe){
		this.recipes[index] = recipe
		this.recipeChanged.next(this.recipes.slice())
	}

	deleteRecipe(index:number){
		this.recipes.splice(index,1)
		this.recipeChanged.next(this.recipes.slice())
	}
}