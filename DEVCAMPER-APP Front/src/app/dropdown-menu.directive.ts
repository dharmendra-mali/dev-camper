import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[DropdownMenu]'
})
export class DropdownMenuDirective {
  // @HostBinding('class.show') isShow=false
  isShow=false
  constructor() { }

  @HostListener('click') 
  dropdownMenuShow(){
    console.log('click')
  this.isShow =!this.isShow;
  console.log('isShow = ', this.isShow);
  }
}
