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
import { AppConfigService } from 'app/services/app-config.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
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
  constructor(private httpclient: HttpClient, private fb: FormBuilder, private modalService: NgbModal, public datepipe:DatePipe,private route:ActivatedRoute,private apiConfig:AppConfigService) { }

  ngOnInit(): void {
    this.today =new Date();
    this.hero;
    console.log('this.hero',this.hero);

    this.companydataurlid = this.route.snapshot.paramMap.get('id');
      this.getDataTableRows(this.companydataurlid);
    console.log(this.companydataurlid);
  }
    getDataTableRows(id): Promise<any[]> {
    return new Promise((resolve, reject) => {

      this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/Invoices/GetInvoiceByCargoID?id=${id}`).subscribe((response: any) => {
        console.log('get Invoice', response);
        this.rows = response;
        this.tempData = this.rows;
        this.kitchenSinkRows = this.rows;
        resolve(this.rows);
      }, reject);
    });
  }


}
