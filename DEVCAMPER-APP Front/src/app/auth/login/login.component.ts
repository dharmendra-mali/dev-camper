import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  onKeyPress(event) {
     let x= parseInt(event.key)
     console.log(x)
    if(x > 60 || x< 0.01)
    {
      console.log('it  false');
      return false;
    }
    else
    {
      return true
    }
      
  }
}
