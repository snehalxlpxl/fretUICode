import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs/internal/Observable';
import { takeUntil } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OceanLineModalComponent } from '../oceanLineModal/ocean-line-modal/ocean-line-modal.component';
import { ModalService } from '../modal.service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppConfigService } from 'app/services/app-config.service';


@Component({
  selector: 'app-ocean-line-master',
  templateUrl: './ocean-line-master.component.html',
  styleUrls: ['./ocean-line-master.component.scss']
})
export class OceanLineMasterComponent implements OnInit {

  oceanlinemasterForm:FormGroup;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  refere:any;

  @Input() child1Ref: OceanLineModalComponent;

  openmodal(): void {
    this.refere=89
    this.service.openModal(this.refere);
  }
  openModal(modalBasic){
    this.modalService.open(modalBasic,{ size: 'lg', backdrop: 'static' });
  }

  tempData: any;
  private _datatablesService: any;
  rows: any;
  exportCSVData: any;
  _unsubscribeAll: Observable<any>;

  constructor(private httpclient: HttpClient,private modalService: NgbModal,private service:ModalService,private toastr: ToastrService,private apiConfig:AppConfigService) { }

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

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.lineCompanyName.toLowerCase().indexOf(val) !== -1 || !val;
    });

  // const temp = this.tempData.filter(d => d.lineCompanyName.toLowerCase().includes(val.toLowerCase()) || !val);
  console.log("TEMP",temp)
  // update the rows
  this.kitchenSinkRows = temp;
  // Whenever the filter changes, always go back to the first page
  this.table.offset = 0;
}
  /**
   * On init
   */
  ngOnInit() {
   this.getAllOceanList();
   this.oceanlinemasterForm=new FormGroup({
    "oceanLineId": new FormControl(0),
    "oceanLineCode": new FormControl('',Validators.required),
    "lineCallSign":new FormControl('',Validators.required),
    "lineCompanyName": new FormControl('',Validators.required),
    "scaccode": new FormControl('',Validators.required),
    "dateCreated": new FormControl(new Date(),Validators.required),
    "dateModified":new FormControl(new Date(),Validators.required),
   })
  
  }
  getAllOceanList():Promise<any[]>{
    return new Promise((resolve, reject) => {
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/OceanLineMaster`).subscribe((response: any) => {
      console.log(response)
      this.rows=response;
      this.tempData=this.rows;
      this.kitchenSinkRows = this.rows;
      resolve(this.rows);
    }, reject);
  });
}

  onSubmit(form:FormGroup){
      if(form.valid){
      this.httpclient.post(`${this.apiConfig.apiBaseUrl}/api/OceanLineMaster`,JSON.stringify(form.value), this.headers).subscribe((response: any) => {
        console.log(response)
        this.toastr.success('Data Added successfully' ,'ADD',{
          timeOut :  3000});
          this.modalService.dismissAll();
          this.getAllOceanList();
      });
    
    }
    else
    {
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
