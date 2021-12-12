import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  
  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'blue';
  
  // When we set the hostbinding name just like its own class name,
  // generally we want to change just 1 property of the element. E.g: ngClass and ngStyle
  // @Input('appBetterHighlight') inputProp: string = '1px solid black';

  // Easier way to change element properties than elementRef + renderer
  @HostBinding('style.backgroundColor') backgroundColor: string;
  
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.backgroundColor = this.defaultColor;
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'red')
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = this.defaultColor;
  }

}
