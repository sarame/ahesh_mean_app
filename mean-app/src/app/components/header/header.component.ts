import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/homeServices/home.service';
import { ProfileService } from '../../services/profileServices/profile.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  userId: any = "59175dff871f492068d93127";
  oldImg: any;
  flag: boolean = true;
  // instantiate posts to an empty array
  items: any = [];
  list: any = [];
  dat: any = [];
  search: any = "";
  constructor(private homeService: HomeService, private profileService: ProfileService) { }

  ngOnInit() {
    // Retrieve posts from the API
    this.homeService.getSearchRecipes().subscribe(items => {

      this.dat = items;
      console.log(items);
    });


    this.profileService.GetbyId(this.userId).subscribe(e => {
      this.list=e.shoppingList;
      console.log(e.shoppingList[0].ingredient.name);
      this.oldImg = e.img;
    })
  }
  performSearch(searchTerm: HTMLInputElement): void {
    console.log(`User entered: ${searchTerm.value}`);
    this.search = "";
    this.items = [];
    if (searchTerm.value !== "") {

      this.items = this.dat.filter(s => s.name.indexOf(searchTerm.value.toLowerCase()) > -1 || s.description.indexOf(searchTerm.value.toLowerCase()) > -1);
      this.search = "show";
    }
  }
}
