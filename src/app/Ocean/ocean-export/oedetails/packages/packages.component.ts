import { Component, OnInit,Input, ViewChild } from '@angular/core';

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
import { packages } from './packages';
import { AppConfigService } from 'app/services/app-config.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {
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
  Package: any;
  Container:any;
  containerPackTypeId:any;

  containerCode: any;
  packageCode: any;

  packagesObj: packages = new packages();


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

     dateCreated:[''],
     containerPackTypeId:[''],
     packageCount:[''],
     length:[''],
     width:[''],
     grossWeight:[''],
     height:[''],
     netWeight:[''],
     volume:[''],
     totalGrossWeight:[''],
     volumeWeight:[''],
     totalNetWeight:[''],
     packageDescription:[''],
     marksAndNumbers:[''],
     invoiceNumber:[''],
     invoiceDate:[''],
     sbno:[''],
     sbdate:[''],
     epCopyDate:[''],
     epCopyNo:[''],
     

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

    
     dateCreated:[''],
     containerPackTypeId:[''],
     packageCount:[''],
     length:[''],
     width:[''],
     grossWeight:[''],
     height:[''],
     netWeight:[''],
     volume:[''],
     totalGrossWeight:[''],
     volumeWeight:[''],
     totalNetWeight:[''],
     packageDescription:[''],
     marksAndNumbers:[''],
     invoiceNumber:[''],
     invoiceDate:[''],
     sbno:[''],
     sbdate:[''],
     epCopyDate:[''],
     epCopyNo:[''],

    });
   }

onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  ngOnInit(): void {
this.getPackages();
this.getContainer();
     this.today =new Date();
    this.hero;
    console.log('this.hero',this.hero);

    this.companydataurlid = this.route.snapshot.paramMap.get('id');
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

      this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/CargoPackages/GetPackageByCargoID?id=${id}`).subscribe((response: any) => {
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

     this.containerCode=rowData.containerCode; // assign containerCode to row
     this.containerPackTypeId=rowData.containerPackTypeId,
     this.packageCode=rowData.packageCode;
     this.modalService.open(modalForm, {windowClass: 'modalForm', size:'lg'});
     this.ContainerForm.patchValue({

      dateCreated:rowData.dateCreated,
      containerPackTypeId:rowData.containerPackTypeId,
      packageCount:rowData.packageCount,
      length:rowData.length,
      width:rowData.width,
      grossWeight:rowData.grossWeight,
      height:rowData.height,
      netWeight:rowData.netWeight,
      volume:rowData.volume,
      totalGrossWeight:rowData.totalGrossWeight,
      volumeWeight:rowData.volumeWeight,
      totalNetWeight:rowData.totalNetWeight,
      packageDescription:rowData.packageDescription,
      marksAndNumbers:rowData.marksAndNumbers,
      invoiceNumber:rowData.invoiceNumber,
      invoiceDate:rowData.invoiceDate,
      sbno:rowData.sbno,
      sbdate:rowData.sbdate,
      epCopyDate:rowData.epCopyDate,
      epCopyNo:rowData.epCopyNo,
     })
  }

  getPackages(){
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/PackageType/Packages`).subscribe((response: any) => {
        console.log("Packages",response);
        this.Package=response;
      })
  }
  // onContainer(event){
  //   console.log("packageGroupId OR containerTypeId",event.packageGroupId);
    
  //  this.containerTypeId=event.packageGroupId;
  // }
  
  getContainer(){
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/PackageType/Container`).subscribe((response: any) => {
        console.log("Container",response);
        this.Container=response;
      })
  }
  onContainer(event){
    console.log("packageGroupId OR containerTypeId",event.packageGroupId);
    console.log(event)
   this.containerPackTypeId=event.packageGroupId;
  }

 
}




















