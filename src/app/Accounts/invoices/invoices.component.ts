import { Component, Input, OnInit ,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as snippet from 'app/companies/datatables.snippetcode';
import { ColumnMode,DatatableComponent,id, SelectionType } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import { from, Observable, Subject, Subscription, timer } from 'rxjs';
import { clear, timeStamp } from 'console';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { startWith, switchMap } from 'rxjs/operators';
import { threadId } from 'worker_threads';
import { invoice } from './Invoice';
import { Counter } from './Counter';
import { AppConfigService } from 'app/services/app-config.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  formatdate = 'dd/MM/yyyy'; 
  myDate=new Date();
  today:Date; 
  ContainerForm: FormGroup;
  companydataurlid: any;
  router: any;
  public selected = [];
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public SelectionType = SelectionType;
  tempData= [];
  rows: any;
  public ColumnMode = ColumnMode;
  Data:any;
  CompanyForm: FormGroup;
  InvoiceObj: invoice=new invoice();
  CountereObj: Counter=new Counter();
  counter: any;
  counterValue: any;
  counterId: any;
  counterName:any;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;

    // snippet code variables
    public _snippetCodeKitchenSink = snippet.snippetCodeKitchenSink;
    public _snippetCodeInlineEditing = snippet.snippetCodeInlineEditing;
    public _snippetCodeRowDetails = snippet.snippetCodeRowDetails;
    public _snippetCodeCustomCheckbox = snippet.snippetCodeCustomCheckbox;
    public _snippetCodeResponsive = snippet.snippetCodeResponsive;
    public _snippetCodeMultilangual = snippet.snippetCodeMultilangual;
    public _snippetCodeVertical = snippet.snippetCodeVertical;

    /**
    * Method Search (filter)
    *
    * @param event
    */
     filterUpdate(event) {
      const val = event.target.value.toLowerCase();

      // filter our data
      const temp = this.tempData.filter(function (d) {
       // console.log(d.formattedAddress);
        return d.invoiceNumber.toLowerCase().indexOf(val) !== -1 || !val;
      });

      // update the rows
      this.kitchenSinkRows = temp;
      // Whenever the filter changes, always go back to the first page
      // this.table.offset = 0;
    }
    headers = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
    };




  constructor(private httpclient : HttpClient, public datepipe:DatePipe,private route:ActivatedRoute,private modalService: NgbModal, private fb: FormBuilder,private apiConfig:AppConfigService) 
  {
    this.CompanyForm = this.fb.group({
      currentInvoiceNumber:[''],
      invoiceNumber:[''],
      counterValue:[''],
      currentCounterNumber:[''],
      counterId:[''],
      counterName:['']
     })
  }

  ngOnInit(): void {
    this.getDataTableRows();
    this.getCounterValue();
  }
  getDataTableRows(): Promise<any[]> {
    return new Promise((resolve, reject) => {

      this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/Invoices`).subscribe((response: any) => {
        console.log('get all Invoices');
        console.log("Response",response)
        this.rows = response;
        this.tempData = this.rows;
        this.kitchenSinkRows = this.rows;
        // this.exportCSVData = this.rows;
        // this.onDatatablessChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  getCounterValue(){
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/CounterMaster`).subscribe((response: any) => {
      console.log(response);
      this.counter=response; 
      console.log("counter value ",this.counter[0].counterValue);
      JSON.stringify(this.counter)
     this.counterValue= this.counter[0].counterValue
     this.counterId= this.counter[0].counterId
     this.counterName= this.counter[0].counterName
    //   console.log(this.counter.counterValue);
    // JSON.stringify(this.counterValue);
    })
  }
  populateForm(invoiceId, modalForm,id:any){
    // console.log("rowData", cargoid);
    console.log("rowData", invoiceId);

    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/Invoices/${invoiceId}`,this.headers).subscribe((res: any) => {
     this.Data=res;
     console.log("row**************",this.Data)
     this.modalService.open(modalForm, {windowClass: 'modalForm'})
     this.CompanyForm.patchValue({
      currentInvoiceNumber:this.Data.invoiceNumber,
      invoiceId: this.Data.invoiceId,
      cargoId: this.Data.cargoId,
      invoiceNumber:this.Data.invoiceNumber,
      invoiceDate:this.Data.invoiceDate,
      invoiceType:this.Data.invoiceType,
      payingPartyId: this.Data.payingPartyId,
      payingParty:this.Data.payingParty,
      payingPartyAddressId: this.Data.payingPartyAddressId,
      payingPartyAddress:this.Data.payingPartyAddress,
      currencyId: this.Data.currencyId,
      currencyCode:this.Data.currencyCode,
      exchangeRateId: this.Data.exchangeRateId,
      exchangeRate: this.Data.exchangeRate,
      jobNumber:this.Data.jobNumber,
      vesselVoyage:this.Data.vesselVoyage,
      cycle:this.Data.cycle,
      cargoType:this.Data.cargoType,
      freightStatus:this.Data.freightStatus,
      mblMawb:this.Data.mblMawb,
      pol:this.Data.pol,
      finalDestination:this.Data.finalDestination,
      creditDays:this.Data.creditDays,
      shipperInvoiceDetails:this.Data.shipperInvoiceDetails,
      hblHawb:this.Data.hblHawb,
      flightDetails:this.Data.flightDetails,
      notes1:this.Data.notes1,
      invoiceAmount: this.Data.invoiceAmount,
      taxAmount: this.Data.taxAmount,
      invoiceAmountWords:this.Data.invoiceAmountWords,
      invoiceAmountLocalCurrency: this.Data.invoiceAmountLocalCurrency,
      taxAmountLocalCurrency: this.Data.taxAmountLocalCurrency,
      serviceTax: this.Data.serviceTax,
      educationCess: this.Data.educationCess,
      shecess: this.Data.shecess,
      nonTaxableAmount: this.Data.nonTaxableAmount,
      taxableAmount: this.Data.taxableAmount,
      localCurrencyId: this.Data.localCurrencyId,
      isLocked: this.Data.isLocked,
      lockedBy: this.Data.lockedBy,
      dateLocked:this.Data.dateLocked,
      isSentToParty: this.Data.isSentToParty,
      sentBy: this.Data.sentBy,
      sentDate:this.Data.sentDate,
      createdBy: this.Data.createdBy,
      dateCreated:this.Data.dateCreated,
      modifiedBy: this.Data.modifiedBy,
      dateModified:this.Data.dateModified,
      deletedBy: this.Data.deletedBy,
      dateDeleted:this.Data.dateDeleted,
      isDeleted: this.Data.isDeleted,
      invoiceApprovalStatus:this.Data.invoiceApprovalStatus,
      costSheetId: this.Data.costSheetId,
      invoiceTypeGst: this.Data.invoiceTypeGst,

      counterId:this.counterId,
      counterValue:this.counterValue,
      counterName:this.counterName,
      currentCounterNumber:this.counterValue
     })
     console.log("1111111111",this.CompanyForm.value);
    
    })
    // console.log("rowData", counterId);

    // this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/CounterMaster/${counterId}`,this.headers).subscribe((res: any) => {
    //  this.Data=res;
    //  console.log("row***(((((((",this.Data)
    //  this.modalService.open(modalForm, {windowClass: 'modalForm'})
    //  this.CompanyForm.patchValue({
      // counterId:this.Data.counterId,
      // counterValue:this.Data.counterValue,
      // counterName:this.Data.counterName,
      // currentCounterNumber:this.Data.counterValue
    //  })
    // });
  }

  UpdateCompany(form: FormGroup){
    console.log("form.value",form.value);
  
    this.InvoiceObj =
    {
      "invoiceId": this.Data.invoiceId,
      "cargoId": this.Data.cargoId,
      "invoiceNumber": form.value.invoiceNumber,
      "invoiceDate": this.Data.invoiceDate,
      "invoiceType": this.Data.invoiceType,
      "payingPartyId": this.Data.payingPartyId,
      "payingParty": this.Data.payingParty,
      "payingPartyAddressId": this.Data.payingPartyAddressId,
      "payingPartyAddress": this.Data.payingPartyAddress,
      "currencyId": this.Data.currencyId,
      "currencyCode": this.Data.currencyCode,
      "exchangeRateId": this.Data.exchangeRateId,
      "exchangeRate": this.Data.exchangeRate,
      "jobNumber": this.Data.jobNumber,
      "vesselVoyage": this.Data.vesselVoyage,
      "cycle": this.Data.cycle,
      "cargoType": this.Data.cargoType,
      "freightStatus": this.Data.freightStatus,
      "mblMawb": this.Data.mblMawb,
      "pol": this.Data.pol,
      "finalDestination": this.Data.finalDestination,
      "creditDays": this.Data.creditDays,
      "shipperInvoiceDetails": this.Data.shipperInvoiceDetails,
      "hblHawb": this.Data.hblHawb,
      "flightDetails": this.Data.flightDetails,
      "notes1": this.Data.notes1,
      "invoiceAmount": this.Data.invoiceAmount,
      "taxAmount": this.Data.taxAmount,
      "invoiceAmountWords": this.Data.invoiceAmountWords,
      "invoiceAmountLocalCurrency": this.Data.invoiceAmountLocalCurrency,
      "taxAmountLocalCurrency": this.Data.taxAmountLocalCurrency,
      "serviceTax": this.Data.serviceTax,
      "educationCess": this.Data.educationCess,
      "shecess": this.Data.shecess,
      "nonTaxableAmount": this.Data.nonTaxableAmount,
      "taxableAmount": this.Data.taxableAmount,
      "localCurrencyId": this.Data.localCurrencyId,
      "isLocked": this.Data.isLocked,
      "lockedBy": this.Data.lockedBy,
      "dateLocked": this.Data.dateLocked,
      "isSentToParty": this.Data.isSentToParty,
      "sentBy": this.Data.sentBy,
      "sentDate": this.Data.sentDate,
      "createdBy": this.Data.createdBy,
      "dateCreated": this.Data.dateCreated,
      "modifiedBy":this.Data.modifiedBy,
      "dateModified": new Date().toISOString(),
      "deletedBy": this.Data.deletedBy,
      "dateDeleted": this.Data.dateDeleted,
      "isDeleted": this.Data.isDeleted,
      "invoiceApprovalStatus": this.Data.invoiceApprovalStatus,
      "costSheetId": this.Data.costSheetId,
      "invoiceTypeGst": this.Data.invoiceTypeGst
    }
    console.log(JSON.stringify(this.InvoiceObj));
  
    this.httpclient.put(`${this.apiConfig.apiBaseUrl}/api/Invoices/${this.InvoiceObj.invoiceId}`, JSON.stringify(this.InvoiceObj), this.headers).subscribe(res => {
     console.log(' Update Success');
     console.log(res);
     this.getDataTableRows();
     Swal.fire({
       title: 'Invoices UPDATE'
     })
   }, err => {
     console.log('Error');
     console.log(err);
     Swal.fire({
       title: 'Something went wrong'
     })
   });



   this.CountereObj={

    "counterId": this.counterId,
    "counterName": this.counterName,
    "counterValue": form.value.counterValue
   }
   console.log(JSON.stringify(this.CountereObj));
   this.httpclient.put(`${this.apiConfig.apiBaseUrl}/api/CounterMaster/${this.CountereObj.counterId}`, JSON.stringify(this.CountereObj), this.headers).subscribe(res => {
    console.log(' Update Success');
    console.log(res);
    this.getDataTableRows();
    Swal.fire({
      title: 'Counter UPDATE'
    })
  }, err => {
    console.log('Error');
    console.log(err);
    Swal.fire({
      title: 'Something went wrong'
    })
  });

  }
  onSubmitService(form: FormGroup) {
    console.log( "CompanyForm.value***",this.CompanyForm.value);
    console.log("UPDATE");
    this.UpdateCompany(this.CompanyForm)
     this.success();
 
     console.log(this.InvoiceObj.invoiceId);
     console.log(this.InvoiceObj.invoiceNumber);
     this.modalService.dismissAll();

  }

success(){
  Swal.fire(
    'Save',
    'Saved Successfully',
    'success'
  )
}

resetForm(form: FormGroup) {

  form.reset();

}

}
