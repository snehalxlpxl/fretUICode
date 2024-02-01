// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-sales-quotes',
//   templateUrl: './sales-quotes.component.html',
//   styleUrls: ['./sales-quotes.component.scss']
// })
// export class SalesQuotesComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }





// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,OnInit} from '@angular/core';
// import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
// import { Subject } from 'rxjs';
// import * as snippet from 'app/companies/datatables.snippetcode';
// import { CoreTranslationService } from '@core/services/translation.service';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import {SalesQuote } from 'app/services/SalesQuote';
// import { formatDate } from '@angular/common';

@Component({
  selector: 'app-sales-quotes',
  templateUrl: './sales-quotes.component.html',
  styleUrls: ['./sales-quotes.component.scss']
})


export class SalesQuotesComponent implements OnInit {
//  formatdate = 'dd/MM/yyyy'; 
//      myDate=new Date();

//      today:Date;

    //  reviewData:SalesQuote=new SalesQuote();

  // title='datePicker';
  // currentDate:any= new Date();
  // selectedModeDate!:Date;
  // ordinaryDateSelected!:Date;
  // public MinMaxDPdata: NgbDateStruct;
 

  // salesObj: SalesQuote = new SalesQuote();
  // editsalesForm : FormGroup;
  // modelheading="";
  // id: string;
  // submitted:boolean=false;
 
  // private _unsubscribeAll: Subject<any>;
  // private tempData = [];
 
  // public companies : any=[];
  // public contentHeader: object;
  // public company: any=[];
  // public rows: any = []; 
  // public LocationType1: [];
  // public LocationType2:[];

  // public myType=[];
  // public selected = [];
  // public kitchenSinkRows: any;
  // public basicSelectedOption: number = 10;
  // public ColumnMode = ColumnMode;
  // public expanded = {};
  // public editingName = {};
  // public editingStatus = {};
  // public editingAge = {};
  // public editingSalary = {};
  // public chkBoxSelected = [];
  // public SelectionType = SelectionType;
  // public exportCSVData;
  // type="Customer";
  // selectElementText="Select SalesPerson";
  // selectOceanPolText="Select POL";
  // selectOceanPodText="Select POD";
  // selectAirPolText="Select POL"
  // selectAirPodText="Select POD"
  // salestypeId=5;
  // SQTypes = ['FCL', 'LCL', 'AIR'];

  // form: FormGroup<any>;
  // isOcean:boolean=false;

  // public selectedvalue="";


  // @ViewChild('closeModal') private closeModal: ElementRef;

  // @ViewChild(DatatableComponent) table: DatatableComponent;
  // @ViewChild('tableRowDetails') tableRowDetails: any;

  // headers = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   })
  // };
 
  // SalesObj: {
  //   SalesQuoteId: number; SalesQuoteType: any;
  //   // "salesQuoteNumber": form.value.SalesQuoteNumber,
  //   SalesPerson: any; Customer: any; Contact: string; Pol: any; Pod: any; GrossWeight: any; Volume: number; Commodity: string; RequiredEquipment: string; SalesPersonId: number; BusinessReceivedDate: string; AgentDetails: string; Status: string; PreparedBy: string; QuoteDays: number; ResponseDays: number; CreatedBy: number; PreparedBy1: number; ManagerId: number; Modeoftransport: string; Direction: string; OfficeName: string; BusinessLostNotes: string; DateCreated: string;
  // };
  // SalesQuoteType: any;

//   private clModal(): void {
//     this.closeModal.nativeElement.click();
// }

//   // snippet code variables
//   public _snippetCodeKitchenSink = snippet.snippetCodeKitchenSink;
//   public _snippetCodeInlineEditing = snippet.snippetCodeInlineEditing;
//   public _snippetCodeRowDetails = snippet.snippetCodeRowDetails;
//   public _snippetCodeCustomCheckbox = snippet.snippetCodeCustomCheckbox;
//   public _snippetCodeResponsive = snippet.snippetCodeResponsive;
//   public _snippetCodeMultilangual = snippet.snippetCodeMultilangual;
//   public _snippetCodeVertical = snippet.snippetCodeVertical;
  



// OnlyNumbersAllowed(event){
//   const charCode=(event.which)?event.which:event.keyCode;
//   if(charCode>31 && (charCode < 48 || charCode >57))
//   {
// console.log('charCode is ressticted'+ charCode);
// return false;
//   }
//   return true;
// }

