import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  // Our custom directive will do the opposite of ngIf

  // setter + property, whenever it changes it will do the implementation
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    } else {
      this.viewContainerRef.clear();
    }
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) { }

}
