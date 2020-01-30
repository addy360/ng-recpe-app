import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	selected:string = 'recipe'
	chooseRoute(route:string){
		this.selected = route
	}
}
