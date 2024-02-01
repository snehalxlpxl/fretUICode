import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-my-sales-quote-list-item',
  templateUrl: './my-sales-quote-list-item.component.html',
  styleUrls: ['./my-sales-quote-list-item.component.scss']
})
export class MySalesQuoteListItemComponent implements OnInit, OnChanges {
//  @Input() myobj:any;
 @Output() bookTitleCreated = new EventEmitter<{ myobj1: any }>();
  // bookTitle: any;
  
  constructor() {
   }

ngOnChanges(changes: SimpleChanges): void {
  // console.log('ngOnChanges  called');
  // console.log(this.myobj);
}
  

  ngOnInit(): void {
  }
  // onAddTitle() {
  //   this.bookTitleCreated.emit({ title:this.bookTitle });
  // }
 

  // public
  public items:any = [{ chargeItem: '', Quantity: '', BuyingRate: '', BuyingAmount: '' , TaxPercentage: '' , BuyingTaxAmount: '' }];

  public item = {
    chargeItem: '',
    Quantity: '',
    BuyingRate: '',
    BuyingAmount: '',
    TaxPercentage: '',
    BuyingTaxAmount: ''
  };

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Add Item
   */
  addItem() {
    this.items.push({
      chargeItem: '',
      Quantity: '',
      BuyingRate: '',
      BuyingAmount:'',
      TaxPercentage: '',
      BuyingTaxAmount:''
    });
  }

  /**
   * DeleteItem
   *
   * @param id
   */
  deleteItem(id) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items.indexOf(this.items[i]) === id) {
        this.items.splice(i, 1);
        break;
      }
    }
  }
  save(){
 
    // console.log(this.items);
   // console.log(this.myobj);
   this.bookTitleCreated.emit({ myobj1:this.items});
  }

}
