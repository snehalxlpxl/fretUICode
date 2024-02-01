import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreTranslationService } from '@core/services/translation.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as snippet from 'app/companies/datatables.snippetcode';
import { ColumnMode,columnsTotalWidth,DatatableComponent,id, SelectionType } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs/operators';
import { AppConfigService } from 'app/services/app-config.service';

@Component({
  selector: 'app-alltypemaster',
  templateUrl: './alltypemaster.component.html',
  styleUrls: ['./alltypemaster.component.scss']
})
export class AlltypemasterComponent implements OnInit {

   // modal Basic
  modalOpen(modalBasic) {
    this.modalService.open(modalBasic);
  }

  alltypemasterForm:FormGroup;

  tempData: any;
  rows: any;
  exportCSVData: any;
  _unsubscribeAll: Observable<any>;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpclient: HttpClient,private modalService: NgbModal,private toastr: ToastrService,private apiConfig:AppConfigService) { }

  @ViewChild(DatatableComponent) table: DatatableComponent;
  
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public SelectionType = SelectionType;

  
  /**
   * Method Search (filter)
   *
   * @param event
   */
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      // debounceTime(1000)
      return d.locationShortName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.kitchenSinkRows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  openModal(allType){
    this.modalService.open(allType,{ size: 'lg', backdrop: 'static' });
  }
  /**
   * On init
   */
  ngOnInit() {
   this.getAlllocList();
    this.alltypemasterForm=new FormGroup({
      "locationId": new FormControl(0),
      "locationType": new FormControl('',Validators.required),
      "locationCode": new FormControl('',Validators.required),
      "locationShortName": new FormControl('',Validators.required),
      "countryName":  new FormControl('',Validators.required),
      "dateCreated":  new FormControl(new Date()),
      "dateModified":  new FormControl(new Date()),
     
    })
  
  }
  getAlllocList():Promise<any[]>{
    return new Promise((resolve, reject) => {
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/LocationMaster`).subscribe((response: any) => {
      console.log("Location = ",response)
      this.rows=response;
      this.tempData=this.rows;
      this.kitchenSinkRows = this.rows;
      resolve(this.rows);
    }, reject);
  });
}
onSubmit(form:FormGroup){
  const datamodel:object={
      "locationId": 0,
      "locationType": form.value.locationType,
      "locationCode": form.value.locationCode,
      "locationShortName": form.value.locationShortName,
      "locationLongName": "string",
      "countryId": 0,
      "countryName": "string",
      "stateId": 0,
      "stateName": "string",
      "cityId": 0,
      "cityName": "string",
      "scheduleD": "string",
      "scheduleK": "string",
      "createdBy": 0,
      "dateCreated": "2023-06-01T09:56:46.691Z",
      "modifiedBy": 0,
      "dateModified": "2023-06-01T09:56:46.691Z",
      "deletedBy": 0,
      "dateDeleted": "2023-06-01T09:56:46.691Z",
      "isDeleted": true,
      "isActive": true
  }
  console.table(form.value)
  if(form.valid){
    this.httpclient.post(`${this.apiConfig.apiBaseUrl}/api/LocationMaster`,JSON.stringify(datamodel), this.headers).subscribe((response: any) => {
    console.log(response)
    this.toastr.success('Data Added successfully' ,'ADD',{
      timeOut :  3000});
      this.modalService.dismissAll();
      this.getAlllocList();
     });
  

  }else{
    let key = Object.keys(form.controls)
    console.log(key)
    key.filter(data=>{
      console.log("data",data)
      let control=form.controls[data];
      if(control.errors!=null){
        control.markAsTouched();
      }
    });
    return;
  }
}

}
