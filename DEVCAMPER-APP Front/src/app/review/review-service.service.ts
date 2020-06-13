import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewServiceService {

  constructor(private http: HttpClient) { }

  getReview(_id) {
    return this.http.get<{ success: boolean; count: number; pagination: any; data: any }>
      ('http://localhost:5000/api/v1/bootcamps/' + _id + '/courses')
  }
  createReview() {
    return ""
  }
  updateReview(_id){

  }
  deleteReview(_id){
    
  }
}
