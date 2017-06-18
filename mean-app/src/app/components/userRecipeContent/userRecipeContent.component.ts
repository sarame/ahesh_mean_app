import { Component, OnInit, Input, DoCheck, Output, EventEmitter } from '@angular/core';
import { ProfileService } from '../../services/profileServices/profile.service';



@Component({
  selector: 'app-userRecipeContent',
  templateUrl: './userRecipeContent.component.html',
  styleUrls: ['./userRecipeContent.component.css']
})
export class UserRecipeContentComponent implements OnInit, DoCheck {
  @Input() recipe: any;
  @Input() currentUser: any;
  @Output() deletedRecipe: EventEmitter<number> = new EventEmitter<number>();

  remFavoritHeart: String = "glyphicon glyphicon-heart-empty";
  addFavoritHeart: String = "glyphicon glyphicon-heart";
  currentHeart: String;

  constructor(private userService: ProfileService) { }

  ngOnInit() {
    // if (this.currentUser.fevRecipes.find(x => this.recipe._id === x._id))
    //   this.currentHeart = this.addFavoritHeart;
    // else
    //   this.currentHeart = this.remFavoritHeart;
  }

  ngDoCheck() {
  }

  // changeFavorit(event) {//add this recipe to user favorit recipes

  //   if (this.currentUser.fevRecipes.find(x => this.recipe._id === x._id)) {
  //     this.currentHeart = this.remFavoritHeart;
  //     let index: number = this.currentUser.fevRecipes.findIndex(x => this.recipe._id === x._id);
  //     this.currentUser.fevRecipes.splice(index, 1);
  //     this.currentUser.fevRecipes = this.currentUser.fevRecipes.slice();

  //   }
  //   else {
  //     this.currentHeart = this.addFavoritHeart;
  //     this.currentUser.fevRecipes.push(this.recipe);

  //   }

  //   this.userService.UpdateById(this.currentUser._id, this.currentUser);
  // }

  DelRecipe(event, recipeId: string) {
    var index = this.currentUser.recipes.findIndex(x => x._id == recipeId);
    this.currentUser.recipes.splice(index, 1);

    this.deletedRecipe.emit(index);
    this.userService.UpdateById(this.currentUser._id, { "recipes": this.currentUser.recipes });
    event.target.attributes["data-dismiss"].value = "modal";
  }
}


