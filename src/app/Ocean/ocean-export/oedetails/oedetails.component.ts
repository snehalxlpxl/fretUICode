import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { CoreTranslationService } from '@core/services/translation.service';
import { id } from '@swimlane/ngx-datatable';
import { OceanExport } from './OceanExport';
import Swal from 'sweetalert2';
import { Opportunity } from './Opportunity';
import { CostSheet } from './cost-sheet/CostSheet';
import { AppConfigService } from 'app/services/app-config.service';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts"; 

@Component({
  selector: 'app-oedetails',
  templateUrl: './oedetails.component.html',
  styleUrls: ['./oedetails.component.scss']
})
export class OedetailsComponent implements OnInit {
  @Input() hero;

  CostSheetObj: CostSheet = new CostSheet();
  
  costSheetId:any;
  isComponentVisible=false;
  isalert=false;
  isComponent=false;

  rowData:any;
  GetCustomer:any;
  cust:any;
  GetSalesPerson: any;
  sales:any;
  GetJobType:any;
  job:any;
  // selectedmodeOfTransport:number;
  // selectedDirections:number;
  // selectedCargoTypes:number;
  GetTypeOfMove:any;
  move:any;
  GetPOL:any;
  pol:any;
  GetPOD:any;
  pod:any;
  GetIncoTerm:any;
  incooterm:any;
  // selectedFreightStatus:number;
  GetAddress:any;
  shipper:any;
  consignee:any;
 NotifyParty1:any;
  NotifyParty2:any;
  Forwarder:any;
  OriginAgent:any;
  DestinationAgent:any;
  formatdate = 'dd/MM/yyyy'; 
  myDate=new Date();
  today:Date;
  CompanyForm:FormGroup;
  OEObj: OceanExport=new OceanExport();
  router: any;
  insertedrecord: any=[];
  cargoId:any;
  mode:any;
  opportunityId: any;
  public chargesForm: FormGroup;
  chargeslist: any = [];
  datachargpatch = [];
OObj: Opportunity=new Opportunity();
data: any;
public rows: any = [];

public kitchenSinkRows: any;
private tempData = [];
isSavebtn: boolean=false;
companydataurlid: any;
viewMode: string ;
activeId:any = 1;
form:any;
cardBodyHeight: string = '300px'; // Initial height

 isDropdownOpen: boolean = false;


  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  OEdataurlid: string;
  updateData: any;
  chargesflag: boolean;
  transportDirection: any;
  modeOfTransport: any;
  GetCurr: any;
  currCode: any;
  subscription: Subscription;
  totalBuyingAmt: any;
  totalBuyingAmtTax: any;
  totalSellingAmt: any;
  totalSellyingAmtTax: any;
  profitIncludingTax: number;
  profitExcludingTax: number;
  GetTaxPercentage: any;
  GetCurrency: any;
  currencyCode: any;
  GetPayTo: any;
  GetInvoiceTo: any;
  GetTax: any;
  isValidFormSubmitted: boolean;
  costsheet: Object;
  costSheetNo: string;
  GetApplyPer: any;

  constructor(private httpclient : HttpClient, private fb: FormBuilder, private route:ActivatedRoute,  public datepipe:DatePipe,private _coreTranslationService: CoreTranslationService,private apiConfig:AppConfigService,private toastr: ToastrService,private cdr: ChangeDetectorRef) { 
    
    this.CompanyForm = this.fb.group({
        cargoId:0,
        customerId:[0,[Validators.required]],
        cust:[''],
        opportunityOwnerId:[0,[Validators.required]],
        sales:[''],
        amount:[0,[Validators.required]],
        //  jobNo:new FormControl({value: '', disabled: true},),
        jobNo:[''],
        jobType:[0,[Validators.required]],
        job:[''],
        modeOfTransport:[''],
        mode:[''],
        transportDirection:[''],
        isConsolidation:[0,[Validators.required]],
        typeOfMoveId:0,
        pickupAddressId:0,
        deliveryAddressId:0,
        move:[''],
        etd:['',[Validators.required]],
        eta:['',[Validators.required]],
        polid:0,
        pol:[''],
        podid:0,
        pod:[''],
        incoTermId:[0,[Validators.required]],
        incooterm:[''],
        freightStatus:[''],
        placeOfReceipt:[''],
        customerReference:[''],
        shipperId:0,
        shipperAddressId:[0,[Validators.required]],
        shipper:[''],
        consigneeId:0,
        consigneeAddressId:[0,[Validators.required]],
        consignee:[''],
        notifyParty1Id:0,
        notifyParty1AddressId:0,
        NotifyParty1:[''],
        notifyParty2Id:0,
        NotifyParty2:[''],
        notifyParty2AddressId:0,
        forwardedAddressId:0,
        forwarderId:0,
        Forwarder:[''],
        originAgentId:0,
        originAgentAddressId:[0,[Validators.required]],
        OriginAgent:[''],
        destinationAgentAddressId:[0,[Validators.required]],
        DestinationAgent:[''],
        destinationAgentId:0,
        notes:[''],
        mblTerm:[''],
        hblTerm:[''],
        accountName:[''],
        opportunityName:[''],
        opportunityId:[''],
        modifiedBy:[''],
        dateModified:[''],
        deletedBy:[''],
        dateDeleted:[''],
        isDeleted:[''],
        accountId:[''],
        createdBy:[''],
        dateCreated:[''],
        cargoNumber:[''],
        masterNo:[''],
        houseNo:[''],
        cargoApprovalStatus:[''],
        cargoSopapprovalStatus:[''],
        officeId:0,
        paymentTerms:[''],
        invoicingParty:[''],
        isHblnoautogenerate:[''],
        salesQuoteId:0,
        isLocked:[],
        lockedBy:[],
        lockedDate:[],
        hblStatus:[],
        mblStatus:[],
        freeDays:[],
        por:[],
        isGstJob:[],
    })
    this.chargesForm = this.fb.group({
      Rows: this.fb.array([], [Validators.required])
    });
  }

  ngOnInit(): void {
    this.hero;
    console.log('!!!!!!!!!',this.hero);
    this.getCustomer();
    this.getSalesPerson();
    this.getJobType();
    this.gettypeOfMove();
    this.getpol();
    this.getpod();
    this.getIncoTerm();
    this.getAddress();
    // this.getAddress(id);
    

    this.today =new Date();
    console.log(new Date().toISOString());

    this.viewMode='container'

    this.OEdataurlid = this.route.snapshot.paramMap.get('id');
    console.log("OEdataurlid",this.OEdataurlid )
    
      if(this.OEdataurlid)
      {
     this.getOEDataById(this.OEdataurlid);
       console.log("myid",this.OEdataurlid)

      }
      if(this.OEdataurlid || this.cargoId){
        this.isSavebtn=true;
      }
      else{
        this.isSavebtn=false;
      }


    this.getDataTableRows(this.companydataurlid);
    this.getTableRows(this.companydataurlid);
    this.chargesForm =this.fb.group({
      Rows: this.fb.array([]),
  })

  
  }

  get formArr() {
    return this.chargesForm.get('Rows') as FormArray;
  }
  get getFormControls() {
    const control = this.chargesForm.get('Rows') as FormArray;
    return control;
  }
  createFormGroup(): FormGroup {
    return this.fb.group({
      // firstname: [''],
      // lastname: ['',],
      // city:[''],
      // state: [''],
      chargeIdSell: [0],
      cargoId: [''],
      costSheetId: [0],
      chargeId: [0],
      status: [''],
      payingPartyId: 0,
      invoiceTo: [''],
      currencyName: [''],
      applyPer: [''],
      chargeItemId: '0',
      chargeDescription: [''],
      quantity: [''],
      totalAmount: [''],
      rate: [''],
      currId: [''],
      currencyId: [''],
      taxPercent: [''],
      currencyCode: [''],
      currCode: [''],
      taxAmount: [''],
      sellingrate: [''],
      selltotalAmount: [''],
      selltaxAmount: [''],
      selltaxPercent: [''],
      incomeExpense: ['EXPENSE'],
      sellincomeExpense: ['INCOME'],
      costSheetType: ['Freight'],
      costSheetStatus: [''],
      createdBy: [''],
      dateCreated: [''],
      modifiedBy: [''],
      dateModified: [''],
      verifiedBy: [''],
      buyExRateUsd: [''],
      buyExRateEur: [''],
      buyExRateTl: [''],
      buyExRateInr: [''],
      sellExRateUsd: [''],
      sellExRateEur: [''],
      sellExRateTl: [''],
      sellExRateInr: [''],
      exchangeRateDate: [''],
      costCategoryId: [''],
    });
  }
  addRow() {

    // const control =  this.chargesForm.get('Rows') as FormArray;
    // control.push(this.createFormGroup());
    this.formArr.push(this.createFormGroup());

  }


