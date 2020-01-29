import { Component, OnInit } from '@angular/core';
// model
import {Recipe} from '../recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
	recipes:Recipe[] = [
		new Recipe('test recipe','recipe for testing purposes','../img/test.png'),
		new Recipe('test recipe','recipe for testing purposes','../img/test.png'),
		new Recipe('test recipe','recipe for testing purposes','../img/test.png'),
		new Recipe('test recipe','recipe for testing purposes','../img/test.png'),
	]
  constructor() { }

  ngOnInit() {
  }

}
