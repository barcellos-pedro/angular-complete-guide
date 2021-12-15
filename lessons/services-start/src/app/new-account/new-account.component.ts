import { Component, OnInit } from '@angular/core';

import { AccountsService } from '../accounts.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers: [LoggingService]
})
export class NewAccountComponent implements OnInit {
  constructor(private loggingService: LoggingService, private accountsService: AccountsService) {}
  
  ngOnInit(): void {
    // Listening for changes emitted by other component into the service attribute
    this.accountsService.statusUpdated.subscribe((status: string) => console.log(`[EventEmitter] New Status: ${status}`));
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.addAccount(accountName, accountStatus);
    // this.loggingService.logStatusChange(accountStatus);
  }
}
