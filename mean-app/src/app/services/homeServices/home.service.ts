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

  getSearchRecipes() {
    return this.http.get('api/recipe/')
      .map(res => res.json());
  }

  getAllCourses() {
    return this.http.get('api/course/Three/')
      .map(res => res.json());
  }

  getAllRandomTags() {
    return this.http.get('api/tags/randam/')
      .map(res => res.json());
  }

  getAllVisitTags(id) {
    return this.http.get('api/user/visit/' + id)
      .map(res => res.json());
  }
  getAllRecipeInTag(tagId) {
    return this.http.get('api/tags/' + tagId)
      .map(res => res.json());

  }
  getAllVisitRecipe(userId) {
    return this.http.get('api/user/visitRec/' + userId)
      .map(res => res.json());

  }

   putVisitRecipe(userId,data) {
    return this.http.put('api/user/' + userId,data)
      .map(res => res.json());

  }

}
