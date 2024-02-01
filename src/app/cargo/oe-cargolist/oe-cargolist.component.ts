import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// import { CargoListService } from '../cargolist.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-oe-cargolist',
  templateUrl: './oe-cargolist.component.html',
  styleUrls: ['./oe-cargolist.component.scss']
})
export class OeCargolistComponent implements OnInit {

  private tempData = [];
  private _unsubscribeAll: Subject<any>;
  public rows: any;
  public selected = [];
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public SelectionType = SelectionType;
  public ColumnMode = ColumnMode;
  public exportCSVData;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;


  //  /**
  //  * Constructor
  //  *
  //  * @param {DatatablesService} _datatablesService
  //  * @param {CoreTranslationService} _coreTranslationService
  //  */


  /**
   * Method Search (filter)
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
    this.selected.push(selected);
  }

  /**
   * For ref only, log activate events
   *
   * @param selected
   */
  onActivate(event) {
    // console.log('Activate Event', event);
  }

  
  // private _datatablesService: CargoListService
  constructor(private httpclient:HttpClient, private modalService: NgbModal ) {
    this._unsubscribeAll = new Subject();
  }

    // modal Open Form
    modalOpenForm(modalForm) {
      this.modalService.open(modalForm);
    }

  ngOnInit(): void {

    this.httpclient.get(`http://localhost:5094/api/Cargo`).subscribe(res=>{
      console.log('get all cargolist');
      this.kitchenSinkRows=res;
      this.exportCSVData=res;
    }, err => {
      console.log("error while fetching data");
  
    });

    // this._datatablesService.onDatatablessChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
    //   this.kitchenSinkRows =response;
    //   this.exportCSVData = this.rows;
    // });
  }

}
