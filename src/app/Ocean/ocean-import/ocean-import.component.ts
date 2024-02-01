

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as snippet from 'app/companies/datatables.snippetcode';
import { ColumnMode, DatatableComponent, id, SelectionType } from '@swimlane/ngx-datatable';
import { AppConfigService } from 'app/services/app-config.service';


@Component({
  selector: 'app-ocean-import',
  templateUrl: './ocean-import.component.html',
  styleUrls: ['./ocean-import.component.scss']
})
export class OceanImportComponent implements OnInit {
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public SelectionType = SelectionType;
  tempData= [];
  rows: any;
  table: any;


  // snippet code variables
  public _snippetCodeKitchenSink = snippet.snippetCodeKitchenSink;
  public _snippetCodeInlineEditing = snippet.snippetCodeInlineEditing;
  public _snippetCodeRowDetails = snippet.snippetCodeRowDetails;
  public _snippetCodeCustomCheckbox = snippet.snippetCodeCustomCheckbox;
  public _snippetCodeResponsive = snippet.snippetCodeResponsive;
  public _snippetCodeMultilangual = snippet.snippetCodeMultilangual;
  public _snippetCodeVertical = snippet.snippetCodeVertical;

  constructor(private httpclient : HttpClient,private apiConfig:AppConfigService) { }

   /**
   * Method Search (filter)
   *
   * @param event
   */
   filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
     // console.log(d.companyName);
      return d.jobNo.toLowerCase().indexOf(val) !== -1 || !val;
    });
 // update the rows
 this.kitchenSinkRows = temp;
 // Whenever the filter changes, always go back to the first page
 //this.table.offset = 0;
}
  ngOnInit(): void {
    this.getDataTableRows();
  }

  getDataTableRows(): Promise<any[]> {
    return new Promise((resolve, reject) => {

      this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/Cargo/OceanImport`).subscribe((response: any) => {
        console.log('get all comapnies');
        this.rows = response;
        this.tempData = this.rows;
        this.kitchenSinkRows = this.rows;
        // this.exportCSVData = this.rows;
        // this.onDatatablessChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

}