  getOEDataById(id:any){
    console.log("New ID", id);
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/Cargo/${id}`,this.headers).subscribe((res: any) => {
      this.rowData=res;
      console.log("row**************",this.rowData)
     this.rows = this.rowData;
      this.tempData = this.rows;
      this.kitchenSinkRows = this.rows;
      
    this.transportDirection=this.rowData.transportDirection;
    this.modeOfTransport=this.rowData.modeOfTransport;

  this.getChargeItem(this.modeOfTransport, this.transportDirection);
        console.log('rowData.cargoId',this.rowData.cargoId);
        console.log('rowData.opportunityId-----------',this.rowData.opportunityId);
        console.log('rowData.accountName-----------',this.rowData.accountName);
        console.log(this.rowData.modeOfTransport);
        this.shipper=this.rowData.shipper;
        console.log(this.rowData.shipper)
        console.log(this.shipper)

        // console.log(this.CompanyForm.value.shipper)

        this.CompanyForm.patchValue({

          opportunityId:this.rowData.opportunityId,
          accountId:this.rowData.accountId,
          accountName:this.rowData.accountName,
          isDeleted:this.rowData.isDeleted,
          createdBy:this.rowData.createdBy,
          dateCreated:this.rowData.dateCreated,
          opportunityOwnerId:this.rowData.opportunityOwnerId,
          amount:this.rowData.amount,
          opportunityName:this.rowData.opportunityName,
          cargoId:this.rowData.cargoId,
          cargoNumber:this.rowData.cargoNumber,
          jobNo:this.rowData.jobNo,
          job:this.rows.job,
          masterNo:this.rowData.masterNo, 
          houseNo:this.rowData.houseNo,
          modeOfTransport:this.rowData.modeOfTransport,
          transportDirection:this.rowData.transportDirection, 
          isConsolidation:this.rowData.isConsolidation,
          incoTermId:this.rowData.incoTermId,
          typeOfMoveId:this.rowData.typeOfMoveId,
          pickupAddressId:this.rowData.pickupAddressId,
          deliveryAddressId:this.rowData.deliveryAddressId,
          customerReference:this.rowData.customerReference, 
          polid:this.rowData.polid,
          pol:this.rowData.pol,
          podid:this.rowData.podid,
          pod:this.rowData.pod,
          // etd:this.rowData.etd,
          etd:this.datepipe.transform(this.rowData.etd,'yyyy-MM-dd'),
          // eta:this.rowData.eta,
          eta:this.datepipe.transform(this.rowData.eta,'yyyy-MM-dd'),
          shipperId:this.rowData.shipperId,
          shipperAddressId:this.rowData.shipperAddressId,
          shipper:this.rowData.shipper,
          consigneeId:this.rowData.consigneeId,
          consigneeAddressId:this.rowData.consigneeAddressId,
           consignee:this.rowData.consignee, 
          notifyParty1Id:this.rowData.notifyParty1Id,
          notifyParty1AddressId:this.rowData.notifyParty1AddressId,
          // notifyParty1:this.rowData.NotifyParty1, 
          notifyParty2Id:this.rowData.notifyParty2Id,
          notifyParty2AddressId:this.rowData.notifyParty2AddressId,
          forwarderId:this.rowData.forwarderId,
          // forwarder:this.rowData.forwarder,
          forwardedAddressId:this.rowData.forwardedAddressId,
          originAgentId:this.rowData.originAgentId,
          // originAgent:this.rowData.originAgent,
          originAgentAddressId:this.rowData.originAgentAddressId,
          destinationAgentId:this.rowData.destinationAgentId,
          destinationAgentAddressId:this.rowData.destinationAgentAddressId,
          // destinationAgent:this.rowData.destinationAgent,
          notes:this.rowData.notes, 
          modifiedBy:this.rowData.modifiedBy,
          dateModified:this.rowData.dateModified, 
          deletedBy:this.rowData.deletedBy,
          dateDeleted:this.rowData.dateDeleted, 
          customerId:this.rowData.customerId,
          cargoApprovalStatus:this.rowData.cargoApprovalStatus, 
          cargoSopapprovalStatus:this.rowData.cargoSopapprovalStatus, 
          officeId:this.rowData.officeId,
          freightStatus:this.rowData.freightStatus, 
          paymentTerms:this.rowData.paymentTerms, 
          invoicingParty:this.rowData.invoicingParty, 
          jobType:this.rowData.jobType,
          isHblnoautogenerate:this.rowData.isHblnoautogenerate, 
          salesQuoteId:this.rowData.salesQuoteId,
          isLocked:this.rowData.isLocked, 
          lockedBy:this.rowData.lockedBy,
          lockedDate:this.rowData.lockedDate, 
          hblTerm:this.rowData.hblTerm, 
          mblTerm:this.rowData.mblTerm, 
          hblStatus:this.rowData.hblStatus, 
          mblStatus:this.rowData.mblStatus, 
          freeDays:this.rowData.freeDays, 
          por:this.rowData.por, 
          isGstJob:this.rowData.isGstJob, 

        });
        console.log('this.CompanyForm.value PATCH VALUE',this.CompanyForm.value);
      });
}

  getCustomer(){
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/Cmp/Customer`).subscribe((response: any) => {
        console.log("Customer",response);
        this.GetCustomer=response;
      })
  }

  onCustomer(event,form){
    console.log("companyName=",event.companyName);
     this.cust=event.companyName;
     console.log(this.cust);
    let id=event.companyId;
    console.log(id);
    // this.getAddress();
    // this.getAddress(id)
    form.controls['cust'].setValue(this.cust);
  }

  getSalesPerson(){ 
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/UserMaster`).subscribe((response: any) => {
        console.log("SalesPerson",response);
        this.GetSalesPerson=response;
    })
  }
  onSalesPerson(event,form){
    console.log("userDisplayName=",event.userDisplayName);
    this.sales=event.userDisplayName;
    form.controls['sales'].setValue(this.sales);
  }

  getJobType(){ 
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/JobTypeMaster`).subscribe((response: any) => {
        console.log("Job Type",response);
        this.GetJobType=response;
    })
  }
  onjobType(event,form){
    console.log("jobtypeName=",event.jobtypeName);
    this.job=event.jobtypeName;
    form.controls['job'].setValue(this.job);

  }

  items=[
    {id:1, Name:"Ocean"},
    {id:2, Name:"Air"},
  ]
  OnmodeOfTransport(event,form){
    console.log(event);
    console.log("modeOfTransport=",event);
     this.mode=event;
     form.controls['mode'].setValue(this.mode);

  }

  directions=[
    {id:1, Name:"Export"},
    {id:2, Name:"Import"},
  ]

  cargoType=[
    {id:0 , Name:"Streight"},
    {id:1, Name:"Consolidate"},
  ]

  gettypeOfMove(){ 
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/MoveType`).subscribe((response: any) => {
        console.log("Type Of Move",response);
        this.GetTypeOfMove=response;
    })
  }
  ontypeOfMove(event,form){
    console.log("typeOfMove=",event.typeOfMove);
    this.move=event.typeOfMove;
    form.controls['move'].setValue(this.move);

  }
  getpol(){ 
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/LocationMaster`).subscribe((response: any) => {
        console.log("POL",response);
        this.GetPOL=response;
    })
  }
  onpol(event,form){
    console.log("POL=",event.locationShortName);
    this.pol=event.locationShortName;
    form.controls['pol'].setValue(this.pol);
  }
  getpod(){ 
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/LocationMaster`).subscribe((response: any) => {
        console.log("POD",response);
        this.GetPOD=response;
        
    })
  }
  onpod(event,form){
    console.log("POD=",event.locationShortName);
    this.pod=event.locationShortName;
    form.controls['pod'].setValue(this.pod);
  }



  getIncoTerm(){ 
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/IncoTermMaster`).subscribe((response: any) => {
        console.log("IncoTerm",response);
        this.GetIncoTerm=response;
    })
  }
  onIncoTerm(event,form){
    console.log("IncoTerm=",event.incotermName);
    this.incooterm=event.incotermName;
    form.controls['incooterm'].setValue(this.incooterm);
  }

  freightStatus=[
    {id:0, Name:"Prepaid"},
    {id:1, Name:"Collect"},
  ]


  //  getAddress(id:any){ 
  //   this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/CompanyAddress/GetAddressByCmpID?id=${id}`).subscribe((response: any) => {
  //       console.log("Address",response);
  //       this.GetAddress=response;
  //   })
  // }

  onAddress(event,form){
    
    this.shipper=event.companyName;
    console.log("shipper=",event.companyName);

   form.controls['shipper'].setValue(this.shipper);
  //   console.log("shipper=",event.companyName);

  }
  onConsignee(event,form){
    
    console.log("Consignee=",event.companyName);
    this.consignee=event.companyName;
    form.controls['consignee'].setValue(this.consignee);

  }

  onNotifyParty1(event,form){


    console.log("NotifyParty1=",event.companyName);
    this.NotifyParty1=event.companyName;
    form.controls['NotifyParty1'].setValue(this.NotifyParty1);
  }
  onNotifyParty2(event,form){
    console.log("NotifyParty2=",event.addressTypeNick);
    this.NotifyParty2=event.addressTypeNick;
    form.controls['NotifyParty2'].setValue(this.NotifyParty2);

  }
  onForwarder(event,form){
    
    console.log("Forwarder=",event.addressTypeNick);
    this.Forwarder=event.addressTypeNick;
    form.controls['Forwarder'].setValue(this.Forwarder);

  }
  onOriginAgent(event,form){
    // console.log("OriginAgent=",event.addressTypeNick);
    // this.address=event.addressTypeNick;
    console.log("OriginAgent=",event.addressTypeNick);
    this.OriginAgent=event.addressTypeNick;
    form.controls['OriginAgent'].setValue(this.OriginAgent);

  }
  onDestinationAgent(event,form){
    // console.log("DestinationAgent=",event.addressTypeNick);
    // this.address=event.addressTypeNick;
    console.log("DestinationAgent=",event.addressTypeNick);
    this.DestinationAgent=event.addressTypeNick;
    form.controls['DestinationAgent'].setValue(this.DestinationAgent);

  }


  getAddress(){
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/CompanyAddress/CompanyAddress`).subscribe((response: any) => {
        console.log("Address",response);
        this.GetAddress=response;
    })
  }

addCompany(form: FormGroup) {
   this.OObj =
   {
  
     "opportunityId": 0,
     "accountId":form.value.customerId,
     "accountName":this.cust,
     "isDeleted": true,
      "createdBy":0,
     "dateCreated":new Date().toISOString(),
     "opportunityOwnerId":form.value.opportunityOwnerId,
     "amount":form.value.amount,
    "opportunityName": form.value.jobNo,
    
   }
   

      console.log(this.OObj)
    
      this.httpclient.post(`${this.apiConfig.apiBaseUrl}/api/Opportunity/Post`, JSON.stringify(this.OObj), this.headers).subscribe(res => {
      console.log('Success Opportunity');
      console.log(res);
      // let data:any=res
      this.data=res;
       console.log(this.data.opportunityId);
      this.insertedrecord.push(this.data)
      console.log("inserted Record:",this.insertedrecord);
      this.opportunityId=this.insertedrecord[0].opportunityId;
       JSON.stringify(this.opportunityId);

       Swal.fire({
        title: 'Opportunity'
      })

      if(this.data.opportunityId>0){
        console.log(this.mode);
      
        this.OEObj =
          {
            "cargoId": 0,
            "cargoNumber": form.value.jobNo,
            "jobNo": form.value.jobNo,
            "masterNo": "",
            "houseNo": "",
            "modeOfTransport": this.mode,
            "transportDirection": form.value.transportDirection,
            "isConsolidation": Boolean(form.value.isConsolidation),
            "incoTermId": form.value.incoTermId,
            "typeOfMoveId": form.value.typeOfMoveId,
            "pickupAddressId": 0,
            "deliveryAddressId": 0,
            "opportunityId":this.data.opportunityId,
            "customerReference": form.value.customerReference,
            "polid": form.value.polid,
            "pol":this.pol,
            "podid": form.value.podid,
            "pod": this.pod,
            "etd": form.value.etd,
            "eta": form.value.eta,
            "shipperId": form.value.customerId,
            "shipperAddressId": form.value.shipperAddressId,
           //  "shipper": form.value.shipper,
           "shipper": this.shipper,
            "consigneeId":form.value.customerId,
            "consigneeAddressId": form.value.consigneeAddressId,
           //  "consignee": form.value.consignee,
            "consignee": this.consignee,
            "notifyParty1Id":form.value.customerId,
            "notifyParty1AddressId": form.value.notifyParty1AddressId,
           //  "notifyParty1": form.value.notifyParty1,
           "notifyParty1": this.NotifyParty1,
            "notifyParty2Id": 0,
            "notifyParty2AddressId": form.value.notifyParty2AddressId,
            "forwarderId": 0,
            "forwardedAddressId": form.value.forwardedAddressId,
            "originAgentId": 0,
            "originAgentAddressId": form.value.originAgentAddressId,
            "destinationAgentId": 0,
            "destinationAgentAddressId": form.value.destinationAgentAddressId,
            "notes": "string",
            "createdBy": 0,
            "dateCreated":new Date().toISOString(),
            "modifiedBy": 0,
            "dateModified": new Date().toISOString(),
            "deletedBy": 0,
            "dateDeleted": "2023-05-08T06:11:36.621Z",
            "isDeleted": true,
            "customerId": form.value.customerId,
            "cargoApprovalStatus": "string",
            "cargoSopapprovalStatus": "string",
            "officeId": 0,
            "freightStatus": form.value.freightStatus,
            "paymentTerms": "string",
            "invoicingParty": "string",
            "jobType": form.value.jobType,
            "isHblnoautogenerate": true,
            "salesQuoteId": 0,
            "isLocked": true,
            "lockedBy": 0,
            "lockedDate": "2023-05-08T06:11:36.621Z",
            "hblTerm":form.value.hblTerm,
            "mblTerm": form.value.mblTerm,
            "hblStatus": "string",
            "mblStatus": "string",
            "freeDays": "string",
            "por": "string",
            "isGstJob": true,
           
       
          }
       
      
          this.httpclient.post(`${this.apiConfig.apiBaseUrl}/api/Cargo/Post`, JSON.stringify(this.OEObj), this.headers).subscribe(res => {
            console.log('Success');
            console.log(res);
           
            let data:any=res
            this.insertedrecord.push(data)
            console.log("inserted Record:",this.insertedrecord);
            this.cargoId=this.insertedrecord[0].cargoId;
             JSON.stringify(this.cargoId);
            // alert("companyId="+this.companyId);
      
            // this.isSavebtn=true;
            //  console.log(this.isSavebtn);
             Swal.fire({
              title: 'Ocean Export Details Added'
            })
      
          }, err => {
            console.log('Error');
            console.log(err);
            Swal.fire({
              title: 'Something went wrong'
            })
          });
      }
      
      }, err => {
        console.log('Error');
        console.log(err);
        Swal.fire({
          title: 'Something went wrong'
        })
      });

}


UpdateCompany(form: FormGroup){
  console.log("form.value",form.value);

  this.OObj =
  {
 
    "opportunityId": form.value.opportunityId,
    "accountId":form.value.customerId,
    "accountName":form.value.accountName,
    "isDeleted": form.value.isDeleted,
     "createdBy":form.value.createdBy,
    "dateCreated":form.value.dateCreated,
    "opportunityOwnerId":form.value.opportunityOwnerId,
    "amount":form.value.amount,
   "opportunityName": form.value.jobNo,
   
  }
  

     console.log(JSON.stringify(this.OObj));

     this.httpclient.put(`${this.apiConfig.apiBaseUrl}/api/Opportunity/${this.OObj.opportunityId}`, JSON.stringify(this.OObj), this.headers).subscribe(res => {
      console.log(' Update Success');
      console.log(res);

            
      let updateData:any=res
      this.insertedrecord.push(updateData)
      console.log("Updated Record:",this.insertedrecord);
      this.opportunityId=this.insertedrecord[0].opportunityId;
       JSON.stringify(this.opportunityId);
      // this.isSavebtn=true;
      // console.log(this.isSavebtn);
      Swal.fire({
        title: 'Opportunity UPDATE'
      })
    }, err => {
      console.log('Error');
      console.log(err);
      Swal.fire({
        title: 'Something went wrong'
      })
    });


    // if(this.updateData.opportunityId>0){
      console.log(form.value.modeOfTransport);
      console.log(this.shipper);
      console.log(form.value)
    
      console.log(form.value.shipper)
    
      this.OEObj =
        {
          "cargoId": form.value.cargoId,
          "cargoNumber": form.value.jobNo,
          "jobNo": form.value.jobNo,
          "masterNo": form.value.masterNo,
          "houseNo": form.value.houseNo,
          "modeOfTransport": form.value.modeOfTransport,
          "transportDirection": form.value.transportDirection,
          "isConsolidation": form.value.isConsolidation,
          "incoTermId": form.value.incoTermId,
          "typeOfMoveId": form.value.typeOfMoveId,
          "pickupAddressId": 0,
          "deliveryAddressId": 0,
          // "opportunityId":this.data.opportunityId,
          "opportunityId":form.value.opportunityId,
          "customerReference": form.value.customerReference,
          "polid": form.value.polid,
           "pol":form.value.pol,
          // "pol":this.pol,
          "podid": form.value.podid,
          "pod": form.value.pod,
          // "pod":this.pod,
          "etd":form.value.etd,
          "eta": form.value.eta,
          "shipperId": form.value.customerId,
          "shipperAddressId": form.value.shipperAddressId,
           "shipper": form.value.shipper,
          //  "shipper": this.shipper,
          "consigneeId":form.value.customerId,
          "consigneeAddressId": form.value.consigneeAddressId,
           "consignee": form.value.consignee,
          // "consignee": this.consignee,
          "notifyParty1Id":form.value.customerId,
          "notifyParty1AddressId": form.value.notifyParty1AddressId,
           "notifyParty1": form.value.NotifyParty1,
          // "notifyParty1": this.NotifyParty1,
          "notifyParty2Id": 0,
          "notifyParty2AddressId": form.value.notifyParty2AddressId,
          "forwarderId": 0,
          "forwardedAddressId": form.value.forwardedAddressId,
          "originAgentId": 0,
          "originAgentAddressId": form.value.originAgentAddressId,
          "destinationAgentId": 0,
          "destinationAgentAddressId": form.value.destinationAgentAddressId,
          "notes": "string",
          "createdBy": 0,
          "dateCreated":form.value.dateCreated,
          "modifiedBy": 0,
          "dateModified": new Date().toISOString(),
          "deletedBy": 0,
          "dateDeleted": "2023-05-08T06:11:36.621Z",
          "isDeleted": false,
          "customerId": form.value.customerId,
          "cargoApprovalStatus": "string",
          "cargoSopapprovalStatus": "string",
          "officeId": 0,
          "freightStatus": form.value.freightStatus,
          "paymentTerms": "string",
          "invoicingParty": "string",
          "jobType": form.value.jobType,
          "isHblnoautogenerate": true,
          "salesQuoteId": 0,
          "isLocked": true,
          "lockedBy": 0,
          "lockedDate": "2023-05-08T06:11:36.621Z",
          "hblTerm":form.value.hblTerm,
          "mblTerm": form.value.mblTerm,
          "hblStatus": "string",
          "mblStatus": "string",
          "freeDays": "string",
          "por": "string",
          "isGstJob": true,
         
     
        }

    console.log(JSON.stringify(this.OEObj));

    this.httpclient.put(`${this.apiConfig.apiBaseUrl}/api/Cargo/${this.OEObj.cargoId}`, JSON.stringify(this.OEObj), this.headers).subscribe(res => {
     console.log(' Update Success');
     console.log(res);
     
     // this.isSavebtn=true;
     // console.log(this.isSavebtn);
     Swal.fire({
       title: 'OceanExport UPDATE'
     })
   }, err => {
     console.log('Error');
     console.log(err);
     Swal.fire({
       title: 'Something went wrong'
     })
   });
  // }
   
}


onSubmitService(form: FormGroup) {
  
  // this.success();
  console.log( "CompanyForm.value***************",this.CompanyForm.value);
  console.log( "opportunityId***************",this.CompanyForm.value.opportunityId);
  console.log( "opportunityName***************",this.CompanyForm.value.opportunityName);
  console.log( "accountName***************",this.CompanyForm.value.accountName);
  console.log( "this.OObj.opportunityId***************",this.OObj.opportunityId);
  console.log(form.value.shipper)
  console.log(this.shipper)

  if(this.CompanyForm.value.opportunityId==0) 
  {
    // console.log('!!!!!!!!!',this.hero);
    console.log("INSERT");
    this.addCompany(this.CompanyForm);
  this.success();
  console.log(this.OObj.opportunityId);

  }

  else
  
  {
    console.log("UPDATE");
   this.UpdateCompany(this.CompanyForm)
    this.success();

    console.log(this.OObj.opportunityId);
    console.log(this.OEObj.cargoId);
  }

}

success(){
  Swal.fire(
    'Save',
    'Saved Successfully',
    'success'
  )
}
clear(){
this.CompanyForm;
}
resetForm(form: FormGroup) {

  form.reset();

}

message:any;
clickedItemValue:any;
costsheetnumber:any;
costsheetName:any;
showComponent(event: Event, form?: FormGroup): void {
  //get cost sheet id
  const cargoId=this.OEdataurlid || this.cargoId;
 

  // Get the selected item text
  if (event.target instanceof HTMLAnchorElement) {
    this.costsheetName = event.target.textContent?.trim();
  
  
  this.checkCostSheet(this.OEdataurlid || this.cargoId||cargoId,this.costsheetName)
    .then(costSheetId => {
      console.log("Cost sheet ID:", costSheetId);
      this.costsheetnumber = costSheetId;

      // if (this.costsheetnumber) {
        console.log("costsheet number", this.costsheetnumber);
        console.log("bool", this.isComponentVisible);
        this.isComponentVisible = true;
        this.cardBodyHeight = '100%';
        // this.isalert = true;
        this.isComponent = false;
        this.isDropdownOpen = false;
        console.log("bool", this.isComponentVisible);
       
        this.getChargesList(cargoId,this.costsheetnumber)

      // } else {
        // console.log("add new cost sheet");

        // const userConfirmed = window.confirm('Are you sure you want to create a Cost Sheet?');
        // if (event.target instanceof HTMLAnchorElement) {
        //   this.clickedItemValue = event.target.textContent?.trim();
        //   console.log("*************** name", this.clickedItemValue);

        //   if (userConfirmed) {
        //     this.isComponentVisible = true;
        //     this.cardBodyHeight = '100%';
        //     this.isalert = true;
        //     this.isComponent = false;
        //     this.isDropdownOpen = false;
        //     this.message = "Cost-Sheet Created Successfully";
        //     console.log("*******cargoId", this.OEdataurlid || this.cargoId);
        //      this.addCostSheet(this.OEdataurlid || this.cargoId, this.clickedItemValue);
        //   } else {
        //     this.isComponentVisible = false;
        //     this.isComponent = false;
        //     this.isDropdownOpen = false;
        //   }
        // }
      // }
    })
    .catch(error => {
      // Swal.fire({
      //   title: 'cost sheet not found'
      // })
      console.log("add new cost sheet");

        const userConfirmed = window.confirm('Are you sure you want to create a Cost Sheet?');
        if (event.target instanceof HTMLAnchorElement) {
          this.clickedItemValue = event.target.textContent?.trim();
          console.log("*************** name", this.clickedItemValue);

          if (userConfirmed) {
            this.isComponentVisible = true;
            this.cardBodyHeight = '100%';
            this.isalert = true;
            this.isComponent = false;
            this.isDropdownOpen = false;
            this.message = "Cost-Sheet Created Successfully";
            console.log("*******cargoId", this.OEdataurlid || this.cargoId);
             this.addCostSheet(this.OEdataurlid || this.cargoId, this.clickedItemValue);
          } else {
            this.isComponentVisible = false;
            this.isComponent = false;
            this.isDropdownOpen = false;
          }
        }
    });
  }
    this.bindChargeMaster(cargoId);
    // this.getCurr();
    this.getTaxPercentage();
    this.getCurrency();
    this.getTax();
    this.getInvoiceTo();
    this.getPayingTo();
    this.totalfunction();
    this.getApplyPer();

}

clearMessageAfterDelay(delay: number): void {
  setTimeout(() => {
    this.message = '';
    this.isalert=false;
  }, delay);
}
costsheetdata:any;
addCostSheet(cargoId,costsheetName)
{

              this.CostSheetObj =    
              {
                costSheetId: 0,
                cargoId: cargoId,
                costSheetType: costsheetName,
                costSheetStatus: "string",
                createdBy: 0,
                dateCreated: new Date().toISOString(),
                modifiedBy: 0,
                dateModified: new Date().toISOString(),
                verifiedBy: "string",
                buyExRateUsd: 0,
                buyExRateEur: 0,
                buyExRateTl: 0,
                buyExRateInr: 0,
                sellExRateUsd: 0,
                sellExRateEur: 0,
                sellExRateTl: 0,
                sellExRateInr: 0,
                exchangeRateDate: new Date().toISOString(),
                costCategoryId: 0
              }
        
              console.log('this.CostSheetObj', this.CostSheetObj);
              
        
              this.httpclient.post(`${this.apiConfig.apiBaseUrl}/api/CostSheet`, JSON.stringify(this.CostSheetObj), this.headers).subscribe(async res => {
                console.log('Success');
                console.log(res);
              this.costsheetdata=res;
              console.log(this.costsheetdata.costSheetId)
              JSON.stringify(this.costsheetdata.costSheetId)
              this.costSheetId=JSON.stringify(this.costsheetdata.costSheetId)
       
             this.toastr.success('CostSheet Added Successfully', `${this.costSheetId}`, { timeOut: 3000 });
              
                if(this.costSheetId){
                  this.getChargesList(this.cargoId || this.companydataurlid,this.costSheetNo||this.costSheetId)
                }
              })
              // console.log("Cost sheetID",this.costSheetId);
}

costSheetsArray: any[];
checkCostSheet(cargoId,costsheetName): Promise<number> 
{
  console.log("cargid=",cargoId)
  console.log("costsheetName=",costsheetName)
      return new Promise<number>((resolve, reject) => {
        this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/CostSheet/${cargoId}/${costsheetName}`)
          .subscribe((response: any) => {
            console.log('get costsheet data');
            this.rowData = response;
            console.log("rowData++++++++", this.rowData);
            // Check if response is an array or a single object
            // Reset this.costSheetsArray
            this.costSheetsArray = [];

            // Check if response is an array or a single object
            if (this.rowData !== null && Array.isArray(this.rowData)) {
              this.costSheetsArray = this.rowData;
            } else if (this.rowData !== null) {
              this.costSheetsArray.push(this.rowData);
            }

            console.log("costSheets length++++++++", this.costSheetsArray.length);



            if (this.costSheetsArray.length > 0) {
              resolve(this.costSheetsArray[0].costSheetId);
            } else {
              reject("Cost sheet not found");
            }
          }, error => {
            console.error("Error fetching cost sheet:", error);
            reject(error);
          });
      });
}
getChargesList(cargoId,costsheetID)
{
      console.log("this.formArr.length"); 
      console.log(this.formArr.length);
      console.log("cargo id",cargoId);
      console.log("costsheetId",costsheetID);

      this.formArr.clear();
      // console.log(this.companydataurlid);
      this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/CargoCharge/GetCargoChargeByCostSheetIDandCargoID?costsheetid=${costsheetID}&cargoId=${cargoId}`).subscribe((response: any) => {
      console.log('get all charges ');
      this.chargeslist=response;
      console.log("chargelist ",this.chargeslist);
    //  alert("chargelist length"+this.chargeslist.length);
     

      if(this.chargeslist.length==0){
       
          this.chargesflag=false;
          console.log("zero charges");
          Swal.fire({
            title: 'No Data found. Please add new charges',
            customClass: {
              title: 'swal-title-font-size' // Define a custom class for the title
            }
          });

      }
      else
      {
            console.log("chargelist length",this.chargeslist.length,this.chargeslist[0].cargoId)

            for(let i=0,j=0;j<=this.chargeslist.length/2;j++,i+=2){

                        console.log(i,"i");
                        console.log(j,"j");

                        this.datachargpatch[j] = 
                        {
                          cargoId:this.chargeslist[i].cargoId ||this.companydataurlid||this.hero||this.cargoId,
                          costSheetId:this.chargeslist[i].costSheetId || cargoId ||this.costSheetId ||this.chargeslist[i].costSheetNo,
                          chargeId:this.chargeslist[i].chargeId,
                          chargeItemId: this.chargeslist[i].chargeItemId,
                          chargeDescription: this.chargeslist[i].chargeDescription,
                          quantity: this.chargeslist[i].quantity,
                          applyPer: this.chargeslist[i].applyPer,
                          rate: this.chargeslist[i].rate,
                          currId: this.chargeslist[i].currencyId,
                          currCode: this.chargeslist[i].currencyCode,
                          totalAmount: this.chargeslist[i].totalAmount,
                          taxPercent: this.chargeslist[i].taxPercent,
                          taxAmount:this.chargeslist[i].taxAmount,
                          incomeExpense:this.chargeslist[i].incomeExpense,
                          chargeIdSell:this.chargeslist[i+1].chargeId,
                          sellingrate:this.chargeslist[i+1].rate,
                          currencyId:this.chargeslist[i+1].currencyId,
                          currencyCode:this.chargeslist[i+1].currencyCode,
                          selltotalAmount:this.chargeslist[i+1].totalAmount,
                          selltaxPercent:this.chargeslist[i+1].taxPercent,
                          selltaxAmount:this.chargeslist[i+1].taxAmount,
                          sellincomeExpense:this.chargeslist[i+1].incomeExpense,
                        
                          payingPartyId:this.chargeslist[i+1].payingPartyId,
                          invoiceTo:this.chargeslist[i+1].invoiceTo,
                        }
                
                      console.log("patch data",this.datachargpatch)
           
                      this.formArr.push(
                        this.fb.group({
                        cargoId:this.companydataurlid || this.cargoId ||this.chargeslist[i].cargoId ||this.hero,
                        costSheetId:this.costSheetId || cargoId || this.chargeslist[i].costSheetId || this.chargeslist[i].costSheetNo,
                        chargeId:this.chargeslist[i].chargeId,
                        chargeItemId: this.chargeslist[i].chargeItemId,
                        chargeDescription:this.chargeslist[i].chargeDescription,
                        quantity: this.chargeslist[i].quantity,
                        applyPer: this.chargeslist[i].applyPer,
                        rate: this.chargeslist[i].rate,
                        currId: this.chargeslist[i].currencyId,
                        currCode: this.chargeslist[i].currencyCode,
                        totalAmount: this.chargeslist[i].totalAmount,
                        taxPercent: this.chargeslist[i].taxPercent,
                        taxAmount:this.chargeslist[i].taxAmount,
                        incomeExpense:this.chargeslist[i].incomeExpense,
                        chargeIdSell:this.chargeslist[i+1].chargeId,
                        sellingrate:this.chargeslist[i+1].rate,
                        currencyId:this.chargeslist[i+1].currencyId,
                        currencyCode:this.chargeslist[i+1].currencyCode,
                        selltotalAmount:this.chargeslist[i+1].totalAmount,
                        selltaxPercent:this.chargeslist[i+1].taxPercent,
                        selltaxAmount:this.chargeslist[i+1].taxAmount,
                        sellincomeExpense:this.chargeslist[i+1].incomeExpense,
                        payingPartyId:this.chargeslist[i+1].payingPartyId,
                        invoiceTo:this.chargeslist[i+1].payingPartyId,
                      }));
          }
        }
      
      });


      this.chargesForm.patchValue(this.datachargpatch);
      console.log("patch data value",this.datachargpatch)

      // this.chargesForm 
      console.log("after patch form")
      console.log(this.chargesForm.value)
  
      console.log("endm")

}
bindChargeMaster(id){
  this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/Cargo/${id}`,this.headers).subscribe((res: any) => {
  this.rowData=res;
  this.transportDirection=this.rowData.transportDirection;
  this.modeOfTransport=this.rowData.modeOfTransport;
  this.getChargeItem(this.modeOfTransport, this.transportDirection);
  });
}

