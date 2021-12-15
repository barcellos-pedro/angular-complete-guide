import { Component, OnInit } from '@angular/core';

import { AccountsService } from './accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // All children will be able and receive the same instance of the service
  // But the highest level to put is in the app module
  // providers: [AccountsService] 
})
export class AppComponent implements OnInit {
  accounts: {name: string, status: string}[] = [];

  constructor(private accountsService: AccountsService) {}

  ngOnInit(): void {
      this.accounts = this.accountsService.accounts;
  }
}
