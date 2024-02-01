
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as snippet from 'app/companies/datatables.snippetcode';
import { ColumnMode, DatatableComponent, id, SelectionType } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { OceanExport } from './oedetails/OceanExport';
import { Opportunity } from './oedetails/Opportunity';
import { DatePipe } from '@angular/common';
import { AppConfigService } from 'app/services/app-config.service';


@Component({
  selector: 'app-ocean-export',
  templateUrl: './ocean-export.component.html',
  styleUrls: ['./ocean-export.component.scss']
})
export class OceanExportComponent implements OnInit {
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public SelectionType = SelectionType;
  Data:any;
  OEdataurlid:any;
  tempData= [];
  rows: any;
  table: any;
  public ColumnMode = ColumnMode;
  CompanyForm: FormGroup;
  GetCustomer:any;
  // cust:any;
  GetSalesPerson: any;
  sales:any;
  opportunityOwnerId:any;

  public chkBoxSelected = [];
  // public exportCSVData;
  selectElementText = "Select";
  public selected = [];
  public expanded = {};
  public myType = [];
  OEObj: OceanExport=new OceanExport();
  OObj: Opportunity=new Opportunity();
  accountName: any;


  private _unsubscribeAll: Subject<any>;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  // snippet code variables
  public _snippetCodeKitchenSink = snippet.snippetCodeKitchenSink;
  public _snippetCodeInlineEditing = snippet.snippetCodeInlineEditing;
  public _snippetCodeRowDetails = snippet.snippetCodeRowDetails;
  public _snippetCodeCustomCheckbox = snippet.snippetCodeCustomCheckbox;
  public _snippetCodeResponsive = snippet.snippetCodeResponsive;
  public _snippetCodeMultilangual = snippet.snippetCodeMultilangual;
  public _snippetCodeVertical = snippet.snippetCodeVertical;
 


  constructor(private httpclient : HttpClient, public datepipe:DatePipe,private route:ActivatedRoute,private modalService: NgbModal, private fb: FormBuilder,private apiConfig:AppConfigService) { 
   this.CompanyForm = this.fb.group({
    // cust:[''],
    opportunityOwnerId:[0,[Validators.required]],
    accountId:0,
    accountName:[''],
    sales:[''],
    customerId:0,
    opportunityId:['']
   })


  //  this.CompanyForm= new FormGroup({
   
  //   cust:new FormControl(''),
  //   opportunityOwnerId:new FormControl(0,[Validators.required]),
  //   accountId:new FormControl(0),
  //   accountName:new FormControl(''),
  //   sales:new FormControl(''),
  //   customerId:new FormControl(0),
  //   opportunityId:new FormControl(0),
  // });
  }
 

