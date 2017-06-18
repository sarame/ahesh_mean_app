import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  title: string = 'My first AGM project';
  lat: number = 30.143937;
  lng: number = 31.317060;
  // google maps zoom level
  zoom: number = 5;

  constructor() { }

  ngOnInit() {
  }

}
