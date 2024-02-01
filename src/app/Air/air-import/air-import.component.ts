import { Component, OnInit } from '@angular/core';
import * as snippet from 'app/companies/datatables.snippetcode';

import { Cargo } from 'app/services/Cargo';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'app/services/app-config.service';
@Component({
  selector: 'app-air-import',
  templateUrl: './air-import.component.html',
  styleUrls: ['./air-import.component.scss']
})
export class AirImportComponent implements OnInit {


  cargoObj: Cargo = new Cargo();
 
  // id: string;
  submitted: boolean = false;
  modelheading = "";

  private tempData = [];

  public companies: any = [];
  public contentHeader: object;
  public company: any = [];
  public rows: any = [];
  // public LocationType1: [];
  public LocationType2: [];

  public myType = [];
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
  isAir: boolean = false;
  selectElement="";
  selectElementText = 0;
  selectAirPolText = "Select POL";
  selectAirPodText = "Select POD";
  // JobType=['Freight', 'Customer Clearence','Warehousing','Courier','Freight + CC','Transportation'];

  public selectedvalue = "";
  table: any;

  public _snippetCodeKitchenSink = snippet.snippetCodeKitchenSink;
  public _snippetCodeInlineEditing = snippet.snippetCodeInlineEditing;
  public _snippetCodeRowDetails = snippet.snippetCodeRowDetails;
  public _snippetCodeCustomCheckbox = snippet.snippetCodeCustomCheckbox;
  public _snippetCodeResponsive = snippet.snippetCodeResponsive;
  public _snippetCodeMultilangual = snippet.snippetCodeMultilangual;
  public _snippetCodeVertical = snippet.snippetCodeVertical;

  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.jobNo.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.kitchenSinkRows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  constructor(private httpclient: HttpClient,private apiConfig:AppConfigService) { }
 
  ngOnInit(): void {
    this.getDataTableRows();

  this.getLocationAirType();

  this.contentHeader = {
    headerTitle: 'Datatables',
    actionButton: true,
    breadcrumb: {
      type: '',
      links: [
        {
          name: 'Home',
          isLink: true,
          link: '/'
        },
        {
       name: 'Forms & Tables',
       isLink: true,
      link: '/'
    },
    {
       name: 'Datatables',
       isLink: false
    }
   ]
 }
};
  }
  getDataTableRows():Promise<any[]>{
    return new Promise((resolve, reject) => {
      
      this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/Cargo/AirImport`).subscribe((response: any) => {
        console.log('get all Cargos');
        this.rows = response;
        this.tempData = this.rows;
        this.kitchenSinkRows = this.rows;
        // this.exportCSVData = this.rows;
        // this.onDatatablessChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
    }
    getLocationAirType() {
      this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/LocationMaster/getAirList`).subscribe((response: any) => {
        console.log('get location type1 ');
        this.LocationType2 = response;
    
        console.table(this.LocationType2);
    
      });
    
    }

}


