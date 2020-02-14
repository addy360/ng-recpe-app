import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { map, tap, take, exhaustMap } from 'rxjs/operators'
import { RecipeService } from '../recipes/recipe.service'
import { Recipe } from '../recipes/recipe.model'
import { AuthService } from '../auth/auth.service'

@Injectable({
	providedIn:'root'
})
export class DataStorageService{
	constructor(private recipeService:RecipeService, private http:HttpClient, private authService:AuthService){}
	public storeRecipes(){
		const recipes = this.recipeService.getRecipe()
		this.http.put('https://ng-indigo.firebaseio.com/recipes.json',recipes)
		.subscribe(res=>{
			// console.log(res)
		})
	}

	public fetchRecipe(){
			return this.http.get<Recipe[]>('https://ng-indigo.firebaseio.com/recipes.json')
			.pipe(
				map(recipes=>{
					return recipes.map(item=>{
						return {
							...item, ingredients:item.ingredient?item.ingredient:[]
						}
					})
				}),
				tap(recipes=>{
			  		this.recipeService.setRecipes(recipes)

				})
			)
	}
}
