import { Component, OnInit, OnDestroy,ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Company } from 'app/model/company';
import { Company } from 'app/services/company';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as snippet from 'app/companies/datatables.snippetcode';
import { ColumnMode,columnsTotalWidth,DatatableComponent,id, SelectionType } from '@swimlane/ngx-datatable';
// import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { from, Observable, Subject, Subscription, timer } from 'rxjs';
import { clear } from 'console';
import { DatePipe } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import { CoreTranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { ApplicationConfig } from '@angular/platform-browser';
import { AppConfigService } from 'app/services/app-config.service';
import { ExportExeclFileService } from 'app/export-execl-file.service';

@Component({
  selector: 'app-pricing-sales-quotes-list',
  templateUrl: './pricing-sales-quotes-list.component.html',
  styleUrls: ['./pricing-sales-quotes-list.component.scss']
})
export class PricingSalesQuotesListComponent implements OnInit {
  showComponent:boolean=false;
  _datatablesService: any;
  exportCSVData: any;
  // public rows: any = [];
  rows: Object[];
  public selected = [];
  public editingName = {};
  public editingAge = {};
  public editingSalary = {};
  public editingStatus = {};
  _unsubscribeAll: Observable<any>;
  tempData: any;
  ColumnMode: any;
  // custObj: airExport = new airExport();
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public _snippetCodeKitchenSink = snippet.snippetCodeKitchenSink;
  public _snippetCodeInlineEditing = snippet.snippetCodeInlineEditing;
  public _snippetCodeRowDetails = snippet.snippetCodeRowDetails;
  public _snippetCodeCustomCheckbox = snippet.snippetCodeCustomCheckbox;
  public _snippetCodeResponsive = snippet.snippetCodeResponsive;
  public _snippetCodeMultilangual = snippet.snippetCodeMultilangual;
  public _snippetCodeVertical = snippet.snippetCodeVertical;
  LocationType2: any;
  public contentHeader: object;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;

  
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public SelectionType = SelectionType;
  editdata: any;
  id: any;
  mydta: any;
  // showComponent: boolean=false;

  /**
   * Method Search (filter)
   *
   * @param event
   */
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.salesQuoteNumber.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.kitchenSinkRows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

    /**
   * Constructor
   *
   * @param {DatatablesService} _datatablesService
   * @param {CoreTranslationService} _coreTranslationService
   */

  constructor(private _coreTranslationService: CoreTranslationService,private httpclient: HttpClient, private fb: FormBuilder,private router: Router,private toastr: ToastrService,private apiConfig:AppConfigService,private excelExport:ExportExeclFileService) { }

  ngOnInit(): void {
     this.getDataTableRows();
  }

  getDataTableRows():Promise<any[]>{
    return new Promise((resolve, reject) => {
      
      this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/SalesQuoteDetailView`).subscribe((response: any) => {
        
      //   console.log('get Sales Quotes data',response);
        this.rows = response
        // .filter(
        //   (data) => data.salesQuoteId > 145730
        // );
        this.tempData = this.rows;
        this.kitchenSinkRows = this.rows;
        // console.log("Sales list",this.rows)  
        resolve(this.rows);
      }, reject);
    });
    }
    checkSalesQuoteId(id){
      return id=>id.salesQuoteID>140000
    }
    onShowQuoteForm(){
      this.router.navigateByUrl('/sales-quotes-form');
    
    }
    onDelete(id){
        this.deleterecord(id); 
    }
      deleterecord(id: any) {
        this.httpclient.delete(`${this.apiConfig.apiBaseUrl}/api/SalesQuotes/${id}`).subscribe((Success: any) => {
          
           this.toastr.success('data deleted sucessfully' ,'',{
            timeOut :  2000});
           this.getDataTableRows();
        });
      }
      exportAsXLSX():void {
        // this.salesQuote=JSON.parse(SaleQuotedata)
        this.excelExport.exportAsExcelFile(this.rows, 'myExcelFile');
     }
}
