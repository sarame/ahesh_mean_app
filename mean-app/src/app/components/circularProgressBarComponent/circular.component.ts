import { Component, Input, OnInit } from "@angular/core"

@Component({
  selector: 'app-circularBarProgress',
  templateUrl: './circular.component.html',
  styleUrls: ['./circular.component.css']
})
export class CircularComponent implements OnInit{
    @Input() percentage: number;
    classPrecentage:string;

    ngOnInit() {
      
                this.classPrecentage=`p${this.percentage}`;
      
    }
}