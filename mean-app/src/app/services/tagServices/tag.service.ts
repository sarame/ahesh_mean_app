import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import "rxjs/add/operator/map";

@Injectable()
export class TagService {

  constructor(private http: Http) { }

  GetAllTags() {
    return this.http.get("/api/tags").map(x => x.json());
  }
}
