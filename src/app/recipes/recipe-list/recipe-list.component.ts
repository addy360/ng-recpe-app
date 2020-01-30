import { Component, OnInit,EventEmitter,Output } from '@angular/core';
// model
import {Recipe} from '../recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
	recipes:Recipe[] = [
		new Recipe('test recipe one','recipe one for testing purposes','../img/test.png'),
		new Recipe('test recipe two','recipe two for testing purposes','../img/test.png'),
	]

	@Output() selectedRecipe = new EventEmitter<Recipe>()
  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe:Recipe){
  	this.selectedRecipe.emit(recipe)
  }

}
