import { Component, OnInit, HostListener, HostBinding } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isShow=false;
  constructor() { }

  ngOnInit(): void {
    const code1 = fromEvent(document,'click')
    code1.subscribe()
  }
  // @HostListener('click') 
  dropdownMenuShow(){
    console.log('click')
  this.isShow =!this.isShow;
  
  }
  

 
}