// showComponent1(){
//   this.isComponentVisible=false;
//   this.isComponent=true;
//   this.isDropdownOpen=true;
// }

getDataTableRows(id): Promise<any[]> {
  return new Promise((resolve, reject) => {

    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/CargoCharge/GetCargoChargetbyCargoID?id=${id}`).subscribe((response: any) => {
      console.log('get CostSheet', response);
      this.rows = response;
      this.tempData = this.rows;
      this.kitchenSinkRows = this.rows;
      resolve(this.rows);
    }, reject);
  });
}

getTableRows(id): Promise<any[]> {
  return new Promise((resolve, reject) => {

    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/CostSheet/GetCostSheettbyCargoID?id=${id}`).subscribe((response: any) => {
      console.log('get CostSheet', response);
      this.rows = response;
      this.tempData = this.rows;
      this.kitchenSinkRows = this.rows;
      resolve(this.rows);
    }, reject);
  });
}

toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
}


//costsheet code
chargeItemName: any
onChangeChargeMaster(event, form) {

  console.log("chargeItemName=", event.chargeItemName);
  this.chargeItemName = event.chargeItemName;
  form.controls['chargeItemName'].setValue(this.chargeItemName);

}

GetChargeItem:any;
getChargeItem(mode: any, direction: any) {
  this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/ChargedItemMaster/${mode}/${direction}`).subscribe((response: any) => {
    console.log("ChargeItemMaster=", response);
    this.GetChargeItem = response;
  })
}


onChange(index: number) {
  const subTotal = (this.formArr.at(index).get('rate').value || 0) *
    (this.formArr.at(index).get('quantity').value || 0);
  this.formArr.at(index).get('totalAmount').setValue(subTotal);

  const taxsubtotal = ((this.formArr.at(index).get('rate').value || 0) *
    (this.formArr.at(index).get('quantity').value || 0) * (this.formArr.at(index).get('taxPercent').value || 0)) / 100;
  this.formArr.at(index).get('taxAmount').setValue(taxsubtotal);


  // selling amt calculation
  const sellsubTotal = (this.formArr.at(index).get('sellingrate').value || 0) *
    (this.formArr.at(index).get('quantity').value || 0);
  this.formArr.at(index).get('selltotalAmount').setValue(sellsubTotal);

  const selltaxsubtotal = ((this.formArr.at(index).get('sellingrate').value || 0) *
    (this.formArr.at(index).get('quantity').value || 0) * (this.formArr.at(index).get('selltaxPercent').value || 0)) / 100;
  this.formArr.at(index).get('selltaxAmount').setValue(selltaxsubtotal);

  // Profit Excluding Tax & Profit Including Tax

  this.subscription = this.formArr.valueChanges.subscribe(data => {
        
    this.totalBuyingAmt=data.reduce((a,b) => a + +b.totalAmount, 0)
    this.totalBuyingAmtTax = data.reduce((a,b) => a + +b.taxAmount, 0)
    this.totalSellingAmt=data.reduce((a,b) => a + +b.selltotalAmount, 0)
    this.totalSellyingAmtTax = data.reduce((a,b) => a + +b.selltaxAmount, 0)
    
    this.profitExcludingTax=this.totalSellingAmt - this.totalBuyingAmt
    this.profitIncludingTax=(this.totalSellingAmt + this.totalSellyingAmtTax)-(this.totalBuyingAmt+this.totalBuyingAmtTax)

  })
}
totalfunction(){
  this.subscription = this.formArr.valueChanges.subscribe(data => {
        
    this.totalBuyingAmt=data.reduce((a,b) => a + +b.totalAmount, 0)
    this.totalBuyingAmtTax = data.reduce((a,b) => a + +b.taxAmount, 0)
    this.totalSellingAmt=data.reduce((a,b) => a + +b.selltotalAmount, 0)
    this.totalSellyingAmtTax = data.reduce((a,b) => a + +b.selltaxAmount, 0)
    
    this.profitExcludingTax=this.totalSellingAmt - this.totalBuyingAmt
    this.profitIncludingTax=(this.totalSellingAmt + this.totalSellyingAmtTax)-(this.totalBuyingAmt+this.totalBuyingAmtTax)

  })
}
getCurrency() {
  this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/CurrencyMaster`).subscribe((response: any) => {
    console.log("CurrencyMaster", response);
    this.GetCurrency = response;
  })
}
// onGetCurrency(event, form) {
//   console.log("currencyId", event.currencyCode);
//   this.currencyCode = event.currencyCode;
//   form.controls['currCode'].setValue(this.currencyCode);
// }
// getCurr() {
//   this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/CurrencyMaster`).subscribe((response: any) => {
//     console.log("CurrMaster", response);
//     this.GetCurr = response;
//   })
// }
// onGetCurr(event, form) {
//   console.log("currencyId", event.currencyCode);
//   this.currCode = event.currencyCode;
//   form.controls['currencyCode'].setValue(this.currCode);
// }

