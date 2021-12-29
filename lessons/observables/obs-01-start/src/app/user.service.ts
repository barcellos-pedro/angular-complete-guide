import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService {

    // Recommended way to use on services
    // To communicate across different components
    activatedEmitter = new Subject<boolean>();
    isActivated: boolean = false;

    // Recommended to use on components with @Output() 
    // activatedEmitter = new EventEmitter<boolean>();

    toggleIsActivated(): void {
        this.isActivated = !this.isActivated;
        this.activatedEmitter.next(this.isActivated);
        // this.activatedEmitter.emit(this.isActivated);
    }
}