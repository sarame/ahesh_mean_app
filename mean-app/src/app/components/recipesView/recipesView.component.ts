import { Component, OnInit, Input, OnChanges, DoCheck } from '@angular/core';

import { ActivatedRoute } from "@angular/router"



@Component({
  selector: 'app-recipesView',
  templateUrl: './recipesView.component.html',
  styleUrls: ['./recipesView.component.css']
})
export class RecipesViewComponent implements OnInit, DoCheck {
  @Input() recipes: any;
  @Input() user: any;
  @Input() recipesFlag: boolean;
  
  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
  
  }
  ngOnChanges() {

  }
  ngDoCheck() {
    // console.log("from review");
    // console.log(this.user);
  }
 DelRecipe(index: number ) {
    this.recipes.splice(index, 1);
  }

  unlikeRecipe(index: number ) {
    if(this.route.snapshot.params["type"]!=="allRecipes")
    this.recipes.splice(index, 1);
  }

}


