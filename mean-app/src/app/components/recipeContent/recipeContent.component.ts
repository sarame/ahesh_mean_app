import { Component, OnInit, Output, EventEmitter, Input, OnChanges, OnDestroy, DoCheck } from '@angular/core';
import { ProfileService } from '../../services/profileServices/profile.service';



@Component({
  selector: 'app-recipeContent',
  templateUrl: './recipeContent.component.html',
  styleUrls: ['./recipeContent.component.css']
})
export class RecipeContentComponent implements OnInit, DoCheck {
  @Input() recipe: any;
  @Input() currentUser: any;

  @Output() unlikeRecipe: EventEmitter<number> = new EventEmitter<number>();

  remFavoritHeart: String = "glyphicon glyphicon-heart-empty";
  addFavoritHeart: String = "glyphicon glyphicon-heart";
  currentHeart: String;

  constructor(private userService: ProfileService) { }

  ngOnInit() {

    if (this.currentUser.fevRecipes.find(x => this.recipe._id === x._id)) {
      console.log(this.recipe._id);
      this.currentHeart = this.addFavoritHeart;
    }
    else {
      this.currentHeart = this.remFavoritHeart;

    }
  }

  // dislikeRecipe(event, recipeId: number) {
  //   let index: number = this.currentUser.fevRecipes.findIndex(x => x._id === recipeId);
  //   this.currentUser.fevRecipes.splice(index, 1);

  //   this.unlikeRecipe.emit(index);
  //   this.userService.UpdateById(this.currentUser._id, { "fevRecipes": this.currentUser.fevRecipes });
  //   event.target.attributes["data-dismiss"].value = "modal";
  // }
  // ngOnChanges() {
  // }
  changeFavorit(event) {//add this recipe to user favorit recipes
debugger;
    if (this.currentUser.fevRecipes.find(x => this.recipe._id === x._id)) {
      console.log("existing recipe");
      this.currentHeart = this.remFavoritHeart;
      let index: number = this.currentUser.fevRecipes.findIndex(x => this.recipe._id === x._id);
       this.unlikeRecipe.emit(index);
       this.currentUser.fevRecipes.splice(index, 1);
       this.currentUser.fevRecipes =this.currentUser.fevRecipes.slice();

    }
    else {
      console.log("new favorit recipe");
      this.currentHeart = this.addFavoritHeart;
      this.currentUser.fevRecipes.push(this.recipe);

    }
    this.userService.UpdateById(this.currentUser._id, this.currentUser);
  }

  ngDoCheck() {
    // console.log("from content");
    // console.log(this.currentUser);
  }

  ngOnDestroy() {
  }

}


