import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.Emulated // Default, does not need to set this
})
export class AppComponent {
  serverElements = [{ type: 'server', name: 'TestServer', content: 'Just a test' }];
  evenNumbers: number[] = [];
  oddNumbers: number[] = [];

  onServerAdded(serverData: { serverName: string, serverContent: string }) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    })
  }

  onBluePrintAdded(blueprintData: { serverName: string, serverContent: string }) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent
    })
  }

  increment(value: number) {
    if (this.isEven(value)) {
      this.evenNumbers.push(value);
    } else {
      this.oddNumbers.push(value);
    }
  }

  isEven(value: number): boolean {
    return value % 2 == 0;
  }

}
