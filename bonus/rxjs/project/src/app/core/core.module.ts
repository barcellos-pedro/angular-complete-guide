import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { AuthInterceptorService } from "../auth/auth-interceptor.service";
import { AuthGuard } from "../auth/auth.guard";

@NgModule({
    providers: [
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS, // Every request will be intercepted
            useClass: AuthInterceptorService,
            multi: true // To allow multiple interceptors in the providers array
        }
    ]
})
export class CoreModule { }