currencyName:any;
  currencydropdownValues:any;
  onChangeCurrency(event,index){
    // alert(event.currencyId)
    const selectedCurrencyCode = event.currencyCode;
    // const chargeItemName = selectedCurrencyCode.currencyCode;
    // alert(selectedCurrencyCode); // Use chargeItemName as needed
    this.currencyName=selectedCurrencyCode
    const currencyControl =this.formArr.at(index).get('currencyCode');
    currencyControl.setValue(this.currencyName)

    const currencySellControl =this.formArr.at(index).get('currencyId');
    currencySellControl.setValue( event.currencyId)

    this.currencydropdownValues=[];
    for (let i = 0; i < this.formArr.length; i++) {
      const formGroup = this.formArr.at(i) as FormGroup;
      const dropdownControl = formGroup.get('currencyCode');
      const selectedValue = dropdownControl.value;
      this.currencydropdownValues.push(selectedValue);
    }
    console.log('Dropdown Values:', this.currencydropdownValues);
  }

getTaxPercentage() {
  this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/TaxRate`).subscribe((response: any) => {
    console.log("TaxPercentage", response);
    this.GetTaxPercentage = response;
  })
}



getTax() {
  this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/TaxRate`).subscribe((response: any) => {
    console.log("TaxRate", response);
    this.GetTax = response;
  })
}


