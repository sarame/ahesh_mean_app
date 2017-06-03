import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService {


  constructor(private http: Http) { }
  // Get all posts from the API
  getAllRecipes() {
    return this.http.get('api/recipe/most/')
      .map(res => res.json());
  }

  getAllCourses() {
    return this.http.get('api/course/Three/')
      .map(res => res.json());
  }
  
  getAllTags() {
    return this.http.get('api/tags/randam/')
      .map(res => res.json());
  }

}
