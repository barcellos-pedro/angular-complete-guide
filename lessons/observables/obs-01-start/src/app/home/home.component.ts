import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Observer, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObservable: Subscription;

  constructor() { }

  ngOnInit(): void {
    // this.firstObservable = interval(1000).subscribe(console.log);

    // Testing our own observable
    this.customObservable().subscribe((data) => {
      console.log(data)
    },
    // If an error occurs, the observable will never complete
    (error: Error) => console.log(`${error.name} - ${error.message}`),
    () => console.log('completed!'));

    // Using rxjs operators
    this.customObservable().pipe(
      filter((data: number) => data > 0),
      map((data: number) => `Round: ${data}`)
    ).subscribe(console.log);
  }

  customObservable(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      let count: number = 0;
      setInterval(() => {
        if (count === 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is > 3'));
        }
        observer.next(count);
        count++;
      }, 1000);
    });
  }

  ngOnDestroy(): void {
    // this.firstObservable.unsubscribe();
  }
}
