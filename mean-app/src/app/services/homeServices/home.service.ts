import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService {

    constructor(private http: Http) { }

  // Get all posts from the API
  getAllPosts() {
    return this.http.get('api/recipe')
      .map(res => res.json());
  }

}
