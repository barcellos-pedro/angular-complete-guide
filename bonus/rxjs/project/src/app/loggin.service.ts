import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LogginService {
    lastLog: string;

    log(message: string) {
        console.log('new message\n', message);
        console.log('last log\n', this.lastLog)
        this.lastLog = message;
    }
}