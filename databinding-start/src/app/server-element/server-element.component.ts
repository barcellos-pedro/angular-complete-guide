import { AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit, AfterViewInit, AfterContentInit {

  @Input('server') element: { type: string, name: string, content: string };
  @ViewChild('heading', { static: true }) header: ElementRef;
  @ContentChild('paragraphContent', { static: true }) paragraphContent: ElementRef;

  constructor() { }

  ngOnInit(): void {
    console.log(`Text Content o header [OnInit]: ${this.header.nativeElement.textContent}`)
    console.log(`Text Content of paragraphContent [OnInit]: ${this.paragraphContent.nativeElement.textContent}`)
  }
  
  ngAfterContentInit() {
    console.log(`Text Content of header [AfterContentInit]: ${this.header.nativeElement.textContent}`)
    console.log(`Text Content of paragraphContent [AfterContentInit]: ${this.paragraphContent.nativeElement.textContent}`)
  }

  ngAfterViewInit() {
    console.log(`Text Content of header [AfterViewInit]: ${this.header.nativeElement.textContent}`)
    console.log(`Text Content of paragraphContent [AfterViewInit]: ${this.paragraphContent.nativeElement.textContent}`)
  }

}
