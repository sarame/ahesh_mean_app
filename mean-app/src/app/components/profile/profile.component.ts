import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from './../../services/profileServices/profile.service';


@Component({
  selector: 'app-profile',
  providers: [ProfileService],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, DoCheck, OnDestroy {

  private userId: string = "59175dff871f492068d93127";
  currentTab: string;
  profileData: any;
  deletedRecipes: number[] = [];

  constructor(private route: ActivatedRoute, private service: ProfileService) { }

  ngOnInit() {
    this.service.GetbyId(this.userId).subscribe(x => { this.profileData = x; console.log(x); });
  }

  ngDoCheck() {
    this.currentTab = this.route.snapshot.params["tabValue"];
  }

  fevRecipe_Unlike(event, recipeId: string) {
    let target = event.target || event.srcElement || event.currentTarget;
    var recipe = this.profileData.fevRecipes.find(x => x._id == recipeId);
    var index = this.profileData.fevRecipes.indexOf(recipe);

    if (target.attributes["class"].value == "glyphicon glyphicon-heart favoritePadges like") {
      target.attributes["class"].value = "glyphicon glyphicon-heart-empty favoritePadges like";
      this.deletedRecipes.push(index);
    }
    else {
      target.attributes["class"].value = "glyphicon glyphicon-heart favoritePadges like";
      this.deletedRecipes.splice(this.deletedRecipes.find(x => x == index), 1);
    }
    console.log(this.deletedRecipes);
  }

  ngOnDestroy() {
    if (this.deletedRecipes.length > 0) {
      for (var i = 0; i < this.deletedRecipes.length; i++)
        this.profileData.fevRecipes.splice(this.deletedRecipes[i], 1);

      for (var i = 0; i < this.profileData.fevRecipes.length; i++)
        this.profileData.fevRecipes[i] = this.profileData.fevRecipes[i]._id;

      this.service.UpdateById(this.userId, this.profileData);
    }
  }
}
