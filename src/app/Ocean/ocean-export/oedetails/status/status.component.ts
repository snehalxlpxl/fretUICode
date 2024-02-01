import { Component, OnInit,Input, ViewChild } from '@angular/core';

import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
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
import { status } from './Status';
import { AppConfigService } from 'app/services/app-config.service';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  @Input() hero;
  formatdate = 'dd/MM/yyyy'; 
  myDate=new Date();
  today:Date; 
 companydataurlid: any;
  router: any;
  public selected = [];
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public SelectionType = SelectionType;
  tempData= [];
  rows: any;
  public ColumnMode = ColumnMode;
  StatusObj: status=new status();

  StatusForm: FormGroup;




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

onSelect({ selected }) {
  console.log('Select Event', selected, this.selected);

  this.selected.splice(0, this.selected.length);
  this.selected.push(...selected);
}

  constructor(private httpclient: HttpClient, private fb: FormBuilder, private modalService: NgbModal, public datepipe:DatePipe,private route:ActivatedRoute,private apiConfig:AppConfigService) { 
    // this.form = this.fb.group({
    //   rows: this.fb.array([
    //     this.getDataTableRows('cargoStatusDate'), // Example initial value
    //     this.getDataTableRows('statusRemarks'), // Example initial value
    //     // Add more initial values if needed
    //   ])
    // });
    this.StatusForm = this.fb.group({
    cargoStatusDate:[''],
    statusRemarks:[''],
    dateCreated:['']
    })
  }

  ngOnInit(): void {
    this.today =new Date();
    this.hero;
    console.log('this.hero',this.hero);

    this.companydataurlid = Number(this.route.snapshot.paramMap.get('id'));
      this.getDataTableRows(this.companydataurlid);
    console.log(this.companydataurlid);
  }

    getDataTableRows(id): Promise<any[]> {
    return new Promise((resolve, reject) => {

      this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/CargoStatus/GetStatusByCargoID?id=${id}`).subscribe((response: any) => {
        console.log('get Status', response);
        this.rows = response;
        this.tempData = this.rows;
        this.kitchenSinkRows = this.rows;
        resolve(this.rows);
      }, reject);
    });
  }

  populateForm(rowData, modalForm) {
   
    console.log(rowData);
    
// console.log(this.containerCode);
    // this.containerCode=rowData.containerCode; // assign container to row
    this.modalService.open(modalForm, {windowClass: 'modalForm'});
    this.StatusForm.patchValue({
     
      cargoStatusId:rowData.cargoStatusId,
      statusId:rowData.statusId,
      cargoId:rowData.cargoId,
      cargoStatusName:rowData.cargoStatusName,
      cargoStatusDate:rowData.cargoStatusDate,
      statusRemarks:rowData.statusRemarks,
      isExpected: rowData.isExpected,
      createdBy:rowData.createdBy,
      dateCreated:rowData.dateCreated,
      modifiedBy:rowData.modifiedBy,
      dateModifed:rowData.dateModifed,
      deletedBy:rowData.deletedBy,
      dateDeleted:rowData.dateDeleted,
      isDeleted: rowData.isDeleted,
      cargo:rowData.cargo,
      status: rowData.status
    })
    console.log('this.StatusForm.value PATCH VALUE',this.StatusForm.value);
  }


update(form: FormGroup)
  {
  if(this.companydataurlid){
    console.log(form.value);    

    console.log(this.companydataurlid);
    this.getDataTableRows(this.companydataurlid)

    this.StatusObj={

      cargoStatusId:form.value.cargoStatusId,
      statusId: form.value.statusId,
      cargoId: this.companydataurlid,
      cargoStatusName: form.value.cargoStatusName,
      cargoStatusDate:form.value.cargoStatusName,
      statusRemarks:form.value.statusRemarks,
      isExpected: form.value.isExpected,
      createdBy: form.value.createdBy,
      dateCreated: form.value.dateCreated,
      modifiedBy: form.value.modifiedBy,
      dateModifed:form.value.dateModifed,
      deletedBy: form.value.deletedBy,
      dateDeleted: form.value.dateDeleted,
      isDeleted: form.value.isDeleted,
      // cargo: {
      //   cargoId: this.companydataurlid,
      //   cargoNumber: string;
      //   jobNo: string;
      //   masterNo: string;
      //   houseNo: string;
      //   modeOfTransport: string;
      //   transportDirection: string;
      //   isConsolidation: boolean;
      //   incoTermId: number;
      //   typeOfMoveId: number;
      //   pickupAddressId: number;
      //   deliveryAddressId: number;
      //   opportunityId: number;
      //   customerReference: string;
      //   polid: number;
      //   pol: string;
      //   podid: number;
      //   pod: string;
      //   etd: string;
      //   eta: string;
      //   shipperId: number;
      //   shipperAddressId: number;
      //   shipper: string;
      //   consigneeId: number;
      //   consigneeAddressId: number;
      //   consignee: string;
      //   notifyParty1Id: number;
      //   notifyParty1AddressId: number;
      //   notifyParty1: string;
      //   notifyParty2Id: number;
      //   notifyParty2AddressId: number;
      //   forwarderId: number;
      //   forwardedAddressId: number;
      //   originAgentId: number;
      //   originAgentAddressId: number;
      //   destinationAgentId: number;
      //   destinationAgentAddressId: number;
      //   notes: string;
      //   createdBy: number;
      //   dateCreated: string;
      //   modifiedBy: number;
      //   dateModified: string;
      //   deletedBy: number;
      //   dateDeleted: string;
      //   isDeleted: boolean;
      //   customerId: number;
      //   cargoApprovalStatus: string;
      //   cargoSopapprovalStatus: string;
      //   officeId: number;
      //   freightStatus: string;
      //   paymentTerms: string;
      //   invoicingParty: string;
      //   jobType: number;
      //   isHblnoautogenerate: boolean;
      //   salesQuoteId: number;
      //   isLocked: boolean;
      //   lockedBy: number;
      //   lockedDate: string;
      //   hblTerm: string;
      //   mblTerm: string;
      //   hblStatus: string;
      //   mblStatus: string;
      //   freeDays: string;
      //   por: string;
      //   isGstJob: boolean
      // };
      // status: {
      //   statusId: number;
      //   statusServiceType: string;
      //   statusName: string;
      //   statusReferenceNumber: string;
      //   isSystemGenerated: boolean;
      //   statusStageNumber: number;
      //   stagePercentage: number;
      //   isWebTracking: boolean;
      //   isCompulsary: boolean;
      //   remindBefore: number;
      //   autoTaskTemplateId: number;
      //   relatedCargoDocumentId: number;
      //   transportDirection: string
      // }
  
    }



console.log(JSON.stringify(this.StatusObj));

this.httpclient.put(`http://localhost:5289/api/CargoStatus/${this.StatusObj.cargoStatusId}`, JSON.stringify(this.StatusObj), this.headers).subscribe(res => {
  console.log(' Update Success');
  // this.resetForm(form);
  this.getDataTableRows(this.companydataurlid);
  console.log(res);
}, err => {
  console.log('Error');
  console.log(err);

});

  }
}

onSubmitService(form: FormGroup) {
  this.update(this.StatusForm);
}

}
