import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable()
export class RecipeAddService {

  constructor(private http: Http) { }
 
 // Get all recipe from the API
  getAllRecipes() {
    return this.http.get('/api/recipe')
      .map(res => res.json());
  }

  getAllSections(){
    return this.http.get('api/section')
    .map(res => res.json()) ;
  }

  //get recipe ById 3shan el edit
  getById(id){
    return this.http.get(`/api/recipe/${id}`)
      .map(res => res.json());
  }

  UpdateById(id: string, recipeData: any) {
    this.http.put("/api/recipe/" + id, recipeData).map(x => x.json()).subscribe();
  }

  AddRecipe(recipeData: any) {
    let bodyString = JSON.stringify(recipeData); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    console.log("body string: " , bodyString) ;
 //   this.localStorageService.add('currentUser',user);  
        return this.http.post('/api/recipe', bodyString, options) // ...using post request
        .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
        .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  
}
