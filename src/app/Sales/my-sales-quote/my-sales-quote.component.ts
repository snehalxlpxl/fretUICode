import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
// @NgModule({

// })
@Component({
  selector: 'app-my-sales-quote',
  templateUrl: './my-sales-quote.component.html',
  styleUrls: ['./my-sales-quote.component.scss']
})
export class MySalesQuoteComponent implements OnInit {
  title:any;
  // title = 'BindingUp';
  // favBooks = [
  //   { title: 'Principles' },
  //   { title: 'The Story of Success' },
  //   { title: 'Extreme Economies' },
  // ];

  // onBookAdded(eventData: { title: string }) {
  //   this.favBooks = this.favBooks.concat({
  //     title: eventData.title,
  //   });
  //   console.log((this.favBooks));
    
  // }

  selectBasic = [
    {id:1, name: 'one'},
    {id:2, name: 'two'},
    {id:3, name: 'three'},
    {id:4, name: 'four'},
    
  ]
  // myControl = new FormControl('');
  // options: string[] = ['One', 'Two', 'Three'];
  // filteredOptions: Observable<string[]>;


  SalesQuoteForm : FormGroup;
  myobj1:any='';
  constructor(private fb: FormBuilder) { 
    this.SalesQuoteForm = this.fb.group({
      status: ['', Validators.required],
      namecolumn:['', Validators.required],
      mode_of_transport:['', Validators.required],
      Direction:['', Validators.required],
      CustomerName:['', Validators.required],
      SalesPersonName:['', Validators.required],
      SalesQuoteNumber:['', Validators.required],
      date:['', Validators.required],
      PackageDetails:['', Validators.required],
      Volume:['', Validators.required],
      GrossWeight:['', Validators.required]
    });
   
  }

  ngOnInit(): void {
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value || '')),
    //);
  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
  // }
  

save(form: FormGroup){
  //console.log(form.value);
  this.myobj1={
      status:form.value.status,
      namecolumn:form.value.namecolumn,
      mode_of_transport:form.value.mode_of_transport,
      Direction:form.value.Direction,
      CustomerName:form.value.CustomerName,
      SalesPersonName:form.value.SalesPersonName,
      SalesQuoteNumber:form.value.SalesQuoteNumber,
      date:form.value.date,
      PackageDetails:form.value.PackageDetails,
      Volume:form.value.Volume,
      GrossWeight:form.value.GrossWeight
      
  }
  console.log(this.myobj1);

  console.log(this.title);
}

onBookAdded(eventData: { myobj1: any }) {
 this.title= eventData.myobj1;
// console.log(this.title);

}


}