  // private _companylistService: any;
  // Public Methods
  // -----------------------------------------------------------------------------------------------------



// validation for form

//   public _snippetCodeTDsimpleValidation = snippet.snippetCodeTDsimpleValidation;
//   public _snippetCodeTDMultiRuleValidation = snippet.snippetCodeTDMultiRuleValidation;
//   public _snippetCodeInputValidation = snippet.snippetCodeInputValidation;
//   public _snippetCodeReactiveForms = snippet.snippetCodeReactiveForms;

//   registerForm: FormGroup;
//   get f() { return this.registerForm.controls; }

//   letterOnly(event) : Boolean{
//     const charCode = (event.which) ? event.which : event.keyCode;
//     if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
//       return false;
//     }
//     return true;
//   }

//   numberOnly(event): boolean {
//     const charCode = (event.which) ? event.which : event.keyCode;
//       if (charCode > 31 && (charCode < 48 || charCode > 57)) {
//          return false;
//       }
//       return true;
  
//   }
  
//   onSubmit() {
//     this.submitted = true;

//     // stop here if form is invalid
//     if (this.registerForm.invalid) {
//         return;
//     }

//     alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
// }

// end validation form




  // /**
  // //  * Inline editing Name
  // //  *@param {NgbModal} modalService
  // //  * @param event
  // //  * @param cell
  // //  * @param rowIndex
  //  */
//   inlineEditingUpdateName(event, cell, rowIndex) {
//     this.editingName[rowIndex + '-' + cell] = false;
//     this.rows[rowIndex][cell] = event.target.value;
//     this.rows = [...this.rows];
//   }

//   /**
//    * Inline editing Age
//    *
//    * @param event
//    * @param cell
//    * @param rowIndex
//    */
//   inlineEditingUpdateAge(event, cell, rowIndex) {
//     this.editingAge[rowIndex + '-' + cell] = false;
//     this.rows[rowIndex][cell] = event.target.value;
//     this.rows = [...this.rows];
//   }

//   /**
// //    * Inline editing Salary
// //    *
// //    * @param event
// //    * @param cell
// //    * @param rowIndex
//    */
//   inlineEditingUpdateSalary(event, cell, rowIndex) {
//     this.editingSalary[rowIndex + '-' + cell] = false;
//     this.rows[rowIndex][cell] = event.target.value;
//     this.rows = [...this.rows];
//   }

//   /**
//    * Inline editing Status
//    *
//    * @param event
//    * @param cell
//    * @param rowIndex
//    */
//   inlineEditingUpdateStatus(event, cell, rowIndex) {
//     this.editingStatus[rowIndex + '-' + cell] = false;
//     this.rows[rowIndex][cell] = event.target.value;
//     this.rows = [...this.rows];
//   }

//   /**
//    * Search (filter)
//    *
//    * @param event
//    */
//   filterUpdate(event) {
//     const val = event.target.value.toLowerCase();

//     // filter our data
//     const temp = this.tempData.filter(function (d) {
//       return d.full_name.toLowerCase().indexOf(val) !== -1 || !val;
//     });

//     // update the rows
//     this.kitchenSinkRows = temp;
//     // Whenever the filter changes, always go back to the first page
//     this.table.offset = 0;
//   }

//   /**
//    * Row Details Toggle
//    *
//    * @param row
//    */
//   rowDetailsToggleExpand(row) {
//     this.tableRowDetails.rowDetail.toggleExpandRow(row);
//   }


//   onSelect({ selected }) {
//     console.log('Select Event', selected, this.selected);

//     this.selected.splice(0, this.selected.length);
//     this.selected.push(...selected);
//   }
//   /**
//    * For ref only, log selected values
//    *
//    * @param selected
//    */
//   // onSelect(myType) {
//   //   console.log(myType.target.value);
//   // }

//   /**
//    * For ref only, log activate events
//    *
//    * @param selected
//    */
//   // onActivate(event,modalForm,myvalue) {
//   //   if (event.type=="click" && myvalue=="frmOpen"){
//   //     console.log('get all');
//   //     console.log(event);
//   //     console.log(event.rowData);
//   //     this.modalService.open(modalForm);
//   //     this.editsalesForm.patchValue({
//   //       enquiryReceivedDate:event.rowData.enquiryReceivedDate,
//   //       companyTypeId:event.rowData.companyTypeId,
//   //       salesQuoteType:event.rowData.salesQuoteType,
//   //       quoteSentOn: event.rowData.quoteSentOn,
//   //       grossWeight:event.rowData.grossWeight,
//   //       customer: event.rowData.customer,
//   //       contact:event.rowData.contact,
//   //       pol:event.rowData.pol,
//   //       pod:event.rowData.pod,
//   //      });
//   //   }
//   //   else{
//   //     console.log('NOT FRMOPEN');
//   //   }
 
//   // }
//   onSelected(event) {
//     this.selectedvalue = event.target.value;
//     console.log(this.selectedvalue);
//     if (this.selectedvalue=="FCL" || this.selectedvalue=="LCL"){
//       this.isOcean=true;
//      this.getLocationOceanType();
//     }
//     if (this.selectedvalue=="AIR"){
//       this.isOcean=false;
//       this.getLocationAirType();
//     }
//   }
  

 


 
  
//   /**
//    * Custom Chkbox On Select
//    *
//    * @param { selected }
//    */
//   customChkboxOnSelect({ selected }) {
//     this.chkBoxSelected.splice(0, this.chkBoxSelected.length);
//     this.chkBoxSelected.push(...selected);
//   }

//   // modalOpen(modalBasic) {
//   //   this.modalService.open(modalBasic, {
//   //     windowClass: 'modal'
//   //   });
//   // }

  
//   modalOpenForm(modalForm,myparam) {
// // console.log('add');
// // console.log(this.addSales);
//     if (myparam=='Add') {
//       this.modelheading='Add Sales';
//     } 
 
//     this.modalService.open(modalForm);
    
//   }

//   openModal(targetModal) {
//     this.modalService.open(targetModal, {
//      centered: true,
//      backdrop: 'static'
//     });
//   }

//   populateForm(rowData,modalForm,edit){

//     console.log('data');

//     console.log(rowData);

//     // this.reviewData=Object.assign({},rowData);

//     //  this.editsalesForm.patchValue(this.reviewData);


//     if (edit=='edit') {
//       this.modelheading='SQ#'+rowData.salesQuoteNumber;
//     } 
//     this.modalService.open(modalForm);

//     if(rowData.salesQuoteNumber != null){
//       this.selectElementText=rowData.salesQuoteNumber;     
//       console.log(this.selectElementText);
//     }

//     // var myenqRecdate=formatDate(rowData.enquiryReceivedDate, 'dd/MM/yyyy', 'en').toString();
//     // console.log(myenqRecdate);

//     // console.log('Date');

//     // console.log(formatDate(rowData.enquiryReceivedDate, 'dd/MM/yyyy', 'en'),);


//     // this.editsalesForm.controls['enquiryReceivedDate'].setValue(myenqRecdate);


//     this.editsalesForm.patchValue({
//       salesQuoteId:rowData.salesQuoteId,
//       enquiryReceivedDate:rowData.enquiryReceivedDate,
//       salesQuoteType:rowData.salesQuoteType,
//       salesQuoteNumber:rowData.salesQuoteNumber,
//       // quoteSentOn: rowData.quoteSentOn,
//       grossWeight:rowData.grossWeight,
//       customer: rowData.customer,
//       contact:rowData.contact,
//       pol:rowData.pol,
//       pod:rowData.pod,
//      });

//   }
//   /**
//    * Constructor
//    *
//    * @param {DatatablesService} _datatablesService
//    * @param {CoreTranslationService} _coreTranslationService
//    */
//   constructor(private _coreTranslationService: CoreTranslationService, private httpclient: HttpClient, private fb: FormBuilder,private modalService: NgbModal) {
//     this._unsubscribeAll = new Subject();
//     // this._coreTranslationService.translate(english, french, german, portuguese);
//     console.log('Printing Date in constructor'); 
//     console.log(formatDate(this.myDate, 'dd-MM-yyyy', 'en'));

//     this.editsalesForm = this.fb.group({
//       salesQuoteId:0,
//       salesQuoteType:['',Validators.required],
//       salesQuoteNumber:['',Validators.required],
//       salesQuoteDate:[''],
//       modeoftransport:[''],
//       //BirthDate:'',
//       enquiryReceivedDate :[''],
//       //enquiryReceivedDate:[this.myDate],
//       // quoteSentOn:['',Validators.required],
//       customer:['',Validators.required],
//       contact:['',Validators.required],
//       locationId1:[0,Validators.required],
//       locationId2:[0,Validators.required],
//       grossWeight:[0,Validators.required],

//       // email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
//       // password: ['', [Validators.required, Validators.minLength(6)]],
//       // companyTypeId:this.cmptypeId,
//       //  companyTypeName:[''],
//       // email: ['',Validators.required],
//       // website: ['',Validators.required],
//       // companyApprovalStatus:['',Validators.required],
//      });
//   }


//   // Lifecycle Hooks
//   // -----------------------------------------------------------------------------------------------------

//   /**
//    * On init
//    */
  ngOnInit() {}

//     this.today =new Date();
//     console.log(new Date().toISOString());
    
//     //  this.resetForm();
   
     
//     // this._companylistService.onDatatablessChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
//     //   this.rows = response;
//     //   this.tempData = this.rows;
//     //   this.kitchenSinkRows = this.rows;
//     //   this.exportCSVData = this.rows;
//     // });
//     // this.getLocationType();
    
//     this.getDataTableRows();

//     // this.httpclient.get(`http://localhost:5109/api/Cargo`).subscribe(res=>{
//     //   console.log('get all cargolist');
//     //   this.rows=res;
//     //   this.tempData = this.rows;
//     //   this.kitchenSinkRows = this.rows;
//     //   this.exportCSVData = this.rows;
//     // }, err => {
//     //   console.log("error while fetching data");
  
//     // });
//     this.contentHeader = {
//       headerTitle: 'Datatables',
//       actionButton: true,
//       breadcrumb: {
//         type: '',
//         links: [
//           {
//             name: 'Home',
//             isLink: true,
//             link: '/'
//           },
//           {
//          name: 'Forms & Tables',
//          isLink: true,
//         link: '/'
//       },
//       {
//          name: 'Datatables',
//          isLink: false
//       }
//      ]
//    }
//  };
// }



// getSelectedOceanpolText(event: Event){

//   console.log(event.target['options'][event.target['options'].selectedIndex].value);
//   this.selectOceanPolText = event.target['options'][event.target['options'].selectedIndex].text;
//   console.log(this.selectOceanPolText);

// }

// getSelectedOceanpodText(event: Event){

//   console.log(event.target['options'][event.target['options'].selectedIndex].value);
//   this.selectOceanPodText = event.target['options'][event.target['options'].selectedIndex].text;
//   console.log(this.selectOceanPodText);

// }

// getSelectedAirPolText(event:Event){
//   console.log(event.target['options'][event.target['options'].selectedIndex].value);
//   this.selectAirPolText = event.target['options'][event.target['options'].selectedIndex].text;
//   console.log(this.selectAirPolText);
// }

// getSelectedAirPodText(event:Event){
//   console.log(event.target['options'][event.target['options'].selectedIndex].value);
//   this.selectAirPodText = event.target['options'][event.target['options'].selectedIndex].text;
//   console.log(this.selectAirPodText);
// }


//   getDataTableRows():Promise<any[]>{
//     return new Promise((resolve, reject) => {
      
//       this.httpclient.get(`http://localhost:5109/api/SalesQuoteNew/salesQList`).subscribe((response: any) => {
//         console.log('get all comapnies');
//         this.rows = response;
//         this.tempData = this.rows;
//         this.kitchenSinkRows = this.rows;
//         // this.exportCSVData = this.rows;
//         // this.onDatatablessChanged.next(this.rows);
//         resolve(this.rows);
//       }, reject);
//     });
//   }

//   get registerFormControl() {
//     return this.editsalesForm.controls;
//   }

//   resetForm(form:FormGroup){

//     form.reset();

//   }

//   addSales(form: FormGroup) {

//     console.log(form.value.salesQuoteId);

//     this.salesObj =
//     { 
//      "salesQuoteId":0,
//      "salesQuoteNumber":form.value.salesQuoteNumber,
//     "salesPersonId":0,
//     "companyId": 0,
//     "contactId":0,
//     "preparedBy": 0,
//     "salesQuoteDate":"2023-01-17T07:48:17.565Z",
//     "enqReceivedDate":form.value.enquiryReceivedDate,
//     "expiryDate": "2023-01-09T07:48:17.565Z",
//     "typeOfMoveId":0,
//     "incoTermId": 0,
//     "oldSalesQuoteId": 0,
//     "revisionId":0,
//     "fileId": 0,
//     "isDraft": false,
//     "isApproved": false,
//     "approvedDate": "2023-01-09T07:48:17.565Z",
//     "isRejected": false,
//     "rejectedDate":"2023-01-09T07:48:17.565Z",
//     "createdBy":0,
//     "dateCreated":"2023-01-09T07:48:17.565Z",  
//     "modifiedBy": 0,
//     "dateModified":"2023-01-09T07:48:17.565Z",
//     "deletedBy": 0,
//     "dateDeleted": "2023-01-09T07:48:17.565Z",
//     "isDeleted": false,
//     "isContract": false,
//     "contractNumber": "",
//     "showTotal": true,
//     "showTax": false,
//     "showCarrier": true,
//    "isHazardous": false,
//     "commodity": "",
//     "commodityValue": 0,
//     "commodityValueCurrencyId": 0,
//     "commodityValueCurrency": "",
//    "requiredEquipment": "",
//    "volume": 0,
//    "volumeWeight": 0,
//    "chargeableWeight": 0,
//    "salesPersonDisplayName": "",
//    "preparedByDislayName": "",
//    "emailTo": "",
//    "emailCc": "",
//    "contactEmail": "",
//    "contactTelephone": "",
//    "internalNotes" : "",
//    "businessLostNotes": "",
//    "salesQuoteCurrencyId": 0,
//    "salesQuoteCurrency": "",
//    "officeId": 0,
//    "salesQuoteStatus": "",
//     "grossWeight":form.value.grossWeight,
//     "companyDisplayName":form.value.customer,
//     "contactDisplayName":form.value.contact,
//     "salesQuoteType": form.value.salesQuoteType,
//     "modeoftransport":"",
//     "direction": "",
//     "termsConditions": "",
//    "pickupAddressId": 0,
//     "deliveryAddressId":0,
//     "pickupAddress": "",
//     "deliveryAddress": "",
//     "followUp1":"2023-01-09T07:48:17.565Z",
//     "followUp1Remarks": "",
//     "followUp2":"2023-01-09T07:48:17.565Z",
//     "followUp2Remarks": "",
//     "companyAddressId": 0,
//     "companyAddress": "",
  
//     }
//     console.log('this.salesObj');
//     console.log(this.salesObj);
//     console.log(JSON.stringify(this.salesObj));

//     //  console.log(myobj);

//     this.httpclient.post('http://localhost:5109/api/SalesQuoteNew', JSON.stringify(this.salesObj), this.headers).subscribe(res => {
//       console.log('Success');
//       console.log(res);
//       this.resetForm(form);
//       this.getDataTableRows();

//     }, err =>{
//       console.log('Error');
//       console.log(err);

//     });

//   }
 
  
//     onSubmitService(form:FormGroup)  {


//         this.salesObj=this.editsalesForm.value;

//         console.log('this.salesObj');
//         console.log( this.salesObj);

//         console.log("this.custObj.salesQuoteId");
//         console.log(this.salesObj.salesQuoteId);

//         if(this.salesObj.salesQuoteId==0){
//           console.log("INSERT");
//           this.addSales(this.editsalesForm);
//         }
//         else{
//           console.log("UPDATE");
//         this.updateSales(this.editsalesForm)


//         }
//         this.modalService.dismissAll();

    
//    }
   

//    getLocationAirType() {
//     this.httpclient.get(`http://localhost:5109/api/LocationMaster/getAirList`).subscribe((response: any) => {
//       console.log('get location type ');
//       this.LocationType2 = response;

//       console.log(this.LocationType2);

//     });

//   }

//   getLocationOceanType() {
//     this.httpclient.get(`http://localhost:5109/api/LocationMaster/getOceanList`).subscribe((response: any) => {
//       console.log('get location type1 ');
//       this.LocationType1 = response;

//       console.log(this.LocationType1);

//     });

//   }

// updateSales(form:FormGroup){

//   if(form.value.salesQuoteId!=null){
//     this.selectElementText=form.value.salesQuoteId
//     console.log('this.selectElementText');
//     console.log(this.selectElementText);
//   }


//   this.salesObj =
//   {
//       "salesQuoteId": Number(this.selectElementText),
//       "salesQuoteNumber":form.value.salesQuoteNumber,
//      "salesPersonId":0,
//      "companyId": 0,
//      "contactId":0,
//      "preparedBy": 0,
//      "salesQuoteDate":"2023-01-17T07:48:17.565Z",
//      "enqReceivedDate":form.value.enquiryReceivedDate,
//      "expiryDate": "2023-01-09T07:48:17.565Z",
//      "typeOfMoveId":0,
//      "incoTermId": 0,
//      "oldSalesQuoteId": 0,
//      "revisionId":0,
//      "fileId": 0,
//      "isDraft": false,
//      "isApproved": false,
//      "approvedDate": "2023-01-09T07:48:17.565Z",
//      "isRejected": false,
//      "rejectedDate":"2023-01-09T07:48:17.565Z",
//      "createdBy":0,
//      "dateCreated":"2023-01-09T07:48:17.565Z",  
//      "modifiedBy": 0,
//      "dateModified":"2023-01-09T07:48:17.565Z",
//      "deletedBy": 0,
//      "dateDeleted": "2023-01-09T07:48:17.565Z",
//      "isDeleted": false,
//      "isContract": false,
//      "contractNumber": "",
//      "showTotal": true,
//      "showTax": false,
//      "showCarrier": true,
//     "isHazardous": false,
//      "commodity": "",
//      "commodityValue": 0,
//      "commodityValueCurrencyId": 0,
//      "commodityValueCurrency": "",
//     "requiredEquipment": "",
//     "volume": 0,
//     "volumeWeight": 0,
//     "chargeableWeight": 0,
//     "salesPersonDisplayName": "",
//     "preparedByDislayName": "",
//     "emailTo": "",
//     "emailCc": "",
//     "contactEmail": "",
//     "contactTelephone": "",
//     "internalNotes" : "",
//     "businessLostNotes": "",
//     "salesQuoteCurrencyId": 0,
//     "salesQuoteCurrency": "",
//     "officeId": 0,
//     "salesQuoteStatus": "",
//      "grossWeight":form.value.grossWeight,
//      "companyDisplayName":form.value.customer,
//      "contactDisplayName":form.value.contact,
//      "salesQuoteType": form.value.salesQuoteType,
//      "modeoftransport":"",
//      "direction": "",
//      "termsConditions": "",
//     "pickupAddressId": 0,
//      "deliveryAddressId":0,
//      "pickupAddress": "",
//      "deliveryAddress": "",
//      "followUp1":"2023-01-09T07:48:17.565Z",
//      "followUp1Remarks": "",
//      "followUp2":"2023-01-09T07:48:17.565Z",
//      "followUp2Remarks": "",
//      "companyAddressId": 0,
//      "companyAddress": "",

//   }


//   console.log('this.salesObj');

//   console.log(JSON.stringify(this.salesObj));


//   this.httpclient.put(`http://localhost:5109/api/SalesQuoteNew/${this.salesObj.salesQuoteId}`, JSON.stringify(this.salesObj), this.headers).subscribe(res => {
//     console.log(' Update Success');
//     this.resetForm(form);
//     this.getDataTableRows();
//     console.log(res);
//   }, err =>{
//     console.log('Error');
//     console.log(err);

//   });

// }

  }









