import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit {
    constructor(private elementRef: ElementRef) {}
    // Using ElementRef is not a good practice, use Renderer instead

    ngOnInit(): void {
        this.elementRef.nativeElement.style.backgroundColor = 'green';
    }
}