import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit, OnChanges {
  
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output() blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  // newServerName = '';
  // newServerContent = '';
  @ViewChild('serverContent', { static: true }) serverContent: ElementRef
  // ...{ static: true } - if we will use inside ngOnInit

  constructor() {
    console.log('constructor called')
  }
  
  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called')
    console.log(changes)
  }
  
  ngOnInit(): void {
    console.log('ngOnInit called')
  }


  onAddServer(element: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: element.value,
      serverContent: this.serverContent.nativeElement.value
    });
  }

  onAddBlueprint(element: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: element.value,
      serverContent: this.serverContent.nativeElement.value
    });
  }

}
