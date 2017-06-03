import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/homeServices/home.service';

@Component({
  selector: 'app-most-rated',
  templateUrl: './most-rated.component.html',
  styleUrls: ['./most-rated.component.css']
})
export class MostRatedComponent implements OnInit {

  // instantiate posts to an empty array
  items: any = [{
    name: "",
    img: "",
    time: "",
    date: "",
    description: "",
    avgRate: 0
  }, {
    name: "",
    img: "",
    time: "",
    date: "",
    description: "",
    avgRate: 0
  }, {
    name: "",
    img: "",
    time: "",
    date: "",
    description: "",
    avgRate: 0
  }, {
    name: "",
    img: "",
    time: "",
    date: "",
    description: "",
    avgRate: 0
  }, {
    name: "",
    img: "",
    time: "",
    date: "",
    description: "",
    avgRate: 0
  }, {
    name: "",
    img: "",
    time: "",
    date: "",
    description: "",
    avgRate: 0
  }, {
    name: "",
    img: "",
    time: "",
    date: "",
    description: "",
    avgRate: 0
  }];


  constructor(private homeService: HomeService) { }

  ngOnInit() {
    // Retrieve posts from the API
    this.homeService.getAllRecipes().subscribe(items => {
      this.items = items;
      console.log(items);
    });
  }

}

