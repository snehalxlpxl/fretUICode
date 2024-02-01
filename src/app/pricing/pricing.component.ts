

import { Component, OnInit, OnDestroy,ViewEncapsulation, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as snippet from 'app/companies/datatables.snippetcode';
import { ColumnMode,id, SelectionType } from '@swimlane/ngx-datatable';
import { DatatableComponent } from '@swimlane/ngx-datatable';
// import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { from, Observable, Subject, Subscription, timer } from 'rxjs';
import { clear } from 'console';
import { DatePipe } from '@angular/common';
import { NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { startWith, switchMap } from 'rxjs/operators';
import { SaleQuates } from './saleQuates';
import { AppConfigService } from 'app/services/app-config.service';
// import { saleQuates } from './saleQuates';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})

export class PricingComponent implements OnInit {

  SalesQuoteForm:FormGroup
  fg: FormGroup;
  public QuoteDate: NgbDateStruct;
  public enquiryDate: NgbDateStruct;
  public expdate:NgbDateStruct;
  userdata: any;
  companyname: any;
  contacts: any;
  salequatesObj: SaleQuates = new SaleQuates();
  salequate: { SalesQuoteNumber: any; SaleQuoteDate: any; SaleQuoteType: any; SalePersonDisplayName: any; Modeoftransport: any; Direction: any; CompanyDisplayName: any; ContactDisplayName: any; EnquiryReceivedDate: any; ExpiryDate: any; };
  enquiryDateyear: any;
  enquiryDatemonth: any;
  enquiryDateday: any;
  enquiryd: any;
  expiryd: string;
  salequatesyear: any;
  salequatesmonth: any;
  salequatesd: string;
  salequatesday: any;
  salesPersonId: any;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  salesdata: any;
  id: any;
  
  constructor( private httpclient: HttpClient,private fb: FormBuilder,private toastr: ToastrService,private apiConfig:AppConfigService) {
    this.myForm();
  }

   //Create required field validator for name
   myForm() {
    this.SalesQuoteForm = this.fb.group({
      salesQuoteID:0,
      salesQuoteNumber: ['', Validators.required ],
      salesQuoteDate:['', Validators.required ],
      salesQuoteType:['', Validators.required ],
      salesPerson:['', Validators.required ],
      modeoftransport:['', Validators.required ],
      direction:['', Validators.required ],
      companyName:['', Validators.required ],
      Contact:['', Validators.required ],
      expiryDate:['', Validators.required ],
      enqReceivedDate:['', Validators.required ],
      revisionId:1,
      commodity:['', Validators.required ]
    });
 }

  ngOnInit(): void {
    
  //   this.myForm();
  //  this.getAllSaleQuates();
  //  this.getAllSalesPersonNames();
  //  this.getAllCompanyNames();
  //  this.getAllContacts();

  }
  //get all sales person name
  getAllSaleQuates():Promise<any[]>{
      return new Promise((resolve, reject) => {
      this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/SalesQuotes`).subscribe((response: any) => {
        this.salesdata=response;
        // console.log(this.userdata)
      }, reject);
    });
  }
//get all sales person name
  getAllSalesPersonNames():Promise<any[]>{
      return new Promise((resolve, reject) => {
      this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/UserMaster`).subscribe((response: any) => {
        this.userdata=response;
        // console.log(this.userdata)
      }, reject);
    });
  }

  //get all companyes name
  getAllCompanyNames():Promise<any[]>{
      return new Promise((resolve, reject) => {
      this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/Companies`).subscribe((response: any) => {
        this.companyname=response;
        console.log(this.companyname)
      }, reject);
    });
  } 
  //get all companyes name
  getAllContacts():Promise<any[]>{
    return new Promise((resolve, reject) => {
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/Contacts`).subscribe((response: any) => {
      this.contacts=response;
      console.log(this.contacts)
    }, reject);
  });
} 
onChangeSalePerson(event:any){
  return event.target.value;
  //console.log(this.salesPersonId)
}
  onSubmit(form:FormGroup)
  {
    this.id=form.value.salesQuoteId;
    //alert(this.id);
    //date format
    this.enquiryDateyear=form.value.expiryDate.year;
    this.enquiryDatemonth=form.value.expiryDate.month;
    this.enquiryDateday=form.value.expiryDate.day;
    this.expiryd=this.enquiryDateyear+"-"+this.enquiryDatemonth+"-"+form.value.expiryDate.month;
    this.salequatesyear=form.value.salesQuoteDate.year;
    this.salequatesmonth=form.value.salesQuoteDate.month;
    this.salequatesday=form.value.salesQuoteDate.day;
    this.salequatesd=this.enquiryDateyear+"-"+this.enquiryDatemonth+"-"+form.value.expiryDate.month;
    //console.log(this.enquiryd)

    //Sales Quates obj
    // this.salequatesObj={
    //   salesQuoteId:form.value.salesQuoteId,
    //   salesQuoteNumber:form.value.salesQuoteNumber,
    //   salesQuoteDate:form.value.salesQuoteDate,
    //   salesQuoteType:form.value.salesQuoteType,
    //   salesPersonDisplayName:form.value.salesPerson,
    //   modeoftransport:form.value.ModeofTransport,
    //   direction:form.value.Direction,
    //   companyDisplayName:form.value.companyName,
    //   contactDisplayName:form.value.Contact,
    //   enqReceivedDate:form.value.enquiryDate,
    //   expiryDate:form.value.expiryDate,
    //   revisionId:form.value.revisionId,
    //   commodity:form.value.commodity,
    // }
    this.salequatesObj=this.SalesQuoteForm.value;
    console.log("form data",this.salequatesObj);

    console.log(this.salequatesObj);
    if(form.value.salesQuoteID==0){
          
      this.httpclient.post('${this.apiConfig.apiBaseUrl}/api/SalesQuotes', JSON.stringify(this.salequatesObj), this.headers).subscribe(res => {
        console.log('Success');
        console.log(res);
           
       // alert("data added")
        this.resetForm(form);
        this.getAllSaleQuates();
                  

      }, err => {
        console.log('Error');
        alert(JSON.stringify(err));

      });
        this.toastr.success('data added');
      }

    else
      {
        //update
      }
  }

  private dateRangeValidator: ValidatorFn = (): {
    [key: string]: any;
  } | null => {
    let invalid = false;
    const salesQuoteDate = this.SalesQuoteForm && this.SalesQuoteForm.get("salesQuoteDate").value;
    const expiryDate = this.SalesQuoteForm && this.SalesQuoteForm.get("expiryDate").value;
    if (salesQuoteDate && expiryDate) {
      invalid = new Date(salesQuoteDate).valueOf() > new Date(expiryDate).valueOf();
    }
    return invalid ? { invalidRange: { salesQuoteDate, expiryDate } } : null;
  };
    
  selectEvent(item) {
    // do something with selected item
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something
  }
  resetForm(form: FormGroup) {

    form.reset();

  }
  
}