getInvoiceTo() {
  this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/Cmp/Customer`).subscribe((response: any) => {
    console.log("Invoice To", response);
    this.GetInvoiceTo = response;
  })
}

onInvoiceTo(event, form) {
  console.log("companyName=", event.companyName);
  this.cust = event.companyName;
  console.log(this.cust);
  let id = event.companyId;
  console.log(id);
  form.controls['cust'].setValue(this.cust);
}


getPayingTo() {
  this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/Cmp/Customer`).subscribe((response: any) => {
    console.log("Pay To", response);
    this.GetPayTo = response;
  })
}

onPayTo(event, form) {
  console.log("companyName=", event.companyName);
  this.cust = event.companyName;
  console.log(this.cust);
  let id = event.companyId;
  console.log(id);
  form.controls['cust'].setValue(this.cust);
}

datacharg: any = [];
datachargsell = [];
mergedData: any;
async onAddCharges(form: FormGroup,costsheetid,cargoid) {
    console.log("costsheetId",costsheetid)
    console.log("cargoId",cargoid)
  this.isValidFormSubmitted = false;

  //form invalid
  if (this.chargesForm.invalid) {
  
      this.isValidFormSubmitted = true;
      for (let i = 0; i < this.formArr.length; i++) {
          const control = this.formArr.at(i);
          if (control instanceof FormGroup) {
              Object.values(control.controls).forEach(innerControl => {
                  innerControl.markAsTouched();
              });
          } else {
              control.markAsTouched();
          }
      }
  
  }
  else{
    for(let i=0;i<this.chargesForm.value.Rows.length;i++)
      {
        const charge = this.chargesForm.value.Rows[i];
        this.datacharg[i] = {
          costSheetId: this.costSheetId||costsheetid,
          cargoId: this.companydataurlid || this.cargoId||cargoid,
          chargeId: charge.chargeId,
          chargeItemId: charge.chargeItemId,
          chargeDescription: charge.chargeDescription,
          quantity: charge.quantity,
          applyPer: charge.applyPer,
          rate: charge.rate,
          currencyId: charge.currencyId,
          currencyCode: charge.currencyCode,
          totalAmount: charge.totalAmount,
          taxPercent: charge.taxPercent,
          taxAmount: charge.taxAmount,
          incomeExpense: charge.incomeExpense,
          payingPartyId: charge.payingPartyId,
          invoiceTo: charge.invoiceTo,

      };

      this.datachargsell[i] = {
        costSheetId: this.costSheetId||costsheetid,
        cargoId: this.companydataurlid || this.cargoId||cargoid,
          chargeId: charge.chargeIdSell,
          chargeItemId: charge.chargeItemId,
          chargeDescription: charge.chargeDescription,
          quantity: charge.quantity,
          applyPer: charge.applyPer,
          rate: charge.sellingrate,
          currencyId: charge.currencyId,
          currencyCode: charge.currencyCode,
          totalAmount: charge.selltotalAmount,
          taxPercent: charge.selltaxPercent,
          taxAmount: charge.selltaxAmount,
          incomeExpense: charge.sellincomeExpense,
          payingPartyId: charge.payingPartyId,
          invoiceTo: charge.invoiceTo,
      };
  }
  console.log("=", this.costSheetNo);
  console.log("form data datacharg=", this.datacharg.length);
  console.log("form data datacharg=", this.datacharg);
  console.log("form data datacharg sell=", this.datachargsell);


  let mergedArray = [];
  let maxArrayLength = Math.max(this.datacharg.length, this.datachargsell.length);

  for (let i = 0; i < maxArrayLength; i++) {
      if (this.datacharg[i]) {
          mergedArray.push(this.datacharg[i]);
      }
      if (this.datachargsell[i]) {
          mergedArray.push(this.datachargsell[i]);
      }
  }

    //  start
    this.mergedData = mergedArray;
    console.log('mergedData', this.mergedData);

    this.mergedData = mergedArray;
    console.log('mergedData', this.mergedData)
    this.updateOrCreateCharges(this.mergedData,costsheetid,cargoid);
    // for (let i = 0; i < this.mergedData.length; i += 2) {
    //   for (let j = i; j < i + 2; j++) {
    //       await new Promise<void>(async (resolve, reject) => {
    //           let charIDnew = this.mergedData[j].chargeId;

    //           if (charIDnew || charIDnew === 0) {
    //               // PUT request logic
    //               this.httpclient.put(`${this.apiConfig.apiBaseUrl}/api/CargoCharge/${this.mergedData[j].chargeId}`, JSON.stringify(this.mergedData[j]), this.headers).subscribe(
    //                   () => {
    //                       resolve();
    //                       this.toastr.success('Cost sheet Charges Updated Successfully', 'Update', {
    //                           timeOut: 3000
    //                       });
    //                   },
    //                   (error) => {
    //                       reject(error);
    //                   }
    //               );
    //           } else {
    //               // POST request logic

    //               const length=this.mergedData.length;
    //               let chargeszeroID = [];

    //               for (let i = 0; i < this.mergedData.length; i++) {
    //                   let charIDnew = this.mergedData[i].chargeId;

    //                   if (charIDnew === undefined || charIDnew === 0) {
    //                       chargeszeroID.push(this.mergedData[i]);
    //                   }
    //               }
    //               // for (const data of chargeszeroID) {
    //               //     await new Promise<void>((resolve, reject) => {
    //               //         this.httpclient.post(`${this.apiConfig.apiBaseUrl}/api/CargoCharge`, JSON.stringify(data), this.headers).subscribe(
    //               //             () => {
    //               //                 resolve();
    //               //                 this.toastr.success('Added Successfully', '', {
    //               //                     timeOut: 3000
    //               //                 });
    //               //             },
    //               //             (error) => {
    //               //                 reject(error);
    //               //                 this.toastr.error('Something Went Wrong', 'Error', {
    //               //                     timeOut: 3000
    //               //                 });
    //               //             }
    //               //         );
    //               //     });
    //               //     console.log(this.mergedData);
    //               // }
    //               // Assuming chargeszeroID is an array of CargoCharge objects
    //               console.log("chargeszeroID",chargeszeroID);
    //               this.httpclient.post(`${this.apiConfig.apiBaseUrl}/api/CargoCharge`, chargeszeroID, this.headers)
    //               .subscribe(
    //                   () => {
    //                       this.toastr.success('Added Successfully', '', { timeOut: 3000 });
    //                   },
    //                   (error) => {
    //                       this.toastr.error('Something Went Wrong', 'Error', { timeOut: 3000 });
    //                   },
    //                   () => {
    //                       console.log(this.mergedData);
    //                   }
    //               );

    //               //patch charges list
    //               this.getChargesList(cargoid,costsheetid)
    //           }
    //       });
    //   }
    // }

    // end
  }
  }

  //to Add and update Charges
  async updateOrCreateCharges ( CargoCharge:any,costsheetid,cargoid){
    // for (let i = 0; i < CargoCharge.length; i += 2) {
    //   const chunk = CargoCharge.slice(i, i + 2);
      console.log("data cargo charge",CargoCharge)
      try {
        const response = await this.httpclient.post(`${this.apiConfig.apiBaseUrl}/api/CargoCharge/UpdateOrCreateCargoCharges`, CargoCharge, this.headers).toPromise();
        this.toastr.success('Updated/Added Successfully', '', { timeOut: 1000 });
        console.log(response);
      } catch (error) {
        this.toastr.error('Something Went Wrong', 'Error', { timeOut: 1000 });
        console.error(error);
      }

    
    // }
    this.getChargesList(cargoid, costsheetid);
  };
  addNewRow() {
    this.formArr.push(this.initRows());
  }
  initRows() {
    return this.fb.group({
      cargoId:this.cargoId|this.companydataurlid,
      costSheetId:this.costSheetId,
      sqchargeId:[0],
      chargeItemId: ['',Validators.required],
      chargeDescription:[''],
      quantity: ['',Validators.required],
      applyPer: ['',Validators.required],
      rate: ['',Validators.required],
      currencyId: ['',Validators.required],
      currencyCode:[''],
      totalAmount: [{value: '', disabled: false},Validators.required],
      taxPercent: ['',Validators.required],
      taxAmount:[{value: '', disabled: false},Validators.required],
      sqchargeIdSell:[0],
      sellingrate:['',Validators.required],
      sellcurrencyId:[{value: '', disabled: true},Validators.required],
      selltotalAmount:['',Validators.required],
      selltaxPercent:['',Validators.required],
      selltaxAmount:['',Validators.required],
      incomeExpense:['EXPENSE'],
      sellincomeExpense:['INCOME'],
      invoiceTo:[''],
      payingPartyId:['',Validators.required],
    });
  }
