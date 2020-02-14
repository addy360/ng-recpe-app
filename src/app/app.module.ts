import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import  {FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { dropdownDirective } from './shared/dropdown.directive'
import { ShoppingListService } from './shopping-list/shopping-list.service'
import { AppRoutesModule } from './routin-module/app-routes.module';
import { AuthComponent } from './auth/auth.component'
import { SpinnerComponent } from './shared/spinner/spinner.component'
import { AuthInterceptorService } from './auth/authInterceptor.service'
import { RecipesModule } from './recipes/recipes.module'
import { ShoppingListModule } from './shopping-list/shopping-ListModule'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    dropdownDirective,
    AuthComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutesModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecipesModule,
    ShoppingListModule
  ],
  providers: [ShoppingListService, {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptorService, multi:true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
