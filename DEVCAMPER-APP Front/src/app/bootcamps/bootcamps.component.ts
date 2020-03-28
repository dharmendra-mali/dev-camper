import { Component, OnInit } from '@angular/core';
import { BootcampService } from './bootcamp.servies';

@Component({
  selector: 'app-bootcamps',
  templateUrl: './bootcamps.component.html',
  styleUrls: ['./bootcamps.component.css']
  
})
export class BootcampsComponent implements OnInit {
  pagenation;
  constructor(private bootcampServiece: BootcampService) { }

  ngOnInit(): void {
   this.pagenation= this.bootcampServiece.pagination.previous
  }

}
