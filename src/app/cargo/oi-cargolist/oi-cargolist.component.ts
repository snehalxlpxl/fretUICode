import { HttpClient } from '@angular/common/http';
import { CargolistService } from 'app/services/cargolist.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';

import { CoreTranslationService } from '@core/services/translation.service';

import * as snippet from 'app/cargo/datatables.snippetcode';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { Router } from '@angular/router';


@Component({
  selector: 'app-oi-cargolist',
  templateUrl: './oi-cargolist.component.html',
  styleUrls: ['./oi-cargolist.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OiCargolistComponent implements OnInit {
 

  cargoDetailsForm: FormGroup;
  private _unsubscribeAll: Subject<any>;
  private tempData = [];
  public modalHeading="";
  isJobActive=false;

  // public
  public contentHeader: object;
  //public rows: any;
  rows: any = []; 
  public selected = [];
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public expanded = {};
  public editingName = {};
  public editingStatus = {};
  public editingAge = {};
  public editingSalary = {};
  public chkBoxSelected = [];
  public SelectionType = SelectionType;
  public exportCSVData;
  public alluser: any;

  cities = [
    {id: 1, name: 'Vilnius'},
    {id: 2, name: 'Kaunas'},
    {id: 3, name: 'Pavilnys', disabled: true},
    {id: 4, name: 'Pabradė'},
    {id: 5, name: 'Klaipėda'}
];

// defaultBindingsList = [
//   { value: 1, label: 'Vilnius' },
//   { value: 2, label: 'Kaunas' },
//   { value: 3, label: 'Pavilnys', disabled: true }
// ];

// selectedCity = null;



  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;

  // snippet code variables
  public _snippetCodeKitchenSink = snippet.snippetCodeKitchenSink;
  public _snippetCodeInlineEditing = snippet.snippetCodeInlineEditing;
  public _snippetCodeRowDetails = snippet.snippetCodeRowDetails;
  public _snippetCodeCustomCheckbox = snippet.snippetCodeCustomCheckbox;
  public _snippetCodeResponsive = snippet.snippetCodeResponsive;
  public _snippetCodeMultilangual = snippet.snippetCodeMultilangual;

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Inline editing Name
   *
   * @param event
   * @param cell
   * @param rowIndex
   */
  inlineEditingUpdateName(event, cell, rowIndex) {
    this.editingName[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

  /**
   * Inline editing Age
   *
   * @param event
   * @param cell
   * @param rowIndex
   */
  inlineEditingUpdateAge(event, cell, rowIndex) {
    this.editingAge[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

  /**
   * Inline editing Salary
   *
   * @param event
   * @param cell
   * @param rowIndex
   */
  inlineEditingUpdateSalary(event, cell, rowIndex) {
    this.editingSalary[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

  /**
   * Inline editing Status
   *
   * @param event
   * @param cell
   * @param rowIndex
   */
  inlineEditingUpdateStatus(event, cell, rowIndex) {
    this.editingStatus[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

  /**
   * Search (filter)
   *
   * @param event
   */
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.full_name.toLowerCase().indexOf(val) !== -1 || !val;
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

  public getRowIndex(row: any): number {
    return this.table.bodyComponent.getRowIndex(row);   // row being data object passed into the template
}

  /**
   * For ref only, log selected values
   *
  //  * @param selected
  //  */
  onSelect({ selected }) {

    if(selected.type=='click'){
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    }
  }

  // (activate)="onActivate($event,modalXL)"     

  /**
   * For ref only, log activate events
   *
   * @param selected
   */
  onActivate(event,modalXL) {

    if(event.type=='click'){

    console.log('Activate Event', event.row);
    const modalRef= this.modalService.open(modalXL, {
      centered: true,
      size: 'xl'
    });

    this.cargoDetailsForm.patchValue({
      jobNo: event.row.jobNo,
      customerName:event.row.customerName
     });

   // modalRef.componentInstance.jobNo = event.row.jobNo;
 }
}

  /**
   * Custom Chkbox On Select
   *
   * @param { selected }
   */
  customChkboxOnSelect({ selected }) {
    this.chkBoxSelected.splice(0, this.chkBoxSelected.length);
    this.chkBoxSelected.push(...selected);
  }

  blockAgents(myvalue){

    console.log(myvalue);

  }

  populateForm(rowdata,modalXL,request){

    this.gotoList();

    // if(request=='Edit'&& rowdata.jobNo!=null){
    //   this.modalHeading='JOB# '+rowdata.jobNo;
    // this.isJobActive=true;
    // }

    // console.log('populateForm Event', rowdata);
    // const modalRef= this.modalService.open(modalXL, {
    //   centered: true,
    //   size: 'xl'
    // });

    // this.cargoDetailsForm.patchValue({
    //   jobNo: rowdata.jobNo,
    //   customerName:rowdata.customerName
    //  });
    }


  /**
   * Constructor
   *
   * @param {DatatablesService} _datatablesService
   * @param {CoreTranslationService} _coreTranslationService
   */
  constructor(private _coreTranslationService: CoreTranslationService,private fb: FormBuilder, private httpclient: HttpClient,private modalService: NgbModal,private router: Router ) {
    this._unsubscribeAll = new Subject();
    // this._coreTranslationService.translate(english, french, german, portuguese);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {

    // this.selectedCity = this.defaultBindingsList[0];

    this.getDataTableRows();

    this.cargoDetailsForm = this.fb.group({
      jobNo: [''],
      customerName:[''],
      salespersonId:[0]
    
     });


    // content header
    this.contentHeader = {
      headerTitle: 'Ocean Import',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Cargo List',
            isLink: true,
            link: '/'
          },
         
        ]
      }
    };

    this.httpclient.get(`http://localhost:5094/api/User`).subscribe(res=>{
      console.log('get all cargolist');
      this.alluser=res;

    }, err => {
      console.log("error while fetching data");
  
    });
  }



  modalOpenXL(modalXL,request) {
    this.modalHeading=request;
    this.modalService.open(modalXL, {
      centered: true,
      size: 'xl'
    });
  }

  gotoList() {
    this.router.navigate(['/cargo-details']);
  }

  getDataTableRows(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      
      this.httpclient.get(`http://localhost:5094/api/AllCargoList`).subscribe((response: any) => {
        this.rows = response;
      //  this.tempData = this.rows;
        this.kitchenSinkRows = this.rows;
        // this.exportCSVData = this.rows;
        // this.onDatatablessChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

}