   /**
   * Method Search (filter)
   *
   * @param event
   */
   filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
     // console.log(d.companyName);
      return d.jobNo.toLowerCase().indexOf(val) !== -1 || !val;
    });
 // update the rows
 this.kitchenSinkRows = temp;
 // Whenever the filter changes, always go back to the first page
 //this.table.offset = 0;
}

  ngOnInit(): void {
    this.getDataTableRows();
    this.getCustomer();
    this.getSalesPerson();
   
  }

  getDataTableRows(): Promise<any[]> {
    return new Promise((resolve, reject) => {

      this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/Cargo/OceanExport`).subscribe((response: any) => {
        console.log('get all companies');
        console.log("companies export",response)
        this.rows = response;
        this.tempData = this.rows;
        this.kitchenSinkRows = this.rows;
        // this.exportCSVData = this.rows;
        // this.onDatatablessChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
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
     this.accountName=event.companyName;
    // let id=event.companyId;
    // console.log(id);
    // this.getAddress();
    // this.getAddress(id)
    form.controls['accountName'].setValue(this.accountName);
  }


  getSalesPerson(){ 
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/UserMaster`).subscribe((response: any) => {
        console.log("SalesPerson",response);
        this.GetSalesPerson=response;
    })
  }
  onSalesPerson(event, form){
    console.log("userDisplayName=",event.userDisplayName);
    this.sales=event.userDisplayName;
        // form.controls['sales'].setValue(this.sales);

  }

  populateForm(cargoid, modalForm,id:any){
     console.log("rowData", cargoid);
     this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/Cargo/${cargoid}`,this.headers).subscribe((res: any) => {
      this.Data=res;
      console.log("row**************",this.Data)
    //  this.rows = this.Data;
    //   this.tempData = this.rows;
    //   this.kitchenSinkRows = this.rows;
      
    
        console.log('rowData.cargoId',this.Data.cargoId);
        console.log('rowData.opportunityId-----------',this.Data.opportunityId);
        console.log('rowData.accountName-----------',this.Data.accountName);
    // this.accountName=this.Data.accountName;
    this.accountName=this.Data.accountName;

   this.opportunityOwnerId=this.Data.opportunityOwnerId
   console.log(this.opportunityOwnerId);
// assign opportunityOwnerId to row
    this.modalService.open(modalForm, {windowClass: 'modalForm'})
    this.CompanyForm.patchValue({
     

        opportunityId:this.Data.opportunityId,
        accountId:this.Data.accountId,
        // accountName:this.Data.accountName,
        accountName:this.Data.accountName,
        isDeleted:this.Data.isDeleted,
        createdBy:this.Data.createdBy,
        dateCreated:this.Data.dateCreated,
        opportunityOwnerId:this.Data.opportunityOwnerId,
        amount:this.Data.amount,
        opportunityName:this.Data.opportunityName,
        cargoId:this.Data.cargoId,
        cargoNumber:this.Data.cargoNumber,
        jobNo:this.Data.jobNo,
        job:this.Data.job,
        masterNo:this.Data.masterNo, 
        houseNo:this.Data.houseNo,
        modeOfTransport:this.Data.modeOfTransport,
        transportDirection:this.Data.transportDirection, 
        isConsolidation:this.Data.isConsolidation,
        incoTermId:this.Data.incoTermId,
        typeOfMoveId:this.Data.typeOfMoveId,
        pickupAddressId:this.Data.pickupAddressId,
        deliveryAddressId:this.Data.deliveryAddressId,
        customerReference:this.Data.customerReference, 
        polid:this.Data.polid,
        pol:this.Data.pol,
        podid:this.Data.podid,
        pod:this.Data.pod,
        // etd:this.this.Data.etd,
        etd:this.datepipe.transform(this.Data.etd,'yyyy-MM-dd'),
        // eta:this.this.Data.eta,
        eta:this.datepipe.transform(this.Data.eta,'yyyy-MM-dd'),
        shipperId:this.Data.shipperId,
        shipperAddressId:this.Data.shipperAddressId,
        shipper:this.Data.shipper,
        consigneeId:this.Data.consigneeId,
        consigneeAddressId:this.Data.consigneeAddressId,
         consignee:this.Data.consignee, 
        notifyParty1Id:this.Data.notifyParty1Id,
        notifyParty1AddressId:this.Data.notifyParty1AddressId,
        // notifyParty1:this.this.Data.notifyPart1, 
        notifyParty2Id:this.Data.notifyParty2Id,
        notifyParty2AddressId:this.Data.notifyParty2AddressId,
        forwarderId:this.Data.forwarderId,
        // forwarder:this.this.Data.forwarder,
        forwardedAddressId:this.Data.forwardedAddressId,
        originAgentId:this.Data.originAgentId,
        // originAgent:this.this.Data.originAgent,
        originAgentAddressId:this.Data.originAgentAddressId,
        destinationAgentId:this.Data.destinationAgentId,
        destinationAgentAddressId:this.Data.destinationAgentAddressId,
        // destinationAgent:this.this.Data.destinationAgent,
        notes:this.Data.notes, 
        modifiedBy:this.Data.modifiedBy,
        dateModified:this.Data.dateModified, 
        deletedBy:this.Data.deletedBy,
        dateDeleted:this.Data.dateDeleted, 
         customerId:this.Data.customerId,
        cargoApprovalStatus:this.Data.cargoApprovalStatus, 
        cargoSopapprovalStatus:this.Data.cargoSopapprovalStatus, 
        officeId:this.Data.officeId,
        freightStatus:this.Data.freightStatus, 
        paymentTerms:this.Data.paymentTerms, 
        invoicingParty:this.Data.invoicingParty, 
        jobType:this.Data.jobType,
        isHblnoautogenerate:this.Data.isHblnoautogenerate, 
        salesQuoteId:this.Data.salesQuoteId,
        isLocked:this.Data.isLocked, 
        lockedBy:this.Data.lockedBy,
        lockedDate:this.Data.lockedDate, 
        hblTerm:this.Data.hblTerm, 
        mblTerm:this.Data.mblTerm, 
        hblStatus:this.Data.hblStatus, 
        mblStatus:this.Data.mblStatus, 
        freeDays:this.Data.freeDays, 
        por:this.Data.por, 
        isGstJob:this.Data.isGstJob, 

    
    });
    console.log('this.CompanyForm.value PATCH VALUE',this.CompanyForm.value);
});
  }



  UpdateCompany(form: FormGroup){
    console.log("form.value",form.value);
  
    this.OObj =
    {
   
      "opportunityId": this.Data.opportunityId,
      "accountId":form.value.customerId,
      // "accountName":form.value.accountName,
      "accountName":this.accountName,
      "isDeleted": this.Data.isDeleted,
       "createdBy":this.Data.createdBy,
      "dateCreated":this.Data.dateCreated,
      "opportunityOwnerId":form.value.opportunityOwnerId,
      "amount":this.Data.amount,
     "opportunityName": this.Data.jobNo,
     
    }
    
  
       console.log(JSON.stringify(this.OObj));
  
       this.httpclient.put(`${this.apiConfig.apiBaseUrl}/api/Opportunity/${this.OObj.opportunityId}`, JSON.stringify(this.OObj), this.headers).subscribe(res => {
        console.log(' Update Success');
        console.log(res);
  
        
  // let updateData:any=res
  // this.insertedrecord.push(updateData)
  //       console.log("Updated Record:",this.insertedrecord);
  //       this.opportunityId=this.insertedrecord[0].opportunityId;
  //        JSON.stringify(this.opportunityId);
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
        // console.log(this.shipper);
        console.log(form.value.shipper)
      
        this.OEObj =
          {
            "cargoId": this.Data.cargoId,
            "cargoNumber":this.Data.jobNo,
            "jobNo": this.Data.jobNo,
            "masterNo":this.Data.masterNo,
            "houseNo": this.Data.houseNo,
            "modeOfTransport": this.Data.modeOfTransport,
            "transportDirection":this.Data.transportDirection,
            "isConsolidation": this.Data.isConsolidation,
            "incoTermId": this.Data.incoTermId,
            "typeOfMoveId": this.Data.typeOfMoveId,
            "pickupAddressId": this.Data.pickupAddressId,
            "deliveryAddressId":this.Data.deliveryAddressId,
            // "opportunityId":this.data.opportunityId,
            "opportunityId":this.Data.opportunityId,
            "customerReference": this.Data.customerReference,
            "polid": this.Data.polid,
             "pol":this.Data.pol,
            // "pol":this.pol,
            "podid": this.Data.podid,
            "pod": this.Data.pod,
            // "pod":this.pod,
            "etd":this.Data.etd,
            "eta": this.Data.eta,
            "shipperId": form.value.customerId,
            "shipperAddressId": this.Data.shipperAddressId,
            "shipper": this.Data.shipper,
            // "shipper": this.shipper,
            "consigneeId":form.value.customerId,
            "consigneeAddressId":this.Data.consigneeAddressId,
             "consignee": this.Data.consignee,
            // "consignee": this.consignee,
            "notifyParty1Id":form.value.customerId,
            "notifyParty1AddressId": this.Data.notifyParty1AddressId,
             "notifyParty1": this.Data.notifyParty1,
            // "notifyParty1": this.NotifyPart1,
            "notifyParty2Id": 0,
            "notifyParty2AddressId": this.Data.notifyParty2AddressId,
            "forwarderId": 0,
            "forwardedAddressId": this.Data.forwardedAddressId,
            "originAgentId": 0,
            "originAgentAddressId":this.Data.originAgentAddressId,
            "destinationAgentId": 0,
            "destinationAgentAddressId": this.Data.destinationAgentAddressId,
            "notes": "string",
            "createdBy": 0,
            "dateCreated":this.Data.dateCreated,
            "modifiedBy": 0,
            "dateModified": new Date().toISOString(),
            "deletedBy": 0,
            "dateDeleted": "2023-05-08T06:11:36.621Z",
            "isDeleted": false,
            "customerId": form.value.customerId,
            "cargoApprovalStatus": "string",
            "cargoSopapprovalStatus": "string",
            "officeId": 0,
            "freightStatus": this.Data.freightStatus,
            "paymentTerms": "string",
            "invoicingParty": "string",
            "jobType": this.Data.jobType,
            "isHblnoautogenerate": true,
            "salesQuoteId": 0,
            "isLocked": true,
            "lockedBy": 0,
            "lockedDate": this.Data.lockedDate,
            "hblTerm":this.Data.hblTerm,
            "mblTerm": this.Data.mblTerm,
            "hblStatus": this.Data.hblStatus,
            "mblStatus":this.Data.mblStatus,
            "freeDays": this.Data.freeDays,
            "por":this.Data.por,
            "isGstJob": this.Data.isGstJob,
           
       
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
    console.log( "accountName***************",this.CompanyForm.value.accountName);
    console.log( "this.OObj.opportunityId***************",this.OObj.opportunityId);
    // if(this.CompanyForm.value.opportunityId==0) 
    // {
    //   // console.log('!!!!!!!!!',this.hero);
    //   console.log("INSERT");
    //   this.addCompany(this.CompanyForm);
    // this.success();
    // console.log(this.OObj.opportunityId);
  
    // }
  
    // else
    
    {
      console.log("UPDATE");
     this.UpdateCompany(this.CompanyForm)
      this.success();
  
      console.log(this.OObj.opportunityId);
      console.log(this.OEObj.cargoId);
    }

    this.modalService.dismissAll();
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


}
