import { Component, OnInit, OnDestroy } from '@angular/core';
import { Bootcamp } from '../bootcamp.model';
import { BootcampService } from '../bootcamp.servies';
import { Course } from 'src/app/courses/course.modle';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bootcamp-list',
  templateUrl: './bootcamp-list.component.html',
  styleUrls: ['./bootcamp-list.component.css']
})
export class BootcampListComponent implements OnInit, OnDestroy {

  isLoading = false;
  private bootcampesSub: Subscription;
  bootcampes: Bootcamp[] = [];

  constructor(private bootcampService: BootcampService) { }

  ngOnInit() {
    this.isLoading = true
    this.bootcampService.getBootcamps()
    this.bootcampesSub = this.bootcampService.getBootcampeUpdateListener().subscribe(
      (bootcampes: Bootcamp[]) => {
        this.isLoading = false
        this.bootcampes = bootcampes
      }
    )

  }

  ngOnDestroy() {
  this.bootcampesSub.unsubscribe()
  }
}
