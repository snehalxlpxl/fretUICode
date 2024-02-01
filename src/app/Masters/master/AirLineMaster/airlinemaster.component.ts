import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AppConfigService } from 'app/services/app-config.service';

@Component({
  selector: 'app-airlinemaster',
  templateUrl: './airlinemaster.component.html',
  styleUrls: ['./airlinemaster.component.scss']
})
export class AirlinemasterComponent implements OnInit {

  airlinemasterForm:FormGroup;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  // modal Basic
  modalOpen(modalBasic) {
  this.modalService.open(modalBasic);
  }


  tempData: any;
  private _datatablesService: any;
  rows: any;
  exportCSVData: any;
  _unsubscribeAll: Observable<any>;

  constructor(private httpclient: HttpClient,private modalService: NgbModal,private toastr: ToastrService,private apiConfig:AppConfigService)  { }

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
    console.log(this.tempData)
    const val = event.target.value.toLowerCase();
    console.log(val)
    const temp = this.tempData.filter(d => d.airlineName.toLowerCase().includes(val.toLowerCase()) || !val);
   
    // update the rows
    this.kitchenSinkRows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  openModal(airline){
    this.modalService.open(airline,{ size: 'lg', backdrop: 'static' });
  }
  /**
   * On init
   */
  ngOnInit() {
   this.getAllAirList();

   this.airlinemasterForm=new FormGroup({
    "airlineId": new FormControl(0),
    "airlineName": new FormControl('',Validators.required),
    "a2code": new FormControl('',Validators.required),
    "a3code": new FormControl('',Validators.required),
   })
  
  }
  getAllAirList():Promise<any[]>{
    return new Promise((resolve, reject) => {
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/AirLineMaster`).subscribe((response: any) => {
      console.log("airline = ",response)
      this.rows=response;
      this.tempData=this.rows;
      this.kitchenSinkRows = this.rows;
      resolve(this.rows);
    }, reject);
  });
  }
  
  onSubmit(form:FormGroup){
    if(form.valid){
      this.httpclient.post(`${this.apiConfig.apiBaseUrl}/api/AirLineMaster`,JSON.stringify(form.value), this.headers).subscribe((response: any) => {
      console.log(response)
      this.toastr.success('Data Added successfully' ,'ADD',{
        timeOut :  3000});
       });
      this.modalService.dismissAll();
      this.getAllAirList();


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
