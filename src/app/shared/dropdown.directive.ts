import { Directive, HostListener, HostBinding,ElementRef } from '@angular/core'


@Directive({
	selector:'[appDropdown]'
})
export class dropdownDirective{
	constructor(private elementRef:ElementRef) {
	}
	@HostBinding('class.show') isOpen = false
	@HostListener('click') toggleOpen(){
		this.isOpen = !this.isOpen
	}


}