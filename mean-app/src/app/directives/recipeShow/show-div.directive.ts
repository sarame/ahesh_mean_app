import { Directive, ElementRef, Renderer, OnInit } from '@angular/core';

@Directive({
  selector: '[appShowDiv]',
  host:{
        '(mouseover)': 'onmouseover()',
        }
})
export class ShowDivDirective {

  constructor(private element: ElementRef, private renderer: Renderer) {
  }

  onmouseover() {
    const hostElem = this.element.nativeElement;
  //  console.log(hostElem.children[1]);
    this.renderer.setElementStyle(hostElem.children[1],  'display', 'initial');
  }

}
