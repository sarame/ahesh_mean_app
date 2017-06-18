import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/homeServices/home.service';

@Component({
  selector: 'app-most-rated',
  templateUrl: './most-rated.component.html',
  styleUrls: ['./most-rated.component.css']
})
export class MostRatedComponent implements OnInit {

  userId = "";

  // instantiate posts to an empty array
  items: any = [];
  visitRecipes: any = [];


  constructor(private homeService: HomeService) { }

  ngOnInit() {

    this.homeService.getAllRecipes().subscribe(items => {
      this.items = items;
      // console.log(items);
    });
  }
  saveRecipeId(recId) {


    if (this.userId) {
      this.homeService.getAllVisitRecipe(this.userId).subscribe(rec => {


        var index = rec.indexOf(recId);    // <-- Not supported in <IE9
        if (index !== -1) {
          rec.splice(index, 1);
        }
        this.visitRecipes = rec;
        this.visitRecipes[this.visitRecipes.length] = recId;
        console.log(this.visitRecipes);

        this.homeService.putVisitRecipe(this.userId, { visitedRecipes: this.visitRecipes }).subscribe(d => {
          console.log(d);
        });

      });
    }



  }
}

