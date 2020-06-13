import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  getCourses(_id) {
    return this.http.get<{ success: boolean; count: number; pagination: any; data: any }>
      ('http://localhost:5000/api/v1/bootcamps/' + _id + '/courses')
  }
  createCourse() {
    return ""
  }
  updateCourse(_id){

  }
  deleteCourse(_id){
    
  }
}
