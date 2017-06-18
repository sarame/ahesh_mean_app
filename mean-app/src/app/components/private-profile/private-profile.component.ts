import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from './../../services/profileServices/profile.service';


//import { ImageResult, ResizeOptions } from 'angular2-image-upload';

@Component({
  selector: 'app-private-profile',
  templateUrl: './private-profile.component.html',
  styleUrls: ['./private-profile.component.css']
})
export class PrivateProfileComponent implements OnInit, DoCheck {

  private userId: string = "59175dff871f492068d93127";
  displayType: string = "none";
  profileData: any;
  listLength: number = 0;
  URL: string = "";
  src: string = "";
  badgeColor:string;
  @Input() recipes: any;
  @Input() fevRecipes: any;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  wrongCurrentPassMessage: string;
  wrongConfirmPassMessage: string;

    color:string;
    valuePrecentage:string

  constructor(private route: ActivatedRoute, private service: ProfileService) { }
  onSendFav(event) {
    this.fevRecipes = event;
  }

  onSendUser(event) {
    this.recipes = event;
    
  }

  ngOnInit() {
    this.service.GetbyId(this.userId).subscribe(x => {
      this.profileData = x;
      this.listLength = this.profileData.shoppingList.length;
     
    if(this.profileData.currentBadge.name==="Gold")
                this.badgeColor="#D4AF37";
                else if(this.profileData.currentBadge.name==="Silver")
                this.badgeColor="#C0C0C0";
                else if(this.profileData.currentBadge.name==="Bronze")
                this.badgeColor="#cd7f32";
                else{
                  this.badgeColor="#eee"
                }
     console.log("curentUser ");
     console.log(this.profileData);
                 this.valuePrecentage=(this.profileData.recipesNo/this.profileData.nextBadge.noRecipe)*100+"";
                if(this.profileData.nextBadge.name==="Gold")
                this.color="#D4AF37";
                else if(this.profileData.nextBadge.name==="Silver")
                this.color="#C0C0C0";
                else if(this.profileData.nextBadge.name==="Bronze")
                this.color="#cd7f32";
                else{
                  this.color="#eee"
                }
    });
   
  }

  ngDoCheck() {
  }

  mouseEvent(event) {
    if (event.type == "mouseover")
      this.displayType = "inline-block";
    else
      this.displayType = "none";
  }

  imageUploaded(event) {
    console.log(event);
  }

  changePassword(event) {
    this.wrongCurrentPassMessage = "";
    this.wrongConfirmPassMessage = "";
    if (event.target.attributes["data-dismiss"].value != "") {
      this.currentPassword = this.confirmNewPassword = this.newPassword = null;
      event.target.attributes["data-dismiss"].value == "";
    }

    if (!this.currentPassword) {
      this.wrongCurrentPassMessage = "Current Password is required";
    }
    if ((!this.newPassword) && (!this.confirmNewPassword)) {
      this.wrongConfirmPassMessage = "New password is required";
    }

    if ((this.currentPassword == this.profileData.password) && (this.newPassword == this.confirmNewPassword)
      && this.newPassword && this.confirmNewPassword) {

      event.target.attributes["data-dismiss"].value = "modal";
      this.profileData.password = this.newPassword;
      this.service.UpdateById(this.profileData._id, { "password": this.profileData.password });
      this.cancelChangingPass();
    }
    else if ((this.currentPassword != this.profileData.password) && this.currentPassword) {
      this.wrongCurrentPassMessage = "Wrong Password";
    }
    else if (this.newPassword != this.confirmNewPassword) {
      this.wrongConfirmPassMessage = "Password Mismatch";
    }
  }

  cancelChangingPass() {
    this.wrongCurrentPassMessage = this.wrongConfirmPassMessage = "";
    this.currentPassword = this.confirmNewPassword = this.newPassword = null;
  }

  removeItem(ingredientId: string, unitTypeId: string) {
    alert("dddddd");
    // var index = this.profileData.shoppingList.findIndex(item =>
    //   item.ingredient._id === ingredientId && item.unitType._id === unitTypeId);

    // this.profileData.shoppingList.splice(index, 1);

    // this.service.UpdateById(this.userId, { "shoppingList": this.profileData.shoppingList })
  }
}