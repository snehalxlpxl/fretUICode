import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService{

  private openModalSubject = new Subject<any>();
  @ViewChild('value')value:ElementRef
  openModal$ = this.openModalSubject.asObservable();

  openModal(value): any {
    
    this.openModalSubject.next(value);
  }
  constructor() { }
}
