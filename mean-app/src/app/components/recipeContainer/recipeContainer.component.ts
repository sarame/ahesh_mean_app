import { Component, OnInit, DoCheck } from '@angular/core';
import { ProfileService } from '../../services/profileServices/profile.service';




@Component({
  selector: 'app-recipeContainer',
  templateUrl: './recipeContainer.component.html',
  styleUrls: ['./recipeContainer.component.css']
})
export class RecipeContainerComponent implements OnInit, DoCheck {
  filterRecipes: any;
  userId: string = "59175dff871f492068d93127";
  user: any;
  constructor(private userService: ProfileService) { }

  ngOnInit() {
    // Retrieve courses from the API
    this.userService.GetbyId(this.userId).subscribe(_user => {
      this.user = _user;
    });
  }
  onSend(event) {   
    this.filterRecipes = event;
   
  }
  ngDoCheck() {
    // console.log(this.user);
  }

}


