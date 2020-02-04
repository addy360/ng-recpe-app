import { Component, OnInit,ViewChild,ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Subscription } from 'rxjs'

import { Ingredient } from '../../shared/ingredient.model'
import { ShoppingListService } from '../shopping-list.service'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy{
  @ViewChild('f',{static:false}) form:NgForm
  editMode = false
  subscription:Subscription;
  ItemEditedIdx:number; 
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
    .subscribe(index=>{
      this.ItemEditedIdx = index
      this.editMode = true
      const editI = this.shoppingListService.getIngredient(index)
      this.form.setValue({
        name:editI.name,
        amount:editI.amount
      })
      // console.log(editI)
    })
  }

  onAdd(form:NgForm){
  	const ingName = form.value.name
  	const ingAmount = form.value.amount
  	const newIng = new Ingredient(ingName,ingAmount)
    console.log(form)
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.ItemEditedIdx,newIng)
    }else{
      this.shoppingListService.addIngredient(newIng)
    }
    form.reset()
    this.editMode = false
  }

  onClear(){
    this.form.reset()
    this.editMode = false
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.ItemEditedIdx)
    this.onClear()
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }


}
