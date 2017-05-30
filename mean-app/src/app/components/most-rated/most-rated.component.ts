import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-most-rated',
  templateUrl: './most-rated.component.html',
  styleUrls: ['./most-rated.component.css']
})
export class MostRatedComponent implements OnInit {

items:any=[
  {},{},{},{},{},{}
];
  constructor() { }

  ngOnInit() {
  }

}
