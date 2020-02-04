import { Ingredient } from '../shared/ingredient.model'
import { Subject } from 'rxjs'
// import { EventEmitter } from '@angular/core'

export class ShoppingListService{
	// ingredientsChanged = new EventEmitter<Ingredient[]>()
  ingredientsChanged = new Subject<Ingredient[]>()
  startedEditing = new Subject<number>()
	private ingredients:Ingredient[]=[
  	new Ingredient('apples',10),
  	new Ingredient('tomatoes',20),
  ] 

  getIngredients(){
  	return this.ingredients.slice()
  }

  addIngredient(ing:Ingredient){
  	this.ingredients.push(ing)
  	this.ingredientsChanged.next(this.ingredients.slice())
  }

  addIngredients(ingredients:Ingredient[]){
  	this.ingredients.push(...ingredients)
  	this.ingredientsChanged.next(this.ingredients.slice())
  }

  getIngredient(index){
    return this.ingredients[index]
  }

  updateIngredient(index:number, ing:Ingredient){
    this.ingredients[index] = ing
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  deleteIngredient(index:number){
    this.ingredients.splice(index,1)
    this.ingredientsChanged.next(this.ingredients.slice())
  }
}