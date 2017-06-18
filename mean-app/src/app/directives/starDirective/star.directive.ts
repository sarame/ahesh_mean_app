import { Directive, ElementRef, Renderer, Input, OnInit } from "@angular/core"

@Directive({
    selector: '[star]',
})
export class StarDirective implements OnInit {
    @Input() star: number;

    constructor(private element: ElementRef, private renderer: Renderer) {
    }

    ngOnInit() {
        var myStar = Math.floor(this.star);
        for (var i = 0; i < myStar; i++) {
            var span = this.renderer.createElement(this.element.nativeElement, "span");
            this.renderer.setElementAttribute(span, "class", "glyphicon glyphicon-star");
        }

        var emptyStar = 5 - myStar;
        for (var i = 0; i < emptyStar; i++) {
            var span = this.renderer.createElement(this.element.nativeElement, "span");
            this.renderer.setElementAttribute(span, "class", "glyphicon glyphicon-star-empty");
        }
    }
}