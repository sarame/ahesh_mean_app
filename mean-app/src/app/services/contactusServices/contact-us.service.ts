import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactUsService {

  constructor(private http: Http) { }

  AddContactUs(contactusData: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(contactusData);
    return this.http.post('/api/contactus', body, options)
      .map((res: Response) => res.json());
  }

}
