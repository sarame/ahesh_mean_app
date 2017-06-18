import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/homeServices/home.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  userid: any = "";

  sortArrOfIds: any = [];
  displayFirDivOne: any = "show";
  displaySecDivOne: any = "hide";
  displayFirDivSec: any = "show";
  displaySecDivSec: any = "hide";
  displayFirDivTrd: any = "show";
  displaySecDivTrd: any = "hide";

  data1: any;
  data2: any;
  data3: any;



  nextEltOne() {
    this.displayFirDivOne = "hide";
    this.displaySecDivOne = "show";
  }
  PreEltOne() {
    this.displayFirDivOne = "show";
    this.displaySecDivOne = "hide";
  }

  nextEltSec() {
    this.displayFirDivSec = "hide";
    this.displaySecDivSec = "show";
  }
  PreEltSec() {
    this.displayFirDivSec = "show";
    this.displaySecDivSec = "hide";
  }
  nextEltTrd() {
    this.displayFirDivTrd = "hide";
    this.displaySecDivTrd = "show";
  }
  PreEltTrd() {
    this.displayFirDivTrd = "show";
    this.displaySecDivTrd = "hide";
  }


  constructor(private homeService: HomeService) { }

  ngOnInit() {

    if (this.userid) {
      this.homeService.getAllVisitTags(this.userid).subscribe(items => {

        items = items.slice((items.length - 5), items.length)
        console.log("items");
        console.log(items);

        var tags = items.reduce((tags, item) => { // bytla3 el ids w el count bta3ha 
          item.tags.forEach(tag => {
            tags[tag._id] = tags[tag._id] || 0;
            tags[tag._id]++;
          });
          console.log("tags");
          console.log(tags);
          return tags;
        }, {});


        var arrOfIds = [];
        for (var key in tags) { // b7awl el object l array
          if (tags.hasOwnProperty(key)) {
            var element = tags[key];
            arrOfIds.push({ "id": key, "val": element });

          }
        }


        this.sortArrOfIds = arrOfIds.sort(function (a, b) { return b.val - a.val }); //sort dec


        console.log("sortArrOfIds");
        console.log(this.sortArrOfIds);

        if (this.sortArrOfIds.length >= 3) {

          this.homeService.getAllRecipeInTag(this.sortArrOfIds[0].id).subscribe(items => {
            console.log("items.recipes-data1");
            console.log(items.recipes);
            items.recipes = this.getUnique(items.recipes, 2);
            this.data1 = items;
            console.log("data1");
            console.log(this.data1);

          });


          this.homeService.getAllRecipeInTag(this.sortArrOfIds[1].id).subscribe(items => {
            console.log("items.recipes-data2");
            console.log(items.recipes);
            items.recipes = this.getUnique(items.recipes, 2);
            this.data2 = items;
            console.log("data2");
            console.log(this.data2);
          });


          this.homeService.getAllRecipeInTag(this.sortArrOfIds[2].id).subscribe(items => {
            console.log("items.recipes-data3");
            console.log(items.recipes);
            items.recipes = this.getUnique(items.recipes, 2);
            this.data3 = items;
            console.log("data3");
            console.log(this.data3);

          });
        }
      });
    } else {
      this.homeService.getAllRandomTags().subscribe(tag => {

        tag[0].recipes = this.getUnique(tag[0].recipes, 2);
        this.data1 = tag[0];
        tag[1].recipes = this.getUnique(tag[1].recipes, 2);
        this.data2 = tag[1];
        tag[2].recipes = this.getUnique(tag[2].recipes, 2);
        this.data3 = tag[2];

        console.log("data1");
        console.log(this.data1);
        console.log("data2");
        console.log(this.data2);
        console.log("data3");
        console.log(this.data3);

      });
    }

  }



  getUnique(arrayNum, count) {
    // Make a copy of the array
    var tmp = arrayNum.slice(arrayNum);
    var ret = [];

    for (var i = 0; i < count; i++) {
      var index = Math.floor(Math.random() * tmp.length);
      var removed = tmp.splice(index, 1);

      // Since we are only removing one element
      ret.push(removed[0]);

    }
    return ret;
  }


}
