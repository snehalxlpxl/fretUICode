import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sales-quote-charges-modal',
  templateUrl: './sales-quote-charges-modal.component.html',
  styleUrls: ['./sales-quote-charges-modal.component.scss']
})
export class SalesQuoteChargesModalComponent implements OnInit {

  @Output() sendChildValue= new EventEmitter<any>();
  sqID: any;
  sendValueToParentDetailList(id: any) {
    this.sendChildValue.emit(id);
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
