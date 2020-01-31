import { Component, OnInit , Input} from '@angular/core';
import { RecipeService } from '../../recipe.service'

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],

})
export class RecipeItemComponent implements OnInit {
  @Input('input') i=null
  constructor(private recipeService:RecipeService) {
    // code...
  }
  ngOnInit() {
  }

  onSelected(){
    this.recipeService.recipeSelected.emit(this.i)
    // console.log(this.i)
  }

}
