import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { RecipesComponent } from '../recipes/recipes.component'
import { RecipeStartComponent } from '../recipes/recipe-start/recipe-start.component'
import { RecipeDetailComponent } from '../recipes/recipe-detail/recipe-detail.component'
import { RecipeEditComponent } from '../recipes/recipe-edit/recipe-edit.component'
import { RecipeResolverService } from '../recipes/recipe-resolver.service'
import { AuthGuard } from '../auth/auth-guard' 

const routes:Routes = [
	{path: 'recipes', canActivate:[AuthGuard] , component:RecipesComponent, children:[
		{ path: '', component: RecipeStartComponent },
		{path:'new', component:RecipeEditComponent},
		{path:':id', component:RecipeDetailComponent, resolve:[RecipeResolverService]},
		{path:':id/edit', component:RecipeEditComponent, resolve:[RecipeResolverService]},
	]}
]

@NgModule({
	imports:[
		RouterModule.forChild(routes)
	],
	exports:[RouterModule]
})
export class RecipesRoutingModule{}