import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class LoggingService {
    logStatusChange(status: string): void {
        console.log(`[Log] A server status changed, new status: ${status}`);
    }
}