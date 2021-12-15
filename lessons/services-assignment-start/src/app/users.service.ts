import { Injectable } from "@angular/core";

import { CounterService } from "./counter.service";

@Injectable({ providedIn: 'root' })
export class UsersService {

    activeUsers: string[] = ['Max', 'Anna'];
    inactiveUsers: string[] = ['Chris', 'Manu'];
    
    constructor(private counterService: CounterService) {}

    addUser(user: string, status: string) {
        if(status == 'active') {
            this.activeUsers.push(user);
            this.counterService.logToActive();        
        } else {
            this.inactiveUsers.push(user);
            this.counterService.logToInactive();
        }
    }

    setToInactive(id: number): void {
        this.inactiveUsers.push(this.activeUsers[id]);
        this.activeUsers.splice(id, 1);
        this.counterService.logToInactive();
    }

    setToActive(id: number): void {
        this.activeUsers.push(this.inactiveUsers[id]);
        this.inactiveUsers.splice(id, 1);
        this.counterService.logToActive();
    }
}