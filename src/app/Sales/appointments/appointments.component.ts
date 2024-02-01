

import { Component, OnInit, OnDestroy,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Company } from 'app/model/company';
import { Company } from 'app/services/company';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as snippet from 'app/companies/datatables.snippetcode';
import { ColumnMode,id, SelectionType } from '@swimlane/ngx-datatable';
// import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { from, Observable, Subject, Subscription, timer } from 'rxjs';
import { clear } from 'console';
import { DatePipe } from '@angular/common';
import { NavigationEnd } from '@angular/router';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppointmentsComponent implements OnInit {
  formatdate = 'dd/MM/yyyy'; 
  myDate=new Date();

  today:Date;

  CompanyForm: FormGroup;
  custObj: Company = new Company();
  public selected = [];
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public SelectionType = SelectionType;
  tempData= [];
  rows: any;
  table: any;
  public ColumnMode = ColumnMode;


  private reset$ = new Subject();
  timer$: Observable<any>;
  subscription: Subscription;


  // snippet code variables
  public _snippetCodeKitchenSink = snippet.snippetCodeKitchenSink;
  public _snippetCodeInlineEditing = snippet.snippetCodeInlineEditing;
  public _snippetCodeRowDetails = snippet.snippetCodeRowDetails;
  public _snippetCodeCustomCheckbox = snippet.snippetCodeCustomCheckbox;
  public _snippetCodeResponsive = snippet.snippetCodeResponsive;
  public _snippetCodeMultilangual = snippet.snippetCodeMultilangual;
  public _snippetCodeVertical = snippet.snippetCodeVertical;
  cmptypeId: 5;
  selectElementText: "Select Company";
  someSubscription: any;
  router: any;


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
      return d.companyName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.kitchenSinkRows = temp;
    // Whenever the filter changes, always go back to the first page
    //this.table.offset = 0;
  }

  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  


  modalOpenForm(modalForm) {
    size:'lg'
    // this.modalService.open(modalForm);
    this.CompanyForm = this.fb.group({
      companyId: 0,
     companyName: ['', Validators.required],
      displayName: ['', Validators.required],
      companyTypeId: ['', Validators.required],
      companyTypeName: ['', Validators.required],
      parentCompanyId: ['', Validators.required],
      parentCompanyName:['', Validators.required],
      gstNumber:['', Validators.required],
      gstType:['', Validators.required],
      placeOfSupply: ['', Validators.required],
      website: ['', Validators.required],
      dateCreated: ['']
    });
   
    this.openModal(modalForm)

  }

  openModal(targetModal) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
  }
  

  constructor( private httpclient: HttpClient, private fb: FormBuilder, private modalService: NgbModal, public datepipe:DatePipe) {

    this.CompanyForm = this.fb.group({
      companyId: 0,
     companyName: ['', Validators.required],
      displayName: [''],
      companyTypeId: ['', Validators.required],
      companyTypeName: ['', Validators.required],
      parentCompanyId: ['', Validators.required],
      parentCompanyName:[''],
      gstNumber:[''],
      gstType:[''],
      placeOfSupply: [''],
      website: [''],
      dateCreated: ['']
    });

    this.timer$ = this.reset$.pipe(
      startWith(0),
      switchMap(() => timer(0, 1000))
    );


    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };
    // this.someSubscription = this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     // Here is the dashing line comes in the picture.
    //     // You need to tell the router that, you didn't visit or load the page previously, so mark the navigated flag to false as below.
    //     this.router.navigated = false;
    //   }
    // });
   }

//   private _refreshrequired=new Subject<void>();

// get Refreshrequired(){
//   return this._refreshrequired;
// }




   onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

   populateForm(rowData, modalForm) {
    size: 'lg'
    console.log('get all');
    console.log(rowData);

    this.modalService.open(modalForm, {windowClass: 'modalForm', size:'lg'});

    if (rowData.companyTypeName != null) {
      this.selectElementText = rowData.companyTypeName;
      console.log(this.selectElementText);
    }

    console.log('rowData.CompanyId');

    console.log(rowData.companyId);

    this.CompanyForm.patchValue({
      
      companyId:rowData.companyId,
      companyName: rowData.companyName,
      displayName:rowData.displayName,
      companyTypeId: rowData.companyTypeId,
      companyTypeName: rowData.companyTypeName,
      parentCompanyId: rowData.parentCompanyId,
      parentCompanyName: rowData.parentCompanyName,
      gstNumber: rowData.gstNumber,
      gstType: rowData.gstType,
      placeOfSupply: rowData.placeOfSupply,
      website: rowData.website,
     dateCreated: rowData.dateCreated,
      createdBy: rowData.createdBy
    });

    console.log('this.CompanyForm.value PATCH VALUE');
    console.log(this.CompanyForm.value);
    

  }
  ngOnInit(): void {
    this.today =new Date();
    console.log(new Date().toISOString());
  //   console.log(new Date().toDateString());
  //   console.log(new Date().toLocaleDateString());
  //   console.log(new Date().toLocaleString());
  // console.log(new Date().toLocaleTimeString());
  //   console.log(new Date().getTimezoneOffset());
    this.getDataTableRows();
    this.subscription = this.timer$.subscribe((i) => {
    //  console.log('timer: ', i);
    });
  }

  resetForm(form: FormGroup) {

    form.reset();

  }



  onDelete(id){
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't to delete  ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ms-1'
     
      }
    }).then((res)=> {
      if (res.value) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      this.deleterecord(id); 
      }// this should execute now
      else if (res.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelled',
          text: 'Your  file is safe :)',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        });
      }
    })
  }

