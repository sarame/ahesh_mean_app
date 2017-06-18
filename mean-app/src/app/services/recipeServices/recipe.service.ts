import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import "rxjs/add/operator/map";

@Injectable()
export class RecipeService {
  private userId = "59175dff871f492068d93127";
  constructor(private http: Http) { }

  GetAllRecipes(recipeType: string) {
    if (recipeType == "allRecipes")
      return this.http.get("/api/recipe").map(x => x.json());
    else if (recipeType == "fevRecipes")
      return this.http.get("/api/user/fevRecipes/" + this.userId).map(x => x.json());
    else if(recipeType == "myRecipes")
      return this.http.get("/api/user/myRecipes/" + this.userId).map(x => x.json());
  }
}
