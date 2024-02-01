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
import { AppConfigService } from 'app/services/app-config.service';



@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {



  public cargoStatusDate = {};
  public editingstatusRemarks = {};

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
  form: FormGroup;





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

  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpclient: HttpClient, private fb: FormBuilder, private modalService: NgbModal, public datepipe:DatePipe,private route:ActivatedRoute,private apiConfig:AppConfigService) { }

  ngOnInit(): void {
    this.today =new Date();
    this.hero;
    console.log('this.hero',this.hero);

    this.companydataurlid = this.route.snapshot.paramMap.get('id');
      this.getDataTableRows(this.companydataurlid);
    console.log("hhghgh",this.companydataurlid);
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
  inlineEditingUpdatecargoStatusDate(event, cell, rowIndex) {
    this.cargoStatusDate[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }





  inlineEditingUpdatestatusRemarks(event, cell, rowIndex) {
    this.editingstatusRemarks[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

}
