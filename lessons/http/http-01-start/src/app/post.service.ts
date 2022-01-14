import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { catchError, delay, map, tap } from "rxjs/operators";

import { Post } from "./post.model";

@Injectable({
    providedIn: 'root' // So we don't have to change the app-module
})
export class PostService {

    private readonly ENDPOINT: string = 'https://ng-complete-guide-f78f1-default-rtdb.firebaseio.com/posts.json';
    error = new Subject<string>();

    constructor(private http: HttpClient) { }

    creatPost(postData: Post): void {
        this.http.post<{ name: string }>(this.ENDPOINT, postData, {
            /**
             * Get more than the response body from angular http client
             * status, statusText, ok, type, url
             * Returns an :HttpReponse<T>
             */
            observe: 'response'
        })
        .subscribe(console.log, (error) => this.error.next(error.error.error));
    }

    getPosts(): Observable<Post[]> {
        let searchParams = new HttpParams();
        /**
         * Param avaiable to send to Firebase
         * just to see the payload better formatted in the console
         */
        searchParams = searchParams.append('print', 'pretty');

        return this.http.get<Post[]>(this.ENDPOINT, {
            headers: new HttpHeaders({
                "Custom-Header": "Hello"
            }),
            params: searchParams,
            // the default response type, not required to set
            responseType: 'json',
        }).pipe(
            map((data: Post[]) => {
                // return an array of posts instead of an object with post for each key
                return Object.keys(data).reduce((prevKey, currKey) => [...prevKey, { id: currKey, ...data[currKey] }], [])
            }),
            // just to see better the loading indicator
            delay(1000),
            tap(console.log),
            catchError(error => {
                // e.g: Send to analytics server
                return throwError(error);
            })
        );
    }

    deletePosts() {
        return this.http.delete(this.ENDPOINT, {
            observe: 'events',
            // the type of the body value will be text instead of javascript object
            responseType: 'text'
        }).pipe(
            // tap allows us to do something while not changing the observable response
            // in this case we are taking a look at event types
            tap(event => {
                console.log(event)
                if (event.type === HttpEventType.Sent) {
                    // do something
                }
                if (event.type === HttpEventType.Response) {
                    console.log(event.body);
                }
            })
        )
    }
}