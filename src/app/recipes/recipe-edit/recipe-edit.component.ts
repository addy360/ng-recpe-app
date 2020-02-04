import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FormGroup, FormControl, FormArray } from '@angular/forms'

import { RecipeService } from '../recipe.service'
import { Recipe } from '../recipe.model'

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
	id:number
	editMode = false
  recipeForm:FormGroup
  constructor(private route:ActivatedRoute, private recipeService:RecipeService, private router:Router) { }

  ngOnInit() {
  	this.route.params.subscribe(params=>{
  		this.id = +params['id']
  		this.editMode = params['id'] != null
  		// console.log(this.editMode)
      this.initForm()
  	})
  }

  private initForm(){
    let recipeName = ''
    let imgPath = ''
    let description = ''
    let recipeIngredients = new FormArray([])
    if (this.editMode) {
      const recipe = this.recipeService.findById(this.id)
      recipeName = recipe.name
      imgPath = recipe.imgPath
      description = recipe.description
      console.log(recipe)
      if (recipe['ingredient']) {
        for(let ingredient of recipe.ingredient){
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name),
            'amount': new FormControl(ingredient.amount),
          }))
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name':new FormControl(recipeName),
      'imgPath':new FormControl(imgPath),
      'description': new FormControl(description),
      'ingredients':recipeIngredients
    })
  }

  onSubmit(){
    // console.log(this.recipeForm)
    const newRecipe = new Recipe(this.recipeForm.value['name'], 
      this.recipeForm.value['description'],
      this.recipeForm.value['imgPath'],
      this.recipeForm.value['ingredients'])
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id,newRecipe)
    }else{
      this.recipeService.addRecipe(newRecipe)
    }
    this.onCancel()
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(),
      'amount': new FormControl(),
    }))
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo:this.route})
  }
  onDelete(index){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

}
