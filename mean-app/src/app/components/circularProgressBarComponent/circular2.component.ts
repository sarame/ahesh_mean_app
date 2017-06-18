import { Component, Input, OnInit } from "@angular/core"

@Component({
  selector: 'app-circular2BarProgress',
  templateUrl: './circular2.component.html',
  styleUrls: ['./circular2.component.css']
})
export class Circular2Component implements OnInit{
    @Input() receipesNo: number;
    @Input() nextBadge:number=200;
    @Input() nextBadgeName:string;
    color:string;
    valuePrecentage:string;

    ngOnInit() {
      
                this.valuePrecentage=(this.receipesNo/this.nextBadge)*100+"";
                if(this.nextBadgeName==="Gold")
                this.color="#D4AF37";
                else if(this.nextBadgeName==="Silver")
                this.color="#C0C0C0";
                else if(this.nextBadgeName==="Bronze")
                this.color="#cd7f32";
                else{
                  this.color="#eee"
                }
      
    }
}