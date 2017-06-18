import { Component, OnInit, DoCheck, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import { TagService } from '../../services/tagServices/tag.service';
import { RecipeService } from '../../services/recipeServices/recipe.service';

@Component({
  selector: 'app-filter',
  providers: [TagService, RecipeService],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, DoCheck {
  @Output() sendRecipes: EventEmitter<any> = new EventEmitter<any>();
  keyword: string = '';
  @Input() recipeTypeFav: string;
  @Input() recipeType: string;
  tags: any;
  filteredTags: any[];
  private recipesApi: any;
  private tagApi: any;
  recipes: any;
  calorieFilter: number = 1000;
  rankFilter: number = 0;
  filtersId: string[] = [];

  constructor(private tagService: TagService, private recipeService: RecipeService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    console.log("type: " + this.route.snapshot.params["type"]);
    if (this.route.snapshot.params["type"]) {
      this.recipesApi = this.recipeService.GetAllRecipes(this.route.snapshot.params["type"]);
      this.recipesApi.subscribe(x => {
        this.recipes = x;
      });

    }
    else if (this.recipeType) {

      this.recipesApi = this.recipeService.GetAllRecipes(this.recipeType);
      this.recipesApi.subscribe(x => {
        this.recipes = x;
      });


    }
    this.tagApi = this.tagService.GetAllTags();
    this.tagApi.subscribe(x => this.tags = x);
  }

  ngDoCheck() {
    // console.log(this.recipes);
    this.sendRecipes.emit(this.recipes);
  }



  checkFilters(tagId: string) {
    if (this.filtersId.indexOf(tagId) > -1)
      return true;
    else
      return false;
  }

  chooseTag(event) {
    debugger;
    if (this.keyword === "" && event.target.checked) {
      var tagId = event.target.attributes["value"].value;

      this.recipes = this.recipes.filter(item => item.tags.findIndex(tag => tag._id === tagId) !== -1
        && item.totalCalories <= this.calorieFilter && item.avgRate >= this.rankFilter);

      this.filtersId.push(event.target.attributes["value"].value);
    }
    else if (this.keyword !== "" && event.target.checked) {
      var tagId = event.target.attributes["value"].value;

      this.recipes = this.recipes.filter(item => item.tags.findIndex(tag => tag._id === tagId) !== -1
        && item.totalCalories <= this.calorieFilter && item.avgRate >= this.rankFilter
        && (item.name.toLowerCase().includes(this.keyword.toLowerCase()) ||
          item.tags.filter(tag => tag.name.toLowerCase().includes(this.keyword.toLowerCase())).length >= 1));

      this.filtersId.push(event.target.attributes["value"].value);
    }
    else {
      var index = this.filtersId.indexOf(event.target.attributes["value"].value);
      this.filtersId.splice(index, 1);
      if (this.keyword === "" && this.filtersId.length >= 1) {
        this.recipesApi.subscribe(x => {
          this.recipes = x;
          this.recipes = this.recipes.filter(item =>
            item.tags.filter(tag => this.filtersId.indexOf(tag._id) !== -1).length >= 1
            && item.totalCalories <= this.calorieFilter && item.avgRate >= this.rankFilter);
        });
      }
      else if (this.keyword !== "" && this.filtersId.length >= 1) {
        this.recipesApi.subscribe(x => {
          this.recipes = x;
          this.recipes = this.recipes.filter(item =>
            item.tags.filter(tag => this.filtersId.indexOf(tag._id) !== -1).length >= 1
            && item.totalCalories <= this.calorieFilter && item.avgRate >= this.rankFilter
            && (item.name.toLowerCase().includes(this.keyword.toLowerCase()) ||
              item.tags.filter(tag => tag.name.toLowerCase().includes(this.keyword.toLowerCase())).length >= 1));
        });
      }
      else if (this.keyword !== "" && this.filtersId.length === 0) {
        this.recipesApi.subscribe(x => {
          this.recipes = x;
          this.recipes = this.recipes.filter(item =>
            item.tags.filter(tag => item.totalCalories <= this.calorieFilter && item.avgRate >= this.rankFilter
              && (item.name.toLowerCase().includes(this.keyword.toLowerCase()) ||
                item.tags.filter(tag => tag.name.toLowerCase().includes(this.keyword.toLowerCase())).length >= 1)));
        });
      }
      else {
        this.recipesApi.subscribe(x => {
          this.recipes = x;
          this.recipes = this.recipes.filter(item => item.totalCalories <= this.calorieFilter
            && item.avgRate >= this.rankFilter);
          // this.sendRecipes.emit(this.recipes);
        });
      }
    }

  }

  chooseCalories() {
    this.applyFilters();
    //this.filterTags();
  }

  chooseRanking() {
    this.applyFilters();
    //this.filterTags();
  }

  findRecipe() {
    this.applyFilters();
  }

  private applyFilters() {
    if (this.keyword === "" && this.filtersId.length === 0) {
      this.recipesApi.subscribe(x => {
        this.recipes = x;
        this.recipes = this.recipes.filter(item => item.totalCalories <= this.calorieFilter
          && item.avgRate >= this.rankFilter);
        this.filterTags();
      });
    }
    else if (this.keyword === "" && this.filtersId.length > 0) {
      this.recipesApi.subscribe(x => {
        this.recipes = x;
        this.recipes = this.recipes.filter(item =>
          item.tags.filter(tag => this.filtersId.indexOf(tag._id) !== -1).length >= 1
          && item.totalCalories <= this.calorieFilter && item.avgRate >= this.rankFilter);
        this.filterTags();
      });
    }
    else if (this.keyword !== "" && this.filtersId.length === 0) {
      this.recipesApi.subscribe(x => {
        this.recipes = x;
        this.recipes = this.recipes.filter(item => item.totalCalories <= this.calorieFilter
          && item.avgRate >= this.rankFilter
          && (item.name.toLowerCase().includes(this.keyword.toLowerCase()) ||
            item.tags.filter(tag => tag.name.toLowerCase().includes(this.keyword.toLowerCase())).length >= 1));
        this.filterTags();
      });
    }
    else {
      this.recipesApi.subscribe(x => {
        this.recipes = x;
        this.recipes = this.recipes.filter(item =>
          item.tags.filter(tag => this.filtersId.indexOf(tag._id) !== -1).length >= 1
          && item.totalCalories <= this.calorieFilter && item.avgRate >= this.rankFilter
          && (item.name.toLowerCase().includes(this.keyword.toLowerCase()) ||
            item.tags.filter(tag => tag.name.toLowerCase().includes(this.keyword.toLowerCase())).length >= 1));
        this.filterTags();
      });
    }
    // this.sendRecipes.emit(this.recipes);

  }

  private filterTags() {
    var recipesTags = [];
    if (this.keyword !== "") {
      for (var i = 0; i < this.recipes.length; i++) {
        for (var m = 0; m < this.recipes[i].tags.length; m++) {
          var index = recipesTags.findIndex(tag => tag._id === this.recipes[i].tags[m]._id);
          if (index === -1)
            recipesTags.push(this.recipes[i].tags[m]);
        } // end for tags
      } // end for recipes
      this.tags = recipesTags;

      for (var i = 0; i < this.filtersId.length; i++) {
        var tagPlace = this.tags.findIndex(tag => tag._id === this.filtersId[i]);
        if (tagPlace === -1)
          this.filtersId.splice(i, 1);
      }
    } // end if condition 
    else {
      this.tagApi.subscribe(x => this.tags = x);
    }
  }

}