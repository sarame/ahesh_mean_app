import { Component, OnInit } from '@angular/core';

import { HomeService } from '../../services/homeServices/home.service';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.css']
})
export class LearningComponent implements OnInit {
  items: any = [{}, {}, {}];
  ite: any = [{}, {}, {}]
  constructor(private homeService: HomeService) { }

  ngOnInit() {
    // Retrieve posts from the API
    this.homeService.getAllCourses().subscribe(items => {
      this.ite = items;
     // console.log(items);
    });
  }

}
