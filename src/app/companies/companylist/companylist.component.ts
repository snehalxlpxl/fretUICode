

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import { ColumnMode, DatatableComponent, id, SelectionType } from '@swimlane/ngx-datatable';

// import { CoreTranslationService } from '@core/services/translation.service';
import { CoreTranslationService } from '@core/services/translation.service';
import * as snippet from 'app/companies/datatables.snippetcode';
import { CompanyList } from './CompanyList';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { resolve } from 'dns';
import { error } from 'console';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AppConfigService } from 'app/services/app-config.service';

@Component({
  selector: 'app-companylist',
  templateUrl: './companylist.component.html',
  styleUrls: ['./companylist.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompanylistComponent implements OnInit {

  formatdate = 'dd/MM/yyyy'; 
  myDate=new Date();

  today:Date;
  fullScreen = true;
  // showloader: boolean = false;
  submitted: boolean = false;
  private reset$ = new Subject();
  timer$: Observable<any>;
  CompanyForm: FormGroup;
  private _unsubscribeAll: Subject<any>;
  private tempData = [];
  public companies: any = [];
  public contentHeader: object;
  public company: any = [];
  public rows: any = [];
  public companyType = [];
  public myType = [];
  public selected = [];
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public expanded = {};
  // public editingName = {};
  // public editingStatus = {};
  // public editingAge = {};
  // public editingSalary = {};
  public chkBoxSelected = [];
  public SelectionType = SelectionType;
  // public exportCSVData;
  selectElementText = "Select";
  cmpobj: CompanyList = new CompanyList();

  @ViewChild('closeModal') private closeModal: ElementRef;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;

  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  private clModal(): void {
    this.closeModal.nativeElement.click();
  }

  // snippet code variables
  public _snippetCodeKitchenSink = snippet.snippetCodeKitchenSink;
  public _snippetCodeInlineEditing = snippet.snippetCodeInlineEditing;
  public _snippetCodeRowDetails = snippet.snippetCodeRowDetails;
  public _snippetCodeCustomCheckbox = snippet.snippetCodeCustomCheckbox;
  public _snippetCodeResponsive = snippet.snippetCodeResponsive;
  public _snippetCodeMultilangual = snippet.snippetCodeMultilangual;
  public _snippetCodeVertical = snippet.snippetCodeVertical;
 
  /**
   * Search (filter)
   *
   * @param event
   */
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.companyName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.kitchenSinkRows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  /**
   * Row Details Toggle
   *
   * @param row
   */
  rowDetailsToggleExpand(row) {
    this.tableRowDetails.rowDetail.toggleExpandRow(row);
  }


  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  /**
   * For ref only, log selected values
   *
   * @param selected
   */
  // onSelect(myType) {
  //   console.log(myType.target.value);
  // }

  /**
   * For ref only, log activate events
   *
   * @param selected
   */
/**
   * Custom Chkbox On Select
   *
   * @param { selected }
   */
customChkboxOnSelect({ selected }) {
  this.chkBoxSelected.splice(0, this.chkBoxSelected.length);
  this.chkBoxSelected.push(...selected);
}
 /**
   * Constructor
   *
   * @param {DatatablesService} _datatablesService
   * @param {CoreTranslationService} _coreTranslationService
   */

  constructor(private _coreTranslationService: CoreTranslationService, private httpclient: HttpClient, public datepipe:DatePipe,private apiConfig:AppConfigService) {
    this._unsubscribeAll = new Subject();
   
    this.timer$ = this.reset$.pipe(
      startWith(0),
      switchMap(() => timer(0, 1000))
    );

   }

  ngOnInit(): void {
    this.today =new Date();
    console.log(new Date().toISOString());

    // this.getCompanyType();
     this.getDataTableRows();
    // // this.showloader=false;
    // setTimeout(() => {
    //   this.showloader=true;
    //   this.getDataTableRows();
    // }, 1000);
// this.onClickDefault();

  }

  // onClickDefault(){
  //   this.showloader = true;
  //   this.fullScreen = true;
   
  //   setTimeout(() => {
  //     this.getDataTableRows();
  //       this.showloader = false
  //   }, 2000);
  // }

  getSelectedOptionText(event: Event) {


    // this.selectElementText = event.target['options'][event.target['options'].selectedIndex].value;
    console.log(event.target['options'][event.target['options'].selectedIndex].value);
    this.selectElementText = event.target['options'][event.target['options'].selectedIndex].text;
    console.log(this.selectElementText);

  }



  getDataTableRows(): Promise<any[]> {
    return new Promise((resolve, reject) => {

      // this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/Cmp/CompanyLi`).subscribe((response: any) => {
        this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/CompanyDetail`).subscribe((response: any) => {
        console.log('get all comapnies');
        console.log("********",response);
        this.rows = response;
        this.tempData = this.rows;
        this.kitchenSinkRows = this.rows;
        // this.exportCSVData = this.rows;
        // this.onDatatablessChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  onDelete(id){
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't to delete  ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ms-1'
     
      }
    }).then((res)=> {
      if (res.value) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      this.deleterecord(id); 
      }// this should execute now
      else if (res.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelled',
          text: 'Your  file is safe :)',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        });
      }
    })
  }

deleterecord(id){
  this.httpclient.delete(`${this.apiConfig.apiBaseUrl}/api/Cmp/${id}`).subscribe((Success: any) => {
       console.log('delete row');
       console.log(id);

       this.getDataTableRows();
    });
}

}








