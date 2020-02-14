import { Injectable } from '@angular/core'


export class DropDrownService{
	isShow:boolean = false

	toggleShow(){
		return this.isShow=!this.isShow
		console.log(this.isShow)
	}
}