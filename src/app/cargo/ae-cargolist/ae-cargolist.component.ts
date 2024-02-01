import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import * as snippet from 'app/cargo/datatables.snippetcode';
import { Users } from 'app/services/user.model';

@Component({
  selector: 'app-ae-cargolist',
  templateUrl: './ae-cargolist.component.html',
  styleUrls: ['./ae-cargolist.component.scss']
})
export class AeCargolistComponent implements OnInit {

  public contentHeader: object;
  public rows: any;
  public basicSelectedOption: number = 10;
  private tempData = [];
  public kitchenSinkRows: any;
  public ColumnMode = ColumnMode;
  public SelectionType = SelectionType;
  public selected = [];
  public exportCSVData;

    // select basic
    // public selectBasic: Users[] = [];
    public selectBasic: any;
    public selectBasicLoading = false;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;


  public _snippetCodeKitchenSink = snippet.snippetCodeKitchenSink;

  constructor(private httpclient:HttpClient,private modalService: NgbModal ) { }

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
   * For ref only, log selected values
   *
   * @param selected
   */
   onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  /**
   * For ref only, log activate events
   *
   * @param selected
   */
  onActivate(event) {
    // console.log('Activate Event', event);
  }

   // modal Open Form
   modalOpenForm(modalForm) {
    this.modalService.open(modalForm);
  }

  modalOpenXL(modalXL) {
    this.modalService.open(modalXL, {
      centered: true,
      size: 'xl'
    });
  }

  ngOnInit(): void {

    this.contentHeader = {
      headerTitle: 'Air Export',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Cargo List',
            isLink: true,
            link: '/'
          }
        ]
      }
    };

    this.httpclient.get(`http://localhost:5094/api/Cargo`).subscribe(res=>{
      console.log('get all cargolist');
      this.rows=res;
      this.tempData = this.rows;
      this.kitchenSinkRows = this.rows;
      this.exportCSVData = this.rows;
    }, err => {
      console.log("error while fetching data");
  
    });

    this.httpclient.get(`http://localhost:5094/api/User`).subscribe(res=>{
      console.log('get all cargolist');
      this.selectBasic=res;

    }, err => {
      console.log("error while fetching data");
  
    });

    // this._datatablesService.onDatatablessChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
    //   this.rows = response;
    //   this.tempData = this.rows;
    //   this.kitchenSinkRows = this.rows;
    //   this.exportCSVData = this.rows;
    // });
  }

}
