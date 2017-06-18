import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class IngredientService {
constructor(private http: Http) { }
 
 // Get all recipe from the API
  getAllIngredients() {
    return this.http.get('/api/ingredient')
      .map(res => res.json());
  }

  //get recipe ById 3shan el edit
  getById(id){
    return this.http.get(`/api/ingredient/${id}`)
      .map(res => res.json());
  }

  UpdateById(id: string, ingredientData: any) {
    this.http.put('/api/ingredient/' + id, ingredientData).map(x => x.json()).subscribe();
  }

  AddIngredients(ingredientData: any) {
    console.log("ingerdientsss     " + ingredientData.name)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(ingredientData);
    return this.http.post('/api/ingredient', body, options)
    .map((res: Response) => res.json());
  }
}
