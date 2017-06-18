import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class CoursesService {

 constructor(private http: Http) { }
 
 // Get all courses from the API
  getAllCourses() {
    return this.http.get('/api/courses')
      .map(res => res.json());
  }
  getById(id){
    return this.http.get(`/api/courses/${id}`)
      .map(res => res.json());
  }
  

}
