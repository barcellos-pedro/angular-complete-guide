import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class CounterService {
    toActive: number = 0;
    toInactive: number = 0;

    /**
     * Logs inactive to active actions
    */
    logToActive(): void {
        this.toActive += 1;
        console.log(`To active actions: ${this.toActive}`);
    }

    /**
     * Logs active to inactive actions
    */
     logToInactive(): void {
        this.toInactive += 1;
        console.log(`To inactive actions: ${this.toInactive}`);
    }
}