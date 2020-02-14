import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { catchError, tap } from 'rxjs/operators'
import { throwError, Subject, BehaviorSubject } from 'rxjs'
import { User } from './user.model'
import { environment } from '../../environments/environment'

@Injectable({
	providedIn:'root'
})
export class AuthService{
	constructor(private http:HttpClient, private router:Router) {}
	user = new BehaviorSubject<User>(null)
	expTimer:any
	signup(email:string, password:string){
		return this.http.post<AuthDataResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.API_KEY}`,
		{
			email,
			password,
			returnSecureToken:true
		})
		.pipe(
			catchError(err=>{
			let errmsg = "Unknown error"
			if (err.error.error.message) {
				switch (err.error.error.message) {
					case "EMAIL_EXISTS":
						errmsg = "E-mail is already in use."
						break;
				}
				return throwError(errmsg)	
			}else{
				return throwError(err)
			}
		}),
		tap(res=>{
			// returned value in res is in string (3600s)
			const expiresIn = new Date(new Date().getTime()+ +res.expiresIn *1000)
			const user = new User(res.email,res.localId,res.idToken,expiresIn)
			localStorage.setItem('user',JSON.stringify(user))
			this.user.next(user)
			this.autoLogout(+res.expiresIn*1000)
		}))
	}

	autoLogin(){
		const userData:{
			email:string,
			id:string,
			_token:string,
			_expdate:string
		} = JSON.parse(localStorage.getItem('user'))
		if(!userData){
			return
		}

		const loadedUser = new User(userData.email,userData.id,userData._token, new Date(userData._expdate))
		if (loadedUser.token) {
			this.user.next(loadedUser)
			const exptime = new Date(userData._expdate).getTime() - new Date().getTime()
			this.autoLogout(exptime)
		}
	}

	login(email:string, password:string){
		return this.http.post<AuthDataResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.API_KEY}`,
		{
			email,
			password,
			returnSecureToken:true
		})
		.pipe(
			catchError(err=>{
			let errmsg = "Unknown error"
			if (err.error.error.message) {
				switch (err.error.error.message) {
					case "EMAIL_NOT_FOUND":
						errmsg = "No user with this E-mail."
						break;
					case "INVALID_PASSWORD":
						errmsg = "Wrong password."
						break;
				}
				return throwError(errmsg)	
			}else{
				return throwError(err)
			}
		}),
			tap(res=>{
			// returned value in res is in string (3600s)
			const expiresIn = new Date(new Date().getTime()+ +res.expiresIn *1000)
			const user = new User(res.email,res.localId,res.idToken,expiresIn)
			localStorage.setItem('user',JSON.stringify(user))
			this.user.next(user)
			this.autoLogout(+res.expiresIn *1000)
		}))

	}

	logout(){
		if (!this.user) {
			return
		}
		this.user.next(null)
		this.router.navigate(['/auth'])
		localStorage.removeItem('user')
		if (this.expTimer) {
			clearTimeout(this.expTimer )
		}

		this.expTimer = null
	}

	autoLogout(expDuration:number){
		this.expTimer = setTimeout(()=>{
			this.logout()
		},expDuration)
		console.log(this.expTimer)

	}
}	




interface AuthDataResponse{
	idToken:string
	email:string,
	refreshToken:string,
	expiresIn:string,
	localId:string,
	displayName?:string,
	registered?:boolean
}