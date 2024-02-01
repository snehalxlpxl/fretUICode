import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoreTranslationService } from '@core/services/translation.service';
import { OceanExport } from 'app/Ocean/ocean-export/oedetails/OceanExport';
import { Opportunity } from 'app/Ocean/ocean-export/oedetails/Opportunity';
import { AppConfigService } from 'app/services/app-config.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-oidetails',
  templateUrl: './oidetails.component.html',
  styleUrls: ['./oidetails.component.scss']
})
 export class OidetailsComponent implements OnInit {

@Input() hero;

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
NotifyPart1:any;
NotifyPart2:any;
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

headers = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
OEdataurlid: string;
updateData: any;
// cargodata: Object;



constructor(private httpclient : HttpClient, private fb: FormBuilder, private route:ActivatedRoute,  public datepipe:DatePipe,private _coreTranslationService: CoreTranslationService,private apiConfig:AppConfigService)  { 
  
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
      isGstJob:[]
  })

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
}


getOEDataById(id:any){
  console.log("New ID", id);
  this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/Cargo/${id}`,this.headers).subscribe((res: any) => {
    this.rowData=res;
    console.log("row**************",this.rowData)
   this.rows = this.rowData;
    this.tempData = this.rows;
    this.kitchenSinkRows = this.rows;
    
  
      console.log('rowData.cargoId',this.rowData.cargoId);
      console.log('rowData.opportunityId-----------',this.rowData.opportunityId);
      console.log('rowData.accountName-----------',this.rowData.accountName);
      console.log(this.rowData.modeOfTransport);
      console.log(this.rowData.shipper)
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
        // notifyParty1:this.rowData.notifyPart1, 
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

onCustomer(form,event){
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
  this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/UserMaster/UserMaster`).subscribe((response: any) => {
      console.log("SalesPerson",response);
      this.GetSalesPerson=response;
  })
}
onSalesPerson(form,event){
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
OnmodeOfTransport(form,event){
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
  this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/MoveTypeMaster`).subscribe((response: any) => {
      console.log("Type Of Move",response);
      this.GetTypeOfMove=response;
  })
}
ontypeOfMove(form,event){
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
onpol(form,event){
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
onpod(form,event){
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
onIncoTerm(form,event){
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
onAddress(form,event){
 
  console.log("address=",event.companyName);
  this.shipper=event.companyName;
  form.controls['shipper'].setValue(this.shipper);

}

onConsignee(form,event){
  
  console.log("Consignee=",event.companyName);
  this.consignee=event.companyName;
  form.controls['consignee'].setValue(this.consignee);

}

onNotifyPart1(form,event){


  console.log("NotifyPart1=",event.companyName);
  this.NotifyPart1=event.companyName;
  form.controls['NotifyPart1'].setValue(this.NotifyPart1);
}


onNotifyPart2(form,event){
  console.log("NotifyPart2=",event.addressTypeNick);
  this.NotifyPart2=event.addressTypeNick;
  form.controls['NotifyPart2'].setValue(this.NotifyPart2);

}
onForwarder(form,event){
  
  console.log("Forwarder=",event.addressTypeNick);
  this.Forwarder=event.addressTypeNick;
  form.controls['Forwarder'].setValue(this.Forwarder);

}
onOriginAgent(form,event){
  // console.log("OriginAgent=",event.addressTypeNick);
  // this.address=event.addressTypeNick;
  console.log("OriginAgent=",event.addressTypeNick);
  this.OriginAgent=event.addressTypeNick;
  form.controls['OriginAgent'].setValue(this.OriginAgent);

}
onDestinationAgent(form,event){
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
         "notifyParty1": this.NotifyPart1,
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

   this.httpclient.put(`${this.apiConfig.apiBaseUrl}/api/Opportunity/Post/${this.OObj.opportunityId}`, JSON.stringify(this.OObj), this.headers).subscribe(res => {
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
        // "shipper": this.shipper,
        "consigneeId":form.value.customerId,
        "consigneeAddressId": form.value.consigneeAddressId,
         "consignee": form.value.consignee,
        // "consignee": this.consignee,
        "notifyParty1Id":form.value.customerId,
        "notifyParty1AddressId": form.value.notifyParty1AddressId,
         "notifyParty1": form.value.notifyParty1,
        // "notifyParty1": this.NotifyPart1,
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
// this.resetForm(form);


// if(this.OEObj.cargoId>0){
//   console.log("UPDATE");
//    this.UpdateCompany(this.CompanyForm)
//     this.success();

//     console.log(this.OObj.opportunityId);
//     console.log(this.OEObj.cargoId);
// }
// else{
//   // console.log('!!!!!!!!!',this.hero);
//   if(this.OObj.opportunityId==undefined) 
//  { console.log("INSERT");
//   this.addCompany(this.CompanyForm);
// this.success();
// console.log(this.OObj.opportunityId);
// }
// }



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
