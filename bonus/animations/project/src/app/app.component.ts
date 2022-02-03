import { Component } from '@angular/core';
import { appComponentAnimations } from './app.component.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: appComponentAnimations
})
export class AppComponent {
  list = ['Milk', 'Sugar', 'Bread'];
  state: string = 'normal';
  wildState: string = 'normal';

  onAdd(item) {
    this.list.push(item);
  }

  onDelete(item) {
    this.list.splice(this.list.indexOf(item), 1);
  }

  onAnimate() {
    this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
    this.wildState === 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
  }

  onShrink() {
    this.wildState === 'shrunken' ? this.wildState = 'normal' : this.wildState = 'shrunken';
  }

  animationStarted(event) {
    console.log(event)
  }

  animationEnd(event) {
    console.log(event)
  }
}
