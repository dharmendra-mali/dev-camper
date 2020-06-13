import { Component, OnInit, OnDestroy } from '@angular/core';
import { Bootcamp } from '../bootcamp.model';
import { Course } from 'src/app/courses/course.modle';
import { BootcampService } from '../bootcamp.servies';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bootcamp-detail',
  templateUrl: './bootcamp-detail.component.html',
  styleUrls: ['./bootcamp-detail.component.css']
})
export class BootcampDetailComponent implements OnInit, OnDestroy {
  private bootcampesSub: Subscription;
  bootcampe: Bootcamp;
  courses: Course[] = []
  _id: string;

  constructor(
    private bootcampeService: BootcampService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {


    this.router.params.subscribe((params: Params) => {
      this._id = params['id']
      this.getFilterDataBootcampe(this._id)

      this.bootcampesSub = this.bootcampeService.getCourses(this._id).pipe(
        map(coursedata => {
          return {
            data: coursedata.data.map(objdata => {
              return {
                _id: objdata._id,
                title: objdata.title,
                description: objdata.description,
                weeks: objdata.weeks,
                tuition: objdata.tuition,
                minimumSkill: objdata.minimumSkill,
                scholarshipAvailable: objdata.scholarshipAvailable,
                createdAt: objdata.createdAt,
                bootcamp: objdata.bootcamp
              }
            })
          }
        })
      ).subscribe((Course) => {
        this.courses = Course.data
      })
    })

  }
  ngOnDestroy(): void {

    this.bootcampesSub.unsubscribe()
    this.courses = []
   
  }


  getFilterDataBootcampe(_id) {
    this.bootcampeService.getBootcamplocal().forEach(boot => {
      if (boot['_id'] === _id) {
        this.bootcampe = boot
      }
    })


  }


}
