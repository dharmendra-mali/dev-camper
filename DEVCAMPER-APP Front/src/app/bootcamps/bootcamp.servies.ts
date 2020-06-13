import { Bootcamp } from './bootcamp.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../courses/course.modle';
import { map } from "rxjs/operators";
import { Key } from 'protractor';
import { Subject } from 'rxjs';
@Injectable()
export class BootcampService {

  private bootcampes: Bootcamp[] = [
    // new Bootcamp(
    //   '1', 'Devworks Bootcamp',
    //   'devworks_bootcamp', 'discription', 'website',
    //   'phone', 'email', 'Boston, MA',
    //   ['Web Development', 'UI/UX', 'Mobile Development'],
    //   8.8, 22000, 'no-photo.jpg', true, true, true, true, 
    //   new Date("2020-02-19T07:35:21.283Z"), '2')

  ]
  private bootcampesUpdated = new Subject<Bootcamp[]>();
 
  pagination = {
    previous: false


  }
  
  
 
  constructor(private http: HttpClient) { }

  getBootcamplocal() {
    return this.bootcampes.slice()


  }

  getCourses(_id) {
    return this.http.get<{ success: boolean; count: number; pagination: any; data: any }>
    ('http://localhost:5000/api/v1/bootcamps/' + _id + '/courses')
  }
  getBootcamps() {

    return this.http.get<{ success: boolean; count: number; pagination: any; data: any }>
      ('http://localhost:5000/api/v1/bootcamps').
      pipe(
        map(bootdata => {
          
          return {
            data: bootdata.data.map(objdata => {

              return {
                _id: objdata._id,
                name: objdata.name,
                slug: objdata.slug,
                description: objdata.description,
                website: objdata.website,
                phone: objdata.phone,
                email: objdata.email,
                address: objdata.address,
                careers: objdata.careers,
                averageRating: objdata.averageRating,
                averageCost: objdata.averageCost,
                photo: objdata.phone,
                housing: objdata.housing,
                jobAssistance: objdata.jobAssistance,
                jobGuarantee: objdata.jobGuarantee,
                acceptGi: objdata.acceptGi,
                createdAt: objdata.createdAt,
                user: objdata.user
              }
            })
          }

        }
        )
      )
      .subscribe(data => {
        this.bootcampes = data.data
        this.bootcampesUpdated.next([...this.bootcampes])
      })


  }
  getBootcampeUpdateListener() {
    return this.bootcampesUpdated.asObservable();
  }
  createBootcampe() {
    return ""
  }
  updateBootcamp(_id){

  }
  deleteBootcamp(_id){

  }
}