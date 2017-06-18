import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TagServiceService {

constructor(private http: Http) { }

  // Get all recipe from the API
  getAllTags() {
    return this.http.get('/api/tag')
      .map(res => res.json());
  }

  //get recipe ById 3shan el edit
  getById(id){
    return this.http.get(`/api/tag/${id}`)
      .map(res => res.json());
  }

  UpdateById(id: string, tagData: any) {
    this.http.put('/api/tag/' + id, tagData).map(x => x.json()).subscribe();
  }

  AddTag(tagData: any) {
    console.log("tags     " + tagData.name)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(tagData);
    return this.http.post('/api/tag', body, options)
    .map((res: Response) => res.json());
  }

}
