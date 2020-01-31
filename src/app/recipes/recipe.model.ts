import { Ingredient } from '../shared/ingredient.model'

export class Recipe{
	public name: string;
	public description: string;
	public imgPath: string;
	public ingredient:Ingredient[]

	constructor(name:string, description:string, imgPath:string, ingredient:Ingredient[]) {
		this.name = name
		this.description = description
		this.imgPath = imgPath
		this.ingredient = ingredient
	}
}