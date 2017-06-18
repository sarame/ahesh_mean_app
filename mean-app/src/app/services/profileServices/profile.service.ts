import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import "rxjs/add/operator/map";

@Injectable()
export class ProfileService {

  constructor(private http: Http) { }

  GetbyId(id: string) {
    return this.http.get('/api/user/' + id).map(x => x.json());
  }

  UpdateById(id: string, profileData: any) {
    this.http.put(`/api/user/${id}`, profileData).map(x => x.json()).subscribe();
  }
}
