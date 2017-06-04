import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/homeServices/home.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  flag: boolean = true;
  // instantiate posts to an empty array
  items: any = [];
  dat: any = [];
  search:any="";
  constructor(private homeService: HomeService) { }

  ngOnInit() {
    // Retrieve posts from the API
    this.homeService.getSearchRecipes().subscribe(items => {
      this.dat = items;
    });
  }
  performSearch(searchTerm: HTMLInputElement): void {
    console.log(`User entered: ${searchTerm.value}`);
    this.search="";
    this.items = [];
    if (searchTerm.value !== "") {
      
      this.items = this.dat.filter(s => s.name.indexOf(searchTerm.value.toLowerCase()) > -1 || s.description.indexOf(searchTerm.value.toLowerCase()) > -1);
      this.search="show";
    }
  }
}
