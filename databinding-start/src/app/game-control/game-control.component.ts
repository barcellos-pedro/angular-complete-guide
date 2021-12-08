import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  @Output() onIncrement = new EventEmitter<number>();
  value: number = 0;
  valueInterval: any;

  constructor() { }

  ngOnInit(): void {
  }

  start() {
    this.valueInterval = setInterval(() => {
      this.value++;
      this.onIncrement.emit(this.value);
    }, 1000);
  }

  pause() {
    clearInterval(this.valueInterval);
  }
}
