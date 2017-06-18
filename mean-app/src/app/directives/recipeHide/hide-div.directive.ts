import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[appHideDiv]',
  host: {
    '(mouseout)': 'onmouseout()',
  }
})
export class HideDivDirective {

  constructor(private element: ElementRef, private renderer: Renderer) {
  }

  onmouseout() {
    const hostElem = this.element.nativeElement;
   // console.log(hostElem.children[1]);
    this.renderer.setElementStyle(hostElem.children[1], 'display', 'none');
  }
}
