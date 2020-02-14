import { Component } from '@angular/core'
import { AuthService } from './auth.service'
import { Router } from '@angular/router/'

@Component({
	selector:'app-auth',
	templateUrl:'./auth.component.html'
})
export class AuthComponent{
	constructor(private authService:AuthService, private router:Router) {}
	isLogIn = true
	isLoading = false
	error:string = null
	onAuth(){
		this.isLogIn = !this.isLogIn
	}

	onSubmit(form){
		// console.log(form)
		const {email, password} = form.value
		form.reset()
		this.isLoading = !this.isLoading
		if(this.isLogIn){
			this.authService.login(email,password)
			.subscribe(res=>{
				console.log(res)
				this.isLoading = !this.isLoading
				this.router.navigate(['/recipes'])
			},err=>{
				// console.log(err)
				this.isLoading = !this.isLoading
				this.error=err
				setTimeout(()=>this.error = null,3000)
			})
		}else{	
			this.authService.signup(email,password)
			.subscribe(res=>{
				this.isLoading = !this.isLoading
				this.router.navigate(['/recipes'])
				// console.log(res)
			},err=>{
				this.isLoading = !this.isLoading
				this.error=err
				setTimeout(()=>this.error = null,3000)
			})
		}
	}
}