import { Component, OnInit } from '@angular/core';

@Component({
  // selector: '[app-servers]', // by attr
  // selector: '.app-servers', // by class
  // template: `
  //   <app-server></app-server>
  //   <app-server></app-server>
  // `,
  selector: 'app-servers', // by element
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  allowNewServer: boolean = false;
  serverCreationStatus: string = 'No server was created!';
  serverName: string = 'TestServer';
  username: string = '';
  serverCreated: boolean = false;
  servers: string[] = ['Testserver 1', 'Testserver 2'];
  showDetails: boolean = false;
  showDetailsLogs: string[] = [];

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit(): void {
  }

  onCreateServer(): void {
    this.serverCreated = !this.serverCreated;
    this.servers.push(this.serverName);
    this.serverCreationStatus = `Server was created! The name is ${this.serverName}`;
  }

  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  get isUserEmpty() {
    return this.username === '';
  }

  resetUser() {
    this.username = '';
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;

    const date: Date = new Date();
    const data = date.toLocaleDateString();
    const hora = date.toLocaleTimeString();

    this.showDetailsLogs.push(`${data} - ${hora}`);
  }

  checkNums(first: number, second: number) {
    return first >= second;
  }

}
