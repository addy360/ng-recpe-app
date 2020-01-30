import { Component, OnInit,ViewChild,ElementRef,EventEmitter,Output } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('name',{static:false}) name:ElementRef;
  @ViewChild('amount',{static:false}) amount:ElementRef;
  @Output() ingredient = new EventEmitter<Ingredient>()
  constructor() { }

  ngOnInit() {
  }

  onAdd(){
  	const ingName = this.name.nativeElement.value
  	const ingAmount = this.amount.nativeElement.value
  	const newIng = new Ingredient(ingName,ingAmount)
  	this.ingredient.emit(newIng)
  }

}