remove(index: number,costsheetId:number, chargeid: any,cargoid:any) {
   
   console.log("index",index);
   console.log("chargeid",chargeid);
   if (chargeid !== null && chargeid !== undefined && chargeid !== 0) {
    this.deleteCostSheetCharges(costsheetId, chargeid, cargoid);
    console.log("removed success");
  } else {
    this.formArr.removeAt(index);
    console.log("removed index");
  }
}
  deleteCostSheetCharges(costSheetId:any, chargeId:any,cargoid:any){
  
    this.httpclient.delete(`${this.apiConfig.apiBaseUrl}/api/CargoCharge/${chargeId}`).subscribe((Success: any) => {

    });
    this.httpclient.delete(`${this.apiConfig.apiBaseUrl}/api/CargoCharge/${chargeId+1}`).subscribe((Success: any) => {
        this.toastr.success('Deleted Successfully', '', { timeOut: 3000 });
        this.getChargesList(cargoid,costSheetId)
    });
    //patch charges list
   
   
  }
  patch(costSheetId,cargoid){

    this.getChargesList(this.cargoId || this.companydataurlid||cargoid,this.costSheetNo||this.costSheetId||costSheetId)
  }
  getApplyPer() {
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/ApplyPerMaster`).subscribe((response: any) => {
      console.log("ApplyPerMaster", response);
      this.GetApplyPer = response;
    })
  }
  Costsheet: any;

generatePDF(costSheetId) {
  console.log(costSheetId);
  console.log("chargesFormData ", JSON.stringify(this.chargesForm.value));
  console.log("chargesFormData ", JSON.stringify(this.chargesForm.value.costSheetId));
  console.log("CompanyFormData", JSON.stringify(this.CompanyForm.value));

  let docDefinition = {
    footer: {
      columns: [
        [
          { text: '_______________________________', alignment: 'center', color: "#2f82bb" },
          { text: 'INDIA    |     TURKEY     |     JAPAN', alignment: 'center', color: "#2f82bb" }
        ]
      ]
    },
    content: [
      {
        columns: [
          [
            {
              text: "FRETLOG",
              bold: true,
              fontSize: 25,
              margin: [0, 15, 0, 15]
            },
            {
              text: `FRETLOG India Pvt. Ltd.
                  Sanjona Chambers | 10th Floor |
                  Office No:1002 | (Opp. IIPS) |
                  BKSD Marg Govandi Station Road
                  Mumbai - 400088 Phone :02267843000`,
              fontSize: 9
            },
            {
              text: "TO",
              bold: true,
              fontSize: 10,
              margin: [0, 20, 0, 10],
              alignment: 'left'
            },
            {
              text: "Attn:",
              bold: true,
              fontSize: 10,
              margin: [0, 20, 0, 10],
              alignment: 'left'
            },
            {
              text: "JAIMIN SHAH",
              fontSize: 10,
              alignment: 'left'
            },
          ],
          [
            {
              text: "Quotation",
              margin: [0, 15, 0, 15],
              fontSize: 35,
              color: "#888",
              alignment: 'right'
            },
            {
              text: `Date: ${new Date().toLocaleString()}`,
              alignment: 'right',
              fontSize: 9,
              margin: [0, 10, 0, 0],
            },
            {
              text: `Quotation #: ${this.chargesForm.value.Rows[0].costSheetId}`,
              alignment: 'right',
              fontSize: 9,
              margin: [0, 10, 0, 0],
            },
            {
              text: `ETA: ${this.CompanyForm.value.ETA}`,
              alignment: 'right',
              fontSize: 9,
              margin: [0, 10, 0, 0],
            },
            {
              text: `ETD: ${this.CompanyForm.value.etd}`,
              alignment: 'right',
              fontSize: 9,
              margin: [0, 10, 0, 0],
            },
            {
              text: `Sales Person: ${this.CompanyForm.value.sales}`,
              alignment: 'right',
              fontSize: 9,
              margin: [0, 10, 0, 0],
            },
          ],
        ]
      },
      {
        columns: [
          [
            {
              text: "-------------------------------------------------------------",
              bold: true,
              fontSize: 25,
              color: "#ddd",
              margin: [0, 10, 0, 10]
            }
          ]
        ]
      },
      {
        columns: [
          [
            {
              text: `ACCOUNT NAME: ${this.CompanyForm.value.accountName}`,
              fontSize: 10,
              alignment: 'left'
            },
            {
              text: `OPPORTUNITY NAME: ${this.CompanyForm.value.opportunityName}`,
              fontSize: 10,
              alignment: 'left'
            },
            {
              text: `EXCHANGE RATE: EUR 90.85, USD 83.27`,
              fontSize: 10,
              alignment: 'left'
            },
          ],
        ]
      },
      {
        columns: [
          [
            {
              text: "-------------------------------------------------------------",
              bold: true,
              fontSize: 25,
              color: "#ddd",
              margin: [0, 10, 0, 10]
            }
          ]
        ]
      },
      {
        columns: [
          [
            {
              text: `POL: ${this.CompanyForm.value.pol}`,
              fontSize: 10,
              alignment: 'left'
            },
            {
              text: `POD: ${this.CompanyForm.value.pod}`,
              fontSize: 10,
              alignment: 'left'
            },
          ],
          [
            {
              text: `DESTINATION: ${this.CompanyForm.value.DestinationAgent}`,
              fontSize: 10,
              alignment: 'left',
            },
          ]
        ]
      },
      {
        columns: [
          [
            {
              table: {
                headerRows: 1,
                widths: ['auto', 200, 'auto', 'auto', 'auto', 'auto'],
                body: [
                  ['SR #', 'PARTICULARS', 'APPLY PER / \n UNIT', 'QTY\nA', 'RATE\nB', 'SUB TOTAL\n C=A*B'],
                  ...this.chargeslist.map(p => ([p.chargeId, p.chargeDescription, p.applyPer, p.quantity, p.currencyCode + "     " + p.rate, p.currencyCode + "     " + (p.rate * p.quantity).toFixed(2)])),
                ]
              },
              margin: [0, 20, 0, 20],
              fontSize: 8,
            },
            {
              text: "Notes",
              bold: true,
              underline: true,
              fontSize: 10,
              margin: [0, 15, 0, 5]
            },
            {
              text: "________________________________",
              color: "#1754ff"
            },
          ]
        ]
      },
    ],
  };

  pdfMake.createPdf(docDefinition).open();
}



// async function updateCharge(chargeId: number, data: any): Promise<void> {
//   return new Promise<void>(async (resolve, reject) => {
//       try {
//           await this.httpclient.put(`${this.apiConfig.apiBaseUrl}/api/CargoCharge/${chargeId}`, JSON.stringify(data), this.headers).toPromise();
//           resolve();
//           this.toastr.success('Cost sheet Charges Updated Successfully', 'Update', { timeOut: 3000 });
//       } catch (error) {
//           reject(error);
//       }
//   });
// }

// async function addCharge(data: any): Promise<void> {
//   return new Promise<void>(async (resolve, reject) => {
//       try {
//           await this.httpclient.post(`${this.apiConfig.apiBaseUrl}/api/CargoCharge`, JSON.stringify(data), this.headers).toPromise();
//           resolve();
//           this.toastr.success('Added Successfully', '', { timeOut: 3000 });
//       } catch (error) {
//           reject(error);
//           this.toastr.error('Something Went Wrong', 'Error', { timeOut: 3000 });
//       }
//   });
// }

}