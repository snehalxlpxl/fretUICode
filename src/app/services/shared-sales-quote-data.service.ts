import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedSalesQuoteDataService {


  private sharedData: Subject<any> = new Subject<any>();
  sharedData$: Observable<any> = this.sharedData.asObservable();
  constructor() { }

  setData(onSubmitService) {
    this.sharedData.next(onSubmitService);
  }
}
