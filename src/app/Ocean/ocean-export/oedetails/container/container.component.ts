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
import { Container } from './Container';
import { threadId } from 'worker_threads';
import { AppConfigService } from 'app/services/app-config.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  @Input() hero;
  @Input() myObj;
  @Input() cargoid;
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
  Container: any;
  
  containerCode:any;
  ContainerObj: Container=new Container();

  containerTypeId: any;
  packageTypeId: any;
  packageTypeName: any;
  packageTypeShortName: any;
  packageCode: any;
  isContainer: any;
  containerIsocode: any;
  defaultLength: any;
  defaultHeight: any;
  defaultWidth: any;
  dimensionsUnitId: any;
  weight: any;
  maxWeight: any;
  weightUnitId: any;
  isOcean: any;
  isAir: any;
  isSurface: any;
  isActive: any;
  createdBy: any;
  dateCreated: any;
  modifiedBy: any;
  dateModified: any;
  deletedBy: any;
  dateDeleted: any;
  isDeleted: any;


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

      containerId:0,
      containerCode:[''],
      containerTypeId:0,
      cargoId:0,
      containerNumber:[''],
      seal1:[''],
      seal2:[''],
      vgmweight:[''],
      description:[''],
      dateCreated:['']
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

      containerId:0,
      containerCode:[''],
      containerTypeId:0,
      cargoId:0,
      containerNumber:[''],
      seal1:[''],
      seal2:[''],
      vgmweight:[''],
      description:[''],
      dateCreated:['']
    });

 }
onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  ngOnInit(): void {
    this.getContainer();
    
// alert(this.companydataurlid);
// console.log("CargoID",this.myObj.cargoId);
    // alert(id)
    
    //  this.getDataTableRows(id);
     this.today =new Date();
    this.hero;
   JSON.stringify(this.myObj);
    console.log('this.hero',this.hero);
    console.log('this.myObj',this.myObj);
   
    this.companydataurlid = Number(this.route.snapshot.paramMap.get('id'));
    // alert(this.cargoid)
    this.getDataTableRows(this.cargoid);
    this.getDataTableRows(this.companydataurlid);
    console.log("************my id**",this.companydataurlid);
   if(this.companydataurlid)
    {
    this.add(this.companydataurlid);
      console.log("companydataurlid",this.companydataurlid)
   }


  }
  getContainer(){
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/PackageType/Container`).subscribe((response: any) => {
        console.log("Container",response);
        this.Container=response;
      })
  }
  onContainer(event){
    console.log("packageGroupId OR containerTypeId",event.packageGroupId);
    
   this.containerTypeId=event.packageGroupId;
   this.packageTypeId=event.packageTypeId;
   this.packageTypeName=event.packageTypeName;
   this.packageTypeShortName=event.packageTypeShortName;
   this.packageCode=event.packageCode;
   this.isContainer=event.isContainer;
   this.containerIsocode=event.containerIsocode;
   this.defaultLength=event.defaultLength;
   this.defaultWidth=event.defaultWidth;
   this.defaultHeight=event.defaultHeight;
   this.dimensionsUnitId=event.dimensionsUnitId;
  this.weight=event.weight;
  this.maxWeight=event.maxWeight;
  this.weightUnitId=event.weightUnitId;
  this.isOcean=event.isOcean;
  this.isAir=event.isAir;
  this.isSurface=event.isSurface;
  this.isActive=event.isActive;
  this.createdBy=event.createdBy;
  this.dateCreated=event.dateCreated;
  this.modifiedBy=event.modifiedBy;
  this.dateModified=event.dateModified;
  this.deletedBy=event.deletedBy;
  this.dateDeleted=event.dateDeleted;
  this.isDeleted=event.isDeleted;

  console.log(event);
  }
  


  getDataTableRows(id): Promise<any[]> {
    return new Promise((resolve, reject) => {

      this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/CargoContainer/GetContainerByCargoID?id=${id}`).subscribe((response: any) => {
        console.log('get Containers', response);
        this.rows = response;
        this.tempData = this.rows;
        this.kitchenSinkRows = this.rows;
        resolve(this.rows);
      }, reject);
    });
  }


  populateForm(rowData, modalForm) {
    size: 'lg'
    // alert(JSON.stringify(rowData.country));
  
    console.log(rowData);
    
console.log(this.containerCode);
    this.containerCode=rowData.containerCode; // assign container to row
    this.modalService.open(modalForm, {windowClass: 'modalForm', size:'lg'});
    this.ContainerForm.patchValue({
      containerId:rowData.containerId,
      containerTypeId:rowData.containerTypeId,
      cargoId:rowData.cargoId,
      containerCode:rowData.containerCode,
      containerNumber:rowData.containerNumber,
      seal1:rowData.seal1,
      seal2:rowData.seal2,
      vgmweight:rowData.vgmweight,
      description:rowData.description,
      createdBy:rowData.createdBy,
      dateCreated:rowData.dateCreated,
      modifiedBy:rowData.modifiedBy,
      dateModified:rowData.dateModified,
      deletedBy:rowData.deletedBy,
      dateDeleted:rowData.dateDeleted,
      isDeleted:rowData.isDeleted,
      cargo:rowData.cargo,
      containerType: rowData.containerType
   

    });
    console.log('this.ContainerForm.value PATCH VALUE',this.ContainerForm.value);
  }
  add(form: FormGroup)
  {
  if(this.companydataurlid){
    // console.log(form.value.companyAddressId);
    console.log(this.companydataurlid);
    this.getDataTableRows(this.companydataurlid)
    // this.getDataTableRows(this.cargoid);
    
// console.log(this.containerCode);
console.log(form.value);    

console.log(form.value.containerCode);    
this.ContainerObj={
      
        containerId: 0,
        containerTypeId: this.packageTypeId,
        cargoId:this.companydataurlid,
        containerCode: form.value.containerCode,
        containerNumber: form.value.containerNumber,
        seal1: form.value.seal1,
        seal2: form.value.seal2,
        description: form.value.description,
        createdBy: 0,
        dateCreated:new Date().toISOString(),
        modifiedBy: 0,
        dateModified: new Date().toISOString(),
        deletedBy: 0,
        dateDeleted: "",
        isDeleted: false,
        vgmweight: 0,
        cargo: {
          cargoId: this.companydataurlid ,
          cargoNumber: this.myObj.cargoNumber,
          jobNo: this.myObj.jobNo,
          masterNo: this.myObj.masterNo,
          houseNo: this.myObj.houseNo,
          modeOfTransport: this.myObj.modeOfTransport,
          transportDirection:this.myObj.transportDirection,
          isConsolidation: this.myObj.isConsolidation,
          incoTermId: this.myObj.incoTermId,
          typeOfMoveId: this.myObj.typeOfMoveId,
          pickupAddressId: this.myObj.pickupAddressId,
          deliveryAddressId: this.myObj.deliveryAddressId,
          opportunityId: this.myObj.opportunityId,
          customerReference: this.myObj.customerReference,
          polid: this.myObj.polid,
          pol: this.myObj.pol,
          podid: this.myObj.polid,
          pod: this.myObj.pod,
          etd:  this.myObj.etd,
          eta: this.myObj.eta,
          shipperId:  this.myObj.shipperId,
          shipperAddressId:  this.myObj.shipperAddressId,
          shipper:  this.myObj.shipper,
          consigneeId:  this.myObj.consigneeId,
          consigneeAddressId:  this.myObj.consigneeAddressId,
          consignee:  this.myObj.consignee,
          notifyParty1Id: this.myObj.notifyParty1Id,
          notifyParty1AddressId:  this.myObj.notifyParty1AddressId,
          notifyParty1:  this.myObj.notifyParty1,
          notifyParty2Id:  this.myObj.notifyParty2Id,
          notifyParty2AddressId: this.myObj.notifyParty2AddressId,
          forwarderId: this.myObj.forwarderId,
          forwardedAddressId:  this.myObj.forwardedAddressId,
          originAgentId:  this.myObj.originAgentId,
          originAgentAddressId: this.myObj.originAgentAddressId,
          destinationAgentId:  this.myObj.destinationAgentId,
          destinationAgentAddressId:  this.myObj.destinationAgentAddressId,
          notes: this.myObj.notes,
          createdBy: this.myObj.createdBy,
          dateCreated: this.myObj.dateCreated,
          modifiedBy:this.myObj.modifiedBy,
          dateModified: this.myObj.dateModified,
          deletedBy:this.myObj.deletedBy,
          dateDeleted: this.myObj.dateDeleted,
          isDeleted: this.myObj.isDeleted,
          customerId: this.myObj.customerId,
          cargoApprovalStatus: this.myObj.cargoApprovalStatus,
          cargoSopapprovalStatus:this.myObj.cargoSopapprovalStatus,
          officeId:this.myObj.officeId,
          freightStatus: this.myObj.freightStatus,
          paymentTerms: this.myObj.paymentTerms,
          invoicingParty:this.myObj.invoicingParty,
          jobType: this.myObj.jobType,
          isHblnoautogenerate: this.myObj.isHblnoautogenerate,
          salesQuoteId:this.myObj.salesQuoteId,
          isLocked:this.myObj.isLocked,
          lockedBy:this.myObj.lockedBy,
          lockedDate:this.myObj.lockedDate,
          hblTerm: this.myObj.hblTerm,
          mblTerm:this.myObj.mblTerm,
          hblStatus:this.myObj.hblStatus,
          mblStatus: this.myObj.mblStatus,
          freeDays: this.myObj.freeDays,
          por: this.myObj.por,
          isGstJob: this.myObj.isGstJob
        },
        containerType: {
          packageTypeId:this.packageTypeId,
          packageGroupId: this.containerTypeId,
          packageTypeName: this.packageTypeName,
          packageTypeShortName: this.packageTypeShortName,
          packageCode: this.packageCode,
          isContainer: this.isContainer,
          containerIsocode:this.containerIsocode,
          defaultLength: this.defaultLength,
          defaultWidth: this.defaultWidth,
          defaultHeight: this.defaultHeight,
          dimensionsUnitId: this.dimensionsUnitId,
          weight: this.weight,
          maxWeight: this.maxWeight,
          weightUnitId: this.weightUnitId,
          isOcean: this.isOcean,
          isAir: this.isAir,
          isSurface: this.isSurface,
          isActive: this.isActive,
          createdBy: this.createdBy,
          dateCreated: this.dateCreated,
          modifiedBy: this.modifiedBy,
          dateModified: this.dateModified,
          deletedBy: this.deletedBy,
          dateDeleted: this.dateDeleted,
          isDeleted: this.isDeleted,
          packageGroup: {
            packageGroupId: 1,
            packageGroupName: "Container",
            isActive: this.isActive
          }
        
      }
    }



    console.log('this.ContainerObj',this.ContainerObj);

  this.httpclient.post(`${this.apiConfig.apiBaseUrl}/api/CargoContainer/Post`, JSON.stringify(this.ContainerObj), this.headers).subscribe(res => {
    console.log('Success');
    console.log(res);
    // this.resetForm(form);
    this.getDataTableRows(this.companydataurlid);
    Swal.fire({
      title: 'Container Added'
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
    // this.ContainerObj=
    // {
    //   "containerId": 0,
    //   "containerTypeId": 0,
    //   "cargoId": Number(this.hero),
    //   "containerCode": form.value.containerCode,
    //   "containerNumber":form.value.containerNumber,
    //   "seal1": form.value.seal1,
    //   "seal2": form.value.seal2,
    //   "description": form.value.description,
    //   "createdBy": 0,
    //   "dateCreated": new Date().toISOString(),
    //   "modifiedBy": "",
    //   "dateModified": "",
    //   "deletedBy": "",
    //   "dateDeleted": "",
    //   "isDeleted": false,
    //   "vgmweight": "",
    //   "cargo": "",
    //   "cargoPackages": [],
    //   "containerType": ""
    // }
    console.log('this.ContainerObj',this.ContainerObj);

  this.httpclient.post(`${this.apiConfig.apiBaseUrl}/api/CargoContainer/Post`, JSON.stringify(this.ContainerObj), this.headers).subscribe(res => {
    console.log('Success');
    console.log(res);
    // this.resetForm(form);
    this.getDataTableRows(this.companydataurlid);
    Swal.fire({
      title: 'Container Added'
    })

  }, err =>{
    console.log('Error');
    console.log(err);
    Swal.fire({
      title: 'Something Went Wrong'
    })
  });
  }
  }

  Update(form: FormGroup){

console.log("Form.value",form.value)

console.log(this.containerCode);
console.log(form.value.containerCode);console.log(form.value.containerCode);

this.ContainerObj={
      
  containerId: 0,
  containerTypeId: this.containerTypeId,
  cargoId:this.companydataurlid,
  containerCode: form.value.containerCode,
  containerNumber: form.value.containerNumber,
  seal1: form.value.seal1,
  seal2: form.value.seal2,
  description: form.value.description,
  createdBy: 0,
  dateCreated: "2023-05-16T04:55:47.523Z",
  modifiedBy: 0,
  dateModified: "2023-05-16T04:55:47.523Z",
  deletedBy: 0,
  dateDeleted: "2023-05-16T04:55:47.523Z",
  isDeleted: true,
  vgmweight: 0,
  cargo: {
    cargoId: this.companydataurlid ,
    cargoNumber: this.myObj.cargoNumber,
    jobNo: this.myObj.jobNo,
    masterNo: this.myObj.masterNo,
    houseNo: this.myObj.houseNo,
    modeOfTransport: this.myObj.modeOfTransport,
    transportDirection:this.myObj.transportDirection,
    isConsolidation: this.myObj.isConsolidation,
    incoTermId: this.myObj.incoTermId,
    typeOfMoveId: this.myObj.typeOfMoveId,
    pickupAddressId: this.myObj.pickupAddressId,
    deliveryAddressId: this.myObj.deliveryAddressId,
    opportunityId: this.myObj.opportunityId,
    customerReference: this.myObj.customerReference,
    polid: this.myObj.polid,
    pol: this.myObj.pol,
    podid: this.myObj.polid,
    pod: this.myObj.pod,
    etd:  this.myObj.etd,
    eta: this.myObj.eta,
    shipperId:  this.myObj.shipperId,
    shipperAddressId:  this.myObj.shipperAddressId,
    shipper:  this.myObj.shipper,
    consigneeId:  this.myObj.consigneeId,
    consigneeAddressId:  this.myObj.consigneeAddressId,
    consignee:  this.myObj.consignee,
    notifyParty1Id: this.myObj.notifyParty1Id,
    notifyParty1AddressId:  this.myObj.notifyParty1AddressId,
    notifyParty1:  this.myObj.notifyParty1,
    notifyParty2Id:  this.myObj.notifyParty2Id,
    notifyParty2AddressId: this.myObj.notifyParty2AddressId,
    forwarderId: this.myObj.forwarderId,
    forwardedAddressId:  this.myObj.forwardedAddressId,
    originAgentId:  this.myObj.originAgentId,
    originAgentAddressId: this.myObj.originAgentAddressId,
    destinationAgentId:  this.myObj.destinationAgentId,
    destinationAgentAddressId:  this.myObj.destinationAgentAddressId,
    notes: this.myObj.notes,
    createdBy: this.myObj.createdBy,
    dateCreated: this.myObj.dateCreated,
    modifiedBy:this.myObj.modifiedBy,
    dateModified: this.myObj.dateModified,
    deletedBy:this.myObj.deletedBy,
    dateDeleted: this.myObj.dateDeleted,
    isDeleted: this.myObj.isDeleted,
    customerId: this.myObj.customerId,
    cargoApprovalStatus: this.myObj.cargoApprovalStatus,
    cargoSopapprovalStatus:this.myObj.cargoSopapprovalStatus,
    officeId:this.myObj.officeId,
    freightStatus: this.myObj.freightStatus,
    paymentTerms: this.myObj.paymentTerms,
    invoicingParty:this.myObj.invoicingParty,
    jobType: this.myObj.jobType,
    isHblnoautogenerate: this.myObj.isHblnoautogenerate,
    salesQuoteId:this.myObj.salesQuoteId,
    isLocked:this.myObj.isLocked,
    lockedBy:this.myObj.lockedBy,
    lockedDate:this.myObj.lockedDate,
    hblTerm: this.myObj.hblTerm,
    mblTerm:this.myObj.mblTerm,
    hblStatus:this.myObj.hblStatus,
    mblStatus: this.myObj.mblStatus,
    freeDays: this.myObj.freeDays,
    por: this.myObj.por,
    isGstJob: this.myObj.isGstJob
  },
  containerType: {
    packageTypeId:this.packageTypeId,
    packageGroupId: this.containerTypeId,
    packageTypeName: this.packageTypeName,
    packageTypeShortName: this.packageTypeShortName,
    packageCode: this.packageCode,
    isContainer: this.isContainer,
    containerIsocode:this.containerIsocode,
    defaultLength: this.defaultLength,
    defaultWidth: this.defaultWidth,
    defaultHeight: this.defaultHeight,
    dimensionsUnitId: this.dimensionsUnitId,
    weight: this.weight,
    maxWeight: this.maxWeight,
    weightUnitId: this.weightUnitId,
    isOcean: this.isOcean,
    isAir: this.isAir,
    isSurface: this.isSurface,
    isActive: this.isActive,
    createdBy: this.createdBy,
    dateCreated: this.dateCreated,
    modifiedBy: this.modifiedBy,
    dateModified: this.dateModified,
    deletedBy: this.deletedBy,
    dateDeleted: this.dateDeleted,
    isDeleted: this.isDeleted,
    packageGroup: {
      packageGroupId: 1,
      packageGroupName: "Container",
      isActive: this.isActive
    }
  
}
}

console.log(JSON.stringify(this.ContainerObj));

this.httpclient.put(`${this.apiConfig.apiBaseUrl}/api/CargoContainer/${this.ContainerObj.containerId}`, JSON.stringify(this.ContainerObj), this.headers).subscribe(res => {
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
console.log("cargoid",this.myObj.cargoId)
    
console.log(this.containerCode);
console.log(form.value.containerCode);
    console.log("ContainerFormValue",this.ContainerForm.value);
    console.log("Container Obj", this.ContainerObj);
    this.ContainerObj=this.ContainerForm.value;
    console.log("companydataurlid",this.companydataurlid);
    

    console.log("ContainerFormValue",this.ContainerForm.value);
    console.log("Container Obj", this.ContainerObj);
   
    if(this.ContainerObj.containerId==0){
      console.log("INSERT");
      this.add(this.ContainerForm);
       this.getDataTableRows(this.companydataurlid);
      // this.getDataTableRows(this.myObj.cargoId);
   

    //   this.ContainerObj={
        
    //       containerId: 0,
    //       containerTypeId: this.packageTypeId,
    //       cargoId:this.myObj.cargoId,
    //       containerCode: form.value.containerCode,
    //       containerNumber: form.value.containerNumber,
    //       seal1: form.value.seal1,
    //       seal2: form.value.seal2,
    //       description: form.value.description,
    //       createdBy: 0,
    //       dateCreated: "2023-05-16T04:55:47.523Z",
    //       modifiedBy: 0,
    //       dateModified: "2023-05-16T04:55:47.523Z",
    //       deletedBy: 0,
    //       dateDeleted: "2023-05-16T04:55:47.523Z",
    //       isDeleted: true,
    //       vgmweight: 0,
    //       cargo: {
    //         cargoId: this.myObj.cargoId,
    //         cargoNumber: this.myObj.cargoNumber,
    //         jobNo: this.myObj.jobNo,
    //         masterNo: this.myObj.masterNo,
    //         houseNo: this.myObj.houseNo,
    //         modeOfTransport: this.myObj.modeOfTransport,
    //         transportDirection:this.myObj.transportDirection,
    //         isConsolidation: this.myObj.isConsolidation,
    //         incoTermId: this.myObj.incoTermId,
    //         typeOfMoveId: this.myObj.typeOfMoveId,
    //         pickupAddressId: this.myObj.pickupAddressId,
    //         deliveryAddressId: this.myObj.deliveryAddressId,
    //         opportunityId: this.myObj.opportunityId,
    //         customerReference: this.myObj.customerReference,
    //         polid: this.myObj.polid,
    //         pol: this.myObj.pol,
    //         podid: this.myObj.polid,
    //         pod: this.myObj.pod,
    //         etd:  this.myObj.etd,
    //         eta: this.myObj.eta,
    //         shipperId:  this.myObj.shipperId,
    //         shipperAddressId:  this.myObj.shipperAddressId,
    //         shipper:  this.myObj.shipper,
    //         consigneeId:  this.myObj.consigneeId,
    //         consigneeAddressId:  this.myObj.consigneeAddressId,
    //         consignee:  this.myObj.consignee,
    //         notifyParty1Id: this.myObj.notifyParty1Id,
    //         notifyParty1AddressId:  this.myObj.notifyParty1AddressId,
    //         notifyParty1:  this.myObj.notifyParty1,
    //         notifyParty2Id:  this.myObj.notifyParty2Id,
    //         notifyParty2AddressId: this.myObj.notifyParty2AddressId,
    //         forwarderId: this.myObj.forwarderId,
    //         forwardedAddressId:  this.myObj.forwardedAddressId,
    //         originAgentId:  this.myObj.originAgentId,
    //         originAgentAddressId: this.myObj.originAgentAddressId,
    //         destinationAgentId:  this.myObj.destinationAgentId,
    //         destinationAgentAddressId:  this.myObj.destinationAgentAddressId,
    //         notes: this.myObj.notes,
    //         createdBy: this.myObj.createdBy,
    //         dateCreated: this.myObj.dateCreated,
    //         modifiedBy:this.myObj.modifiedBy,
    //         dateModified: this.myObj.dateModified,
    //         deletedBy:this.myObj.deletedBy,
    //         dateDeleted: this.myObj.dateDeleted,
    //         isDeleted: this.myObj.isDeleted,
    //         customerId: this.myObj.customerId,
    //         cargoApprovalStatus: this.myObj.cargoApprovalStatus,
    //         cargoSopapprovalStatus:this.myObj.cargoSopapprovalStatus,
    //         officeId:this.myObj.officeId,
    //         freightStatus: this.myObj.freightStatus,
    //         paymentTerms: this.myObj.paymentTerms,
    //         invoicingParty:this.myObj.invoicingParty,
    //         jobType: this.myObj.jobType,
    //         isHblnoautogenerate: this.myObj.isHblnoautogenerate,
    //         salesQuoteId:this.myObj.salesQuoteId,
    //         isLocked:this.myObj.isLocked,
    //         lockedBy:this.myObj.lockedBy,
    //         lockedDate:this.myObj.lockedDate,
    //         hblTerm: this.myObj.hblTerm,
    //         mblTerm:this.myObj.mblTerm,
    //         hblStatus:this.myObj.hblStatus,
    //         mblStatus: this.myObj.mblStatus,
    //         freeDays: this.myObj.freeDays,
    //         por: this.myObj.por,
    //         isGstJob: this.myObj.isGstJob
    //       },
    //       containerType: {
    //         packageTypeId:this.packageTypeId,
    //         packageGroupId: this.containerTypeId,
    //         packageTypeName: this.packageTypeName,
    //         packageTypeShortName: this.packageTypeShortName,
    //         packageCode: this.packageCode,
    //         isContainer: this.isContainer,
    //         containerIsocode:this.containerIsocode,
    //         defaultLength: this.defaultLength,
    //         defaultWidth: this.defaultWidth,
    //         defaultHeight: this.defaultHeight,
    //         dimensionsUnitId: this.dimensionsUnitId,
    //         weight: this.weight,
    //         maxWeight: this.maxWeight,
    //         weightUnitId: this.weightUnitId,
    //         isOcean: this.isOcean,
    //         isAir: this.isAir,
    //         isSurface: this.isSurface,
    //         isActive: this.isActive,
    //         createdBy: this.createdBy,
    //         dateCreated: this.dateCreated,
    //         modifiedBy: this.modifiedBy,
    //         dateModified: this.dateModified,
    //         deletedBy: this.deletedBy,
    //         dateDeleted: this.dateDeleted,
    //         isDeleted: this.isDeleted,
    //         packageGroup: {
    //           packageGroupId: 1,
    //           packageGroupName: "Container",
    //           isActive: this.isActive
    //         }
          
    //     }
    //   }
  
  
  
    //   console.log('this.ContainerObj',this.ContainerObj);
  
    // this.httpclient.post('${this.apiConfig.apiBaseUrl}/api/CargoContainer/Post', JSON.stringify(this.ContainerObj), this.headers).subscribe(res => {
    //   console.log('Success');
    //   console.log(res);
    //   // this.resetForm(form);
    //   this.getDataTableRows(this.companydataurlid);
    //   Swal.fire({
    //     title: 'Container Added'
    //   })
    // }, err =>{
    //   console.log('Error');
    //   console.log(err);
    //   Swal.fire({
    //     title: 'Something Went Wrong'
    //   })
    // });
    }
    else
  
    {
    //  this.ContainerForm.reset();
      console.log("UPDATE");
     this.Update(this.ContainerForm)
  
      console.log(this.ContainerObj.containerId);
    }
    // this.resetForm(form);
  
    this.modalService.dismissAll();
    // this.country=""
    // this.changeLocation;
}
}



