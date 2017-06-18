import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UnitTypeService {

  constructor(private http: Http) { }

  // Get all recipe from the API
  getAllUnits() {
    return this.http.get('/api/unittypes')
      .map(res => res.json());
  }

  //get recipe ById 3shan el edit
  getById(id){
    return this.http.get(`/api/unittypes/${id}`)
      .map(res => res.json());
  }

  UpdateById(id: string, unitData: any) {
    this.http.put('/api/unittypes/' + id, unitData).map(x => x.json()).subscribe();
  }

  AddTag(unitData: any) {
    console.log("tags     " + unitData.name)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(unitData);
    return this.http.post('/api/unittypes', body, options)
    .map((res: Response) => res.json());
  }
}
