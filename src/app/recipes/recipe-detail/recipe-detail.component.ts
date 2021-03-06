import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model'
import { RecipeService } from '../recipe.service'
import { ActivatedRoute, Router } from '@angular/router'
import { DropDrownService } from '../../shared/drop-down.service'

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  providers:[DropDrownService]
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;
  id:number
  constructor(private recipeServive:RecipeService,
               private route:ActivatedRoute, 
               private router:Router,
               public dropDownService:DropDrownService ) {
   }
   isShow = true
  ngOnInit() {
  		this.route.params.subscribe(params=>{
        this.id = +params['id']
        this.recipe = this.recipeServive.findById(this.id)
        // console.log("from subscription "+this.recipe);
      })
  }

  onAddToShopping(){
    this.recipeServive.addIngredient(this.recipe.ingredient)
  }

  onDelete(){
    this.recipeServive.deleteRecipe(this.id)
    this.router.navigate(['../'],{relativeTo:this.route})
  }

  onToggleDropdown(){
    return this.dropDownService.toggleShow()
  }

}
