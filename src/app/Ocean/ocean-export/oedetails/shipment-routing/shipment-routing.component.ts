import { Component, Input, OnInit ,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as snippet from 'app/companies/datatables.snippetcode';
import { ColumnMode,DatatableComponent,id, SelectionType } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import { from, Observable, Subject, Subscription, timer } from 'rxjs';
import { clear } from 'console';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { startWith, switchMap } from 'rxjs/operators';
import { Shipment } from './Shipment';
import { AppConfigService } from 'app/services/app-config.service';

@Component({
  selector: 'app-shipment-routing',
  templateUrl: './shipment-routing.component.html',
  styleUrls: ['./shipment-routing.component.scss']
})
export class ShipmentRoutingComponent implements OnInit {
  @Input() hero;
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
  pol:any;
  GetPOL:any;
  GetPOD:any;
  pod:any;
  GetOceanLiner:any;
  oceanLiner:any;
  GetCarrierAgent:any;
  CarrierAgent:any;
  GetVessel:any;
  Vessel:any;
  GetFlag:any;
  Flag:any;
  shipmentObj: Shipment=new Shipment();

  
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
//  filterUpdate(event) {
//   const val = event.target.value.toLowerCase();

//   // filter our data
//   const temp = this.tempData.filter(function (d) {
//    // console.log(d.formattedAddress);
//     return d.addressTypeNick.toLowerCase().indexOf(val) !== -1 || !val;
//   });

//   // update the rows
//   this.kitchenSinkRows = temp;
//   // Whenever the filter changes, always go back to the first page
//   // this.table.offset = 0;
// }
headers = {
headers: new HttpHeaders({
'Content-Type': 'application/json'
})
};



modalOpenForm(modalForm) {
size:'lg'
// alert(this.country);
// this.modalService.open(modalForm);
this.ContainerForm = this.fb.group({

  polid:0,
  podid:0,
  etd:[''],
  eta:[''],
  loadingTerminalName:[''],
  unloadingTerminalName:[''],
  oceanCarrierId:0,
  containerAgentId:0,
  vesselId:0,
  vesselFlagId:0,
  builtYear:[''],
  llyodsCode:[''],
  voyageNumber:[''],
  documentCutoffDate:[''],
  gatesClosingDate:[''],
  loadingDate:[''],
  blinstructionCutoff:[''],
  imonumber:[''],
  bookingNumber:[''],
  bookingDate:[''],
  inttrarefNo:['']
});

this.openModal(modalForm)

}

openModal(targetModal) {
// alert(this.country);
this.modalService.open(targetModal, {
centered: true,
backdrop: 'static',
size: 'lg'
});
}



constructor( private httpclient: HttpClient, private fb: FormBuilder, private modalService: NgbModal, public datepipe:DatePipe,private route:ActivatedRoute,private apiConfig:AppConfigService) {
this.ContainerForm = this.fb.group({
  polid:0,
  podid:0,
  etd:[''],
  eta:[''],
  loadingTerminalName:[''],
  unloadingTerminalName:[''],
  oceanCarrierId:0,
  containerAgentId:0,
  vesselId:0,
  vesselFlagId:0,
  builtYear:[''],
  llyodsCode:[''],
  voyageNumber:[''],
  documentCutoffDate:[''],
  gatesClosingDate:[''],
  loadingDate:[''],
  blinstructionCutoff:[''],
  imonumber:[''],
  bookingNumber:[''],
  bookingDate:[''],
  inttrarefNo:['']
});

}
onSelect({ selected }) {
console.log('Select Event', selected, this.selected);

this.selected.splice(0, this.selected.length);
this.selected.push(...selected);
}

  ngOnInit(): void {
    this.getpol();
    this.getpod();
    this.getOceanLiner();
    this.getCarrierAgent();
    this.getVessel();
    this.  getFlag();

    this.today =new Date();
    this.hero;
    console.log('this.hero',this.hero);
    this.companydataurlid = Number(this.route.snapshot.paramMap.get('id'));
       this.getDataTableRows(this.companydataurlid);
    console.log(this.companydataurlid);
  //  if(this.companydataurlid)
  //  {
  // this.add(this.companydataurlid);
  //   console.log("companydataurlid",this.companydataurlid)
  //  }
  }



  getDataTableRows(id): Promise<any[]> {
    return new Promise((resolve, reject) => {

      this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/OceanShipmentRouting/GetOceanShipmentRoutingsbyCargoId?id=${id}`).subscribe((response: any) => {
        console.log('get Containers', response);
        this.rows = response;
        this.tempData = this.rows;
        this.kitchenSinkRows = this.rows;
        resolve(this.rows);
      }, reject);
    });
  }

  getpol(){ 
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/LocationMaster`).subscribe((response: any) => {
        console.log("POL",response);
        this.GetPOL=response;
    })
  }
  onpol(event){
    console.log("POL=",event.locationShortName);
    this.pol=event.locationShortName;
  }
  getpod(){ 
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/LocationMaster`).subscribe((response: any) => {
        console.log("POD",response);
        this.GetPOD=response;
    })
  }
  onpod(event){
    console.log("POD=",event.locationShortName);
    this.pod=event.locationShortName;
  }

  getOceanLiner(){ 
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/OceanLineMaster`).subscribe((response: any) => {
        console.log("GetOceanLiner",response);
        this.GetOceanLiner=response;
    })
  }
  onOceanLiner(event){
    console.log("OceanLiner=",event.lineCallSign);
    this.oceanLiner=event.lineCallSign;
  }

  getCarrierAgent(){ 
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/Cmp/Carrier`).subscribe((response: any) => {
        console.log("CarrierAgent",response);
        this.GetCarrierAgent=response;
    })
  }
  onCarrierAgent(event){
    console.log("CarrierAgent=",event.companyName);
    this.CarrierAgent=event.companyName;
  }

  getVessel(){ 
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/VesselMaster`).subscribe((response: any) => {
        console.log("Vessel",response);
        this.GetVessel=response;
    })
  }
  onVessel(event){
    console.log("Vessel=",event.vesselName);
    this.Vessel=event.vesselName;
  }

  getFlag(){ 
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/Counry`).subscribe((response: any) => {
        console.log("GetFlag",response);
        this.GetFlag=response;
    })
  }
  onFlag(event){
    console.log("Flag=",event.countryName);
    this.Flag=event.countryName;
  }

  populateForm(rowData, modalForm) {
    size: 'lg'
    // alert(JSON.stringify(rowData.country));
  
    console.log(rowData);

    this.pol=rowData.pol; // assign pol to row
    this.pod=rowData.pod;
    this.oceanLiner=rowData.oceanLiner;
    this.CarrierAgent=rowData.CarrierAgent;
    this.Vessel=rowData.Vessel;


    this.modalService.open(modalForm, {windowClass: 'modalForm', size:'lg'});
    this.ContainerForm.patchValue({
      polid:rowData.polid,
  podid:rowData.podid,
  etd:rowData.etd,
  eta:rowData.eta,
  loadingTerminalName:rowData.loadingTerminalName,
  unloadingTerminalName:rowData.unloadingTerminalName,
  oceanCarrierId:rowData.oceanCarrierId,
  containerAgentId:rowData.containerAgentId,
  vesselId:rowData.vesselId,
  vesselFlagId:rowData.vesselFlagId,
  builtYear:rowData.builtYear,
  llyodsCode:rowData.llyodsCode,
  voyageNumber:rowData.voyageNumber,
  documentCutoffDate:rowData.documentCutoffDate,
  gatesClosingDate:rowData.gatesClosingDate,
  loadingDate:rowData.loadingDate,
  blinstructionCutoff:rowData.blinstructionCutoff,
  imonumber:rowData.imonumber,
  bookingNumber:rowData.bookingNumber,
  bookingDate:rowData.bookingDate,
  inttrarefNo:rowData.inttrarefNo

    });
    console.log('this.ContainerForm.value PATCH VALUE',this.ContainerForm.value);
  }

  add(form: FormGroup){
  if(this.companydataurlid){
    // console.log(form.value.oceanRoutingId);
    console.log(this.companydataurlid);
    this.getDataTableRows(this.companydataurlid);
    this.shipmentObj={

      "oceanRoutingId": 0,
      "shipmentId":this.companydataurlid,
      "legNumber": 0,
      "polid":form.value.polid,
      "pol":this.pol,
      "podid":form.value.podid,
      "pod": this.pod,
      "etd": form.value.etd,
      "atd": "",
      "eta": form.value.eta,
      "ata": "",
      "loadingTerminalId": 0,
      "loadingTerminalName": form.value.loadingTerminalName,
      "unloadingTerminalId": 0,
      "unloadingTerminalName": form.value.unloadingTerminalName,
      "oceanCarrierId": 0,
      "oceanCarrierName": "",
      "containerAgentId":form.value.containerAgentId,
      "vesselId":form.value.vesselId,
      "vesselName": this.Vessel,
      "vesselFlagId":form.value.vesselFlagId,
      "vesselFlagName": this.Flag,
      "llyodsCode": form.value.llyodsCode,
      "voyageNumber": form.value.voyageNumber,
      "imonumber": form.value.imonumber,
      "documentCutoffDate": form.value.documentCutoffDate,
      "gatesClosingDate": form.value.gatesClosingDate,
      "isPot1": true,
      "pot1id": 0,
      "pot1": "",
      "isPot2": true,
      "pot2id": 0,
      "pot2": "",
      "bookingNumber": form.value.bookingNumber,
      "bookingDate": form.value.bookingDate,
      "inttrarefNo": form.value.inttrarefNo,
      "createdBy": 0,
      "dateCreated":new Date().toISOString(),
      "modifiedBy": 0,
      "dateModified": new Date().toISOString(),
      "deletedBy": 0,
      "dateDeleted": "",
      "isDeleted": true,
      "builtYear": form.value.builtYear,
      "carrierAgentId": form.value.containerAgentId,
      "carrierAgent": this.CarrierAgent,
      "blinstructionCutoff": form.value.blinstructionCutoff,
      "loadingDate": form.value.loadingDate,
      "placeOfLoading": "",
      "placeOfFinalDestination": "",
      "transhipment1Eta": "",
      "transhipment1Etd": "",
      "transhipment1Vessel": "",
      "transhipment2Eta": "",
      "transhipment2Etd": "",
      "transhipment2Vessel": "",
      "arrivalNoticeTo": "",
      "bookingTo": "",
      "bookingLoadingPlace": "",
      "bookingTrucking": "",
      "bookingWarehousePickupDate": "",
      "bookingNotes": "",
      "bookingContainerCount": "",
      "bookingCommodity": "",
      "bookingPayableAt": "",
      "bookingOceanFreight": "",
      "bookingPortCharges": "",
      "bookingBlcost": "",
      "bookingTruckingCost": "",
      "bookingLcno": "",
      "bookingOrderNo": ""
    }

    console.log(this.shipmentObj)
    
    this.httpclient.post(`${this.apiConfig.apiBaseUrl}/api/OceanShipmentRouting`, JSON.stringify(this.shipmentObj), this.headers).subscribe(res => {
    console.log('Success Shipment Routing Added');
    console.log(res);
 
     Swal.fire({
      title: 'Shipment Routing Added'
    })
    }, err =>{
      console.log('Error');
      console.log(err);
      Swal.fire({
        title: 'Something Went Wrong'
      })
    });
 
  }
  if(this.hero){
      console.log(this.companydataurlid);
      console.log(this.hero);
      this.getDataTableRows(this.companydataurlid);
  }

}
Update(form: FormGroup){

console.log("Form.value",form.value)
this.shipmentObj={

  "oceanRoutingId":form.value.oceanRoutingId,
  "shipmentId":this.companydataurlid,
  "legNumber":0,
  "polid":form.value.polid,
  "pol":this.pol,
  "podid":form.value.podid,
  "pod": this.pod,
  "etd": form.value.etd,
  "atd": "",
  "eta": form.value.eta,
  "ata": "",
  "loadingTerminalId":form.value.loadingTerminalId,
  "loadingTerminalName": form.value.loadingTerminalName,
  "unloadingTerminalId":form.value.unloadingTerminalId,
  "unloadingTerminalName": form.value.unloadingTerminalName,
  "oceanCarrierId":form.value.oceanCarrierId,
  "oceanCarrierName": this.CarrierAgent,
  "containerAgentId":form.value.containerAgentId,
  "vesselId":form.value.vesselId,
  "vesselName": this.Vessel,
  "vesselFlagId":form.value.vesselFlagId,
  "vesselFlagName": this.Flag,
  "llyodsCode": form.value.llyodsCode,
  "voyageNumber": form.value.voyageNumber,
  "imonumber": form.value.imonumber,
  "documentCutoffDate": form.value.documentCutoffDate,
  "gatesClosingDate": form.value.gatesClosingDate,
  "isPot1": true,
  "pot1id":0,
  "pot1": "",
  "isPot2": true,
  "pot2id":0,
  "pot2": "",
  "bookingNumber": form.value.bookingNumber,
  "bookingDate": form.value.bookingDate,
  "inttrarefNo": form.value.inttrarefNo,
  "createdBy":0,
  "dateCreated":new Date().toISOString(),
  "modifiedBy":0,
  "dateModified": new Date().toISOString(),
  "deletedBy":0,
  "dateDeleted": "",
  "isDeleted": true,
  "builtYear": form.value.builtYear,
  "carrierAgentId":form.value.carrierAgentId,
  "carrierAgent":form.value.carrierAgent ,
  "blinstructionCutoff": form.value.blinstructionCutoff,
  "loadingDate": form.value.loadingDate,
  "placeOfLoading": "",
  "placeOfFinalDestination": "",
  "transhipment1Eta": "",
  "transhipment1Etd": "",
  "transhipment1Vessel": "",
  "transhipment2Eta": "",
  "transhipment2Etd": "",
  "transhipment2Vessel": "",
  "arrivalNoticeTo": "",
  "bookingTo": "",
  "bookingLoadingPlace": "",
  "bookingTrucking": "",
  "bookingWarehousePickupDate": "",
  "bookingNotes": "",
  "bookingContainerCount": "",
  "bookingCommodity": "",
  "bookingPayableAt": "",
  "bookingOceanFreight": "",
  "bookingPortCharges": "",
  "bookingBlcost": "",
  "bookingTruckingCost": "",
  "bookingLcno": "",
  "bookingOrderNo": ""
}

    console.log('this.shipmentObj');

    console.log(JSON.stringify(this.shipmentObj));
  
  
    this.httpclient.put(`${this.apiConfig.apiBaseUrl}/api/OceanShipmentRouting/${this.shipmentObj.oceanRoutingId}`, JSON.stringify(this.shipmentObj), this.headers).subscribe(res => {
      console.log(' Update Success');
      // this.resetForm(form);
      this.getDataTableRows(this.companydataurlid);
      console.log(res);
    }, err => {
      console.log('Error');
      console.log(err);
  
    });
}



  onSubmitService(form: FormGroup) {

    
    this.shipmentObj=this.ContainerForm.value;
    console.log("companydataurlid",this.companydataurlid);
    
    console.log("ContainerFormValue.oceanRoutingId",this.ContainerForm.value.oceanRoutingId);
    console.log("Container Obj.oceanRoutingId", this.shipmentObj.oceanRoutingId);

    console.log("ContainerFormValue",this.ContainerForm.value);
    console.log("Container Obj", this.shipmentObj);
   
    if(this.shipmentObj.oceanRoutingId==undefined){
      console.log("INSERT");
      this.add(this.ContainerForm);
    }
    // else
  
    // {
    // //  this.ContainerForm.reset();
    //   console.log("UPDATE");
    //  this.Update(this.ContainerForm)
  
    //   console.log(this.shipmentObj.oceanRoutingId);
    // }
    // // this.resetForm(form);
  
    // this.modalService.dismissAll();
    // // this.country=""
    // // this.changeLocation;
}
}
