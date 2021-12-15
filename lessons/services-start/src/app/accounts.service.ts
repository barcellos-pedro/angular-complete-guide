import { EventEmitter, Injectable } from "@angular/core";
import { LoggingService } from "./logging.service";

@Injectable({ providedIn: 'root' })
export class AccountsService {
    constructor(private loggingService: LoggingService) {}

    accounts = [
        {
            name: 'Master Account',
            status: 'active'
        },
        {
            name: 'Testaccount',
            status: 'inactive'
        },
        {
            name: 'Hidden Account',
            status: 'unknown'
        }
    ];

    // Any component can emit an event using this service and this attr to comunicate with each other,
    // other components needs to subscribe to listen for changes
    // without having to use a lot of outputs and inputs
    statusUpdated = new EventEmitter<string>();

    addAccount(name: string, status: string) {
        this.accounts.push({ name, status });
        this.loggingService.logStatusChange(status);
    }

    updateStatus(id: number, status: string) {
        this.accounts[id].status = status;
        this.loggingService.logStatusChange(status);
    }
}