import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor {
    /**
     * Intercept every request
     * We can use to send on every request an token for example
     * @param req 
     * @param next 
     * @returns Observable<HttpEvent<T>>
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Interacting with the request

        // request is immutable so we need an copy
        const modifiedRequest = req.clone({
            headers: req.headers.append('Auth', 'xyz')
        });

        // console.log('request is on its way');
        // console.log('original request\n', req);
        // console.log('modifiedRequest\n', modifiedRequest);

        return next.handle(modifiedRequest);
            // Interacting with the response
            // .pipe(
            //     tap(event => {
            //         console.log(event)
            //         if(event.type === HttpEventType.Response) {
            //             console.log('Response arrived, body data:\n', event.body)
            //         }
            //     })
            // );
    }
}