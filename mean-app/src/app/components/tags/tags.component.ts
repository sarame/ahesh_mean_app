import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/homeServices/home.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  // instantiate posts to an empty array
  items: any = [{
    name: "",
    recipes: [
      {
        name: "",
        img: "",
        description: "",
      }
    ]
  }, {
    name: "",
    recipes: [
      {
        name: "",
        img: "",
        description: "",
      }
    ]
  }, {
    name: "",
    recipes: [
      {
        name: "",
        img: "",
        description: "",
      }
    ]
  }, {
    name: "",
    recipes: [
      {
        name: "",
        img: "",
        description: "",
      }
    ]
  }, {
    name: "",
    recipes: [
      {
        name: "",
        img: "",
        description: "",
      }
    ]
  }, {
    name: "",
    recipes: [
      {
        name: "",
        img: "",
        description: "",
      }
    ]
  }, {
    name: "",
    recipes: [
      {
        name: "",
        img: "",
        description: "",
      }
    ]
  }];

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.getAllTags().subscribe(items => {
      this.items = items;
    });
  }

}