deleterecord(id){
  this.httpclient.delete(`http://localhost:5014/api/Company/${id}`).subscribe((Success: any) => {
       console.log('delete row');
       console.log(id);

       this.getDataTableRows();
    });
}
add(form: FormGroup)
{
  console.log(form.value.companyId);
  this.custObj =
  {
    "companyId":0,
    "companyName": form.value.companyName,
    "displayName": form.value.displayName,
    "companyTypeId": form.value.companyTypeId,
    "companyTypeName": form.value.companyTypeName,
    "parentCompanyId": form.value.parentCompanyId,
    "parentCompanyName":form.value.parentCompanyName,
    "gstNumber": form.value.gstNumber,
    "gstType": form.value.gstType,
    "placeOfSupply": form.value.placeOfSupply,
    "website": form.value.website,
  // "dateCreated":"2023-03-08T05:04:38.000Z",
    "dateCreated":new Date().toISOString(),
    "createdBy": 1
  }


  console.log('this.custObj');
  console.log(this.custObj);
  console.log(JSON.stringify(this.custObj));

  //  console.log(myobj);

  this.httpclient.post('http://localhost:5014/api/Company', JSON.stringify(this.custObj), this.headers).subscribe(res => {
    console.log('Success');
    console.log(res);
    this.resetForm(form);
    this.getDataTableRows();

  }, err =>{
    console.log('Error');
    console.log(err);

  });
  
  this.resetForm;
  this.modalService.dismissAll();
}

  onSubmitService(form: FormGroup) {

    // this.success();
    console.log( this.CompanyForm.value);

    this.custObj=this.CompanyForm.value;

    console.log('this.custObj');
    console.log( this.custObj);

        
    console.log("this.custObj.companyId");
    console.log(this.custObj.companyId);

    if(this.custObj.companyId==0){
      console.log("INSERT");
      this.add(this.CompanyForm);
    this.success();
    console.log(this.custObj.companyId);
    // this.CompanyForm.reset();
    // this.resetForm;
    // this.clear();
    this.changeLocation;
    }
    else
  
    {
    //  this.CompanyForm.reset();
      console.log("UPDATE");
     this.updateComapny(this.CompanyForm)
      this.success();

      console.log(this.custObj.companyId);
    }
   
  
    this.modalService.dismissAll();

    // this.changeLocation;
}
success(){
  Swal.fire(
    'Save',
    'Saved Successfully',
    'success'
  )
}
clear(){
  this.CompanyForm;
}




changeLocation(locationData) {

  // save current route first
  const currentRoute = this.router.url;

  this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); // navigate to same route
  }); 
}


updateComapny(form: FormGroup) {
  size: 'lg'
  // if (form.value.companyId != null) {
  //   this.selectElementText = form.value.companyId
  // }
// this.clear();

  this.custObj =
  {
    
    "companyId":form.value.companyId,
    "companyName": form.value.companyName,
    "displayName": form.value.displayName,
    "companyTypeId": form.value.companyTypeId,
    "companyTypeName": form.value.companyTypeName,
    "parentCompanyId": form.value.parentCompanyId,
    "parentCompanyName":form.value.parentCompanyName,
    "gstNumber": form.value.gstNumber,
    "gstType": form.value.gstType,
    "placeOfSupply": form.value.placeOfSupply,
    "website": form.value.website,
    // "dateCreated":"2023-03-08T05:04:38.000Z ",
     "dateCreated":new Date().toISOString(),
    "createdBy": 1
  }

  console.log('this.custObj');

  console.log(JSON.stringify(this.custObj));


  this.httpclient.put(`http://localhost:5014/api/Company/${this.custObj.companyId}`, JSON.stringify(this.custObj), this.headers).subscribe(res => {
    console.log(' Update Success');
    this.resetForm(form);
    this.getDataTableRows();
    console.log(res);
  }, err => {
    console.log('Error');
    console.log(err);

  });

}


getDataTableRows(): Promise<any[]> {
  return new Promise((resolve, reject) => {

    this.httpclient.get(`http://localhost:5014/api/Company/CompanyList`).subscribe((response: any) => {
      console.log('get all comapnies');
      this.rows = response;
      this.tempData = this.rows;
      this.kitchenSinkRows = this.rows;
      resolve(this.rows);
    }, reject);
  });
}



  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}




















































