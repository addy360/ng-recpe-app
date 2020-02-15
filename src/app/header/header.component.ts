import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs'
import { DataStorageService } from '../shared/dataStorage.service'
import { AuthService } from '../auth/auth.service'
import { DropDrownService } from '../shared/drop-down.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[DropDrownService]
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private dataStorageService:DataStorageService, 
              private authService:AuthService,
              public dropDownService:DropDrownService) { }
  private userSub:Subscription
  isAuth = false
  collapse:boolean = false
  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user=>{
      this.isAuth = user ? true : false
    })

  }

  onToggleDropdown(){
    this.dropDownService.toggleShow()
    // console.log(this.dropDownService.isShow)
  }

  onSave(){
  	this.dataStorageService.storeRecipes()
  }

  onFetch(){
  	this.dataStorageService.fetchRecipe()
  	.subscribe()  }

  onLogout(){
    this.authService.logout()
  }

  toggleShow(){
    this.collapse = !this.collapse
  }

  
  ngOnDestroy(){
    this.userSub.unsubscribe()
  }


}
