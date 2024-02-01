import { Component, OnInit, OnDestroy,ViewEncapsulation, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Address } from './Address';
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
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  @Input() hero;
  formatdate = 'dd/MM/yyyy'; 
  myDate=new Date();

  today:Date;
  
  AddressForm: FormGroup;

  companydataurlid: any;
  cmpData:any;
  AddressObj: Address=new Address();
  public selected = [];
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public SelectionType = SelectionType;
  tempData= [];
  rows: any;
  public ColumnMode = ColumnMode;
  countryId:any;
  country:any;
  stateName:any;
  countryget: any;

  private reset$ = new Subject();
  timer$: Observable<any>;
  subscription: Subscription;


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
  cmptypeId: 5;
  selectElementText: "Select Address";
  someSubscription: any;
  router: any;


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
  stateNameGet: any;
  state: any;
  


  modalOpenForm(modalForm) {
    size:'lg'
    // alert(this.country);
    // this.modalService.open(modalForm);
    this.AddressForm = this.fb.group({

      companyAddressId:0,
      addressTypeNick:[''],
      countryId:[''],
      country:[''],
      stateId:[''],
      stateName:[''],
      cityName:[''],
      addressLine1:[''],
      addressLine2:[''],
      zipcode:[''],
      formattedAddress:[''],
      phone1:[''],
      phone2:[''],
      dateCreated: [''],
  
    });
    console.log("country modal====",this.country)
    this.openModal(modalForm)

  }

  openModal(targetModal) {
    // alert(this.country);
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
  }
  

  constructor( private httpclient: HttpClient, private fb: FormBuilder, private modalService: NgbModal, public datepipe:DatePipe,private route:ActivatedRoute,private apiConfig:AppConfigService) {
    this.AddressForm = this.fb.group({
      companyAddressId:0,
      addressTypeNick:['',[Validators.maxLength(30)]],
      countryId:[''],
      // country:[''],
      stateId:[''],
      stateName:[''],
      cityName:['',[Validators.maxLength(50)]],
      addressLine1:['',[Validators.maxLength(50)]],
      addressLine2:['',[Validators.maxLength(50)]],
      zipcode:[''],
      formattedAddress:['',[Validators.maxLength(500)]],
      phone1:[''],
      phone2:[''],
      dateCreated: [''],

    });

    this.timer$ = this.reset$.pipe(
      startWith(0),
      switchMap(() => timer(0, 1000))
    );

   }
   onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

   populateForm(rowData, modalForm) {
    // rowData.country=""
    size: 'lg'
    // alert(JSON.stringify(rowData.country));
    console.log('get all*****************');
    console.log(rowData);

    this.country=rowData.country;
// assign country to row
this.stateName=rowData.stateName;
    this.modalService.open(modalForm, {windowClass: 'modalForm', size:'lg'});

    if (rowData.addressTypeNick != null) {
      this.selectElementText = rowData.addressTypeNick;
      console.log(this.selectElementText);
    }
    console.log("modal country",this.country)
    console.log('rowData.addressTypeNick');
    console.log(rowData.addressTypeNick);

    console.log('rowData.country');
    console.log(rowData.country);

    console.log('rowData.stateName');
    console.log(rowData.stateName);


    this.AddressForm.patchValue({
      
      companyAddressId:rowData.companyAddressId,
      addressTypeNick:rowData.addressTypeNick,
      countryId:rowData.countryId,
      // country:rowData.country,
      stateId:rowData.stateId,
      stateName:rowData.stateName,
      cityName:rowData.cityName,
      addressLine1:rowData.addressLine1,
      addressLine2:rowData.addressLine2,
      zipcode:rowData.zipcode,
      formattedAddress:rowData.formattedAddress,
      phone1:rowData.phone1,
      phone2:rowData.phone2,
       dateCreated: rowData.dateCreated,

    });

    console.log('this.AddressForm.value PATCH VALUE');
    console.log(this.AddressForm.value);
    

  }

  ngOnInit(): void {
    this.today =new Date();
    this.hero;
    console.log('!!!!!!!!!',this.hero);
    this.getCountryId();
    this.getCountry();
    this.getStateName();

  //   console.log(new Date().toISOString());
  //   console.log(new Date().toDateString());
  //   console.log(new Date().toLocaleDateString());
  //   console.log(new Date().toLocaleString());
  // console.log(new Date().toLocaleTimeString());
  //   console.log(new Date().getTimezoneOffset());
    // this.getDataTableRows();
    this.subscription = this.timer$.subscribe((i) => {
    //  console.log('timer: ', i);
    
    });


      this.companydataurlid = this.route.snapshot.paramMap.get('id');
       console.log(this.companydataurlid);
      if(this.companydataurlid)
      {
     this.add(this.companydataurlid);
       // console.log("myid",this.companydataurlid)
      }

  }
  resetForm(form: FormGroup) {

    form.reset();

  }

  onchage(event){
    console.log('event onchange');
    console.log("countryName======",event.countryName);
    this.country=event.countryName;
    //   console.log("countryId",event.target.value);
    // this.country=event.target.value;
    
    
    }
    onchangeState(event){
      console.log("stateName=================",event.stateName);

      this.state=event.stateName;
      //   console.log("countryId",event.target.value);
      // this.country=event.target.value;
      
      
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
  this.httpclient.delete(`${this.apiConfig.apiBaseUrl}/api/CompanyAddress/${id}`).subscribe((Success: any) => {
       console.log('delete row');
       console.log(id);

       this.getDataTableRows(id);
    });

}
add(form: FormGroup)
{
if(this.companydataurlid){
  // console.log(form.value.companyAddressId);
  console.log(this.companydataurlid);
  this.getDataTableRows(this.companydataurlid);
  this.getCountryId();
  this.getCountry();
  this.getStateName();
  this.AddressObj =
  {
    "companyAddressId": 0,
    "companyId":Number(this.companydataurlid),
    "contactId": null,
    "addressTypeId": 0,
    "addressTypeNick":form.value.addressTypeNick,
    "countryId":  Number(form.value.countryId),
    "country": this.country,
    "stateId":  Number(form.value.stateId),
    "stateName": this.state,
    "cityId": null,
    "cityName": form.value.cityName,
    "addressLine1":form.value.addressLine1,
    "addressLine2": form.value.addressLine2,
    "zipcode": form.value.zipcode,
    "relatedPortId": null,
    "relatedAirportId": null,
    "formattedAddress": form.value.formattedAddress,
    "createdBy": 0,
    "dateCreated":new Date().toISOString(),
    "modifiedBy": null,
    "dateModified": null,
    "deletedBy": null,
    "dateDeleted": null,
    "isDeleted": false,
    "phone1": form.value.phone1,
    "phone2": form.value.phone2,
    "faxnumber": null,
    "gstnumber": "",
    "city": null,
    "company": null,
    "countryNavigation": null,
    "relatedAirport": null,
    "relatedPort": null,
    "state": null
  }

  console.log('this.AddressObj');
  console.log(this.AddressObj);
  console.log(JSON.stringify(this.AddressObj));

  //  console.log(myobj);

  this.httpclient.post(`${this.apiConfig.apiBaseUrl}/api/CompanyAddress`, JSON.stringify(this.AddressObj), this.headers).subscribe(res => {
    console.log('Success');
    console.log(res);
    this.resetForm(form);
    this.getDataTableRows(this.companydataurlid);

  }, err =>{
    console.log('Error');
    console.log(err);

  });
}
if(this.hero){
  // console.log(form.value.companyAddressId);
  console.log(this.companydataurlid);
  this.getDataTableRows(this.companydataurlid);

  this.AddressObj =
  {
    "companyAddressId": 0,
    "companyId":Number(this.companydataurlid),
    "contactId": null,
    "addressTypeId": 0,
    "addressTypeNick":form.value.addressTypeNick,
    "countryId":  Number(form.value.countryId),
    "country": this.country,
    "stateId":  Number(form.value.stateId),
    "stateName": this.state,
    "cityId": null,
    "cityName": form.value.cityName,
    "addressLine1":form.value.addressLine1,
    "addressLine2": form.value.addressLine2,
    "zipcode": form.value.zipcode,
    "relatedPortId": null,
    "relatedAirportId": null,
    "formattedAddress": form.value.formattedAddress,
    "createdBy": 0,
    "dateCreated":new Date().toISOString(),
    "modifiedBy": null,
    "dateModified": null,
    "deletedBy": null,
    "dateDeleted": null,
    "isDeleted": false,
    "phone1": form.value.phone1,
    "phone2": form.value.phone2,
    "faxnumber": null,
    "gstnumber": "",
    "city": null,
    "company": null,
    "countryNavigation": null,
    "relatedAirport": null,
    "relatedPort": null,
    "state": null
  }

  console.log('this.AddressObj');
  console.log(this.AddressObj);
  console.log(JSON.stringify(this.AddressObj));

  //  console.log(myobj);

  this.httpclient.post(`${this.apiConfig.apiBaseUrl}/api/CompanyAddress`, JSON.stringify(this.AddressObj), this.headers).subscribe(res => {
    console.log('Success');
    console.log(res);
    this.resetForm(form);
    this.getDataTableRows(this.hero);

  }, err =>{
    console.log('Error');
    console.log(err);

  });
}
  this.resetForm;
  this.modalService.dismissAll();
}

  onSubmitService(form: FormGroup) {

    // this.success();
    console.log( this.AddressForm.value);

    this.AddressObj=this.AddressForm.value;

    console.log('this.AddressObj');
    console.log( this.AddressObj);

    
    console.log("companydataurlid");
    console.log(this.companydataurlid);    

    console.log("this.AddressObj.companyAddressId*******");
    console.log(this.AddressObj.companyAddressId);

    if(this.AddressObj.companyAddressId==0){
      console.log('!!!!!!!!!',this.hero);
      console.log("INSERT");
      this.add(this.AddressForm);
    this.success();
    console.log(this.AddressObj.companyAddressId);
    // this.AddressForm.reset();
    // this.resetForm;
    // this.clear();
    this.changeLocation;
    }
    else
  
    {
    //  this.AddressForm.reset();
      console.log("UPDATE");
     this.UpdateAddress(this.AddressForm)
      this.success();

      console.log(this.AddressObj.companyAddressId);
    }
    this.resetForm(form);
  
    this.modalService.dismissAll();
    // this.country=""
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
  this.AddressForm;
}




changeLocation(locationData) {

  // save current route first
  const currentRoute = this.router.url;

  this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); // navigate to same route
  }); 
}


UpdateAddress(form: FormGroup) {
  
  // this.getCountryId();
  // this.getCountry();
  // this.getStateName();
  size: 'lg'
  // if (form.value.companyId != null) {
  //   this.selectElementText = form.value.companyId
  // }
// this.clear();
console.log("my object",form.value)

console.log("Country Before update");
console.log(this.country);
  this.AddressObj =
  {
    "companyAddressId": form.value.companyAddressId,
    "companyId":Number(this.companydataurlid),
    "contactId": null,
    "addressTypeId": 0,
    "addressTypeNick":  form.value.addressTypeNick,
    "countryId":  form.value.countryId,
    "country": this.country,
    "stateId":  form.value.stateId,
    "stateName": this.state,
    "cityId": null,
    "cityName": form.value.cityName,
    "addressLine1":form.value.addressLine1,
    "addressLine2": form.value.addressLine2,
    "zipcode": form.value.zipcode,
    "relatedPortId": null,
    "relatedAirportId": null,
    "formattedAddress": form.value.formattedAddress,
    "createdBy": 0,
    "dateCreated": form.value.dateCreated,
    "modifiedBy": null,
    "dateModified": null,
    "deletedBy": null,
    "dateDeleted": null,
    "isDeleted": false,
    "phone1": form.value.phone1,
    "phone2": form.value.phone2,
    "faxnumber": null,
    "gstnumber": "",
    "city": null,
    "company": null,
    "countryNavigation": null,
    "relatedAirport": null,
    "relatedPort": null,
    "state": null
  }

  console.log('this.AddressObj');

  console.log(JSON.stringify(this.AddressObj));


  this.httpclient.put(`${this.apiConfig.apiBaseUrl}/api/CompanyAddress/${this.AddressObj.companyAddressId}`, JSON.stringify(this.AddressObj), this.headers).subscribe(res => {
    console.log(' Update Success');
    this.resetForm(form);
    this.getDataTableRows(this.companydataurlid);
    console.log(res);
  }, err => {
    console.log('Error');
    console.log(err);

  });
  // this.getDataTableRows(id);

}

collectFormData(){
  console.log(this.AddressForm.value);
}


getDataTableRows(id:any): Promise<any[]> {
//  alert("get all Addresses id"+id)
  return new Promise((resolve, reject) => {
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/CompanyAddress/${id}`).subscribe((response: any) => {
      console.log('get all Addresses',this.rows);
      this.rows = response;
      this.tempData = this.rows;
      this.kitchenSinkRows = this.rows;
      resolve(this.rows);
    }, reject);
  });

}

getCountryId(){
  this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/Counry`).subscribe((response: any) => {
    // console.log(response);
    this.countryId=response;
  })
}


getCountry(){
  this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/Counry`).subscribe((response: any) => {
    // console.log(response);
    this.countryget=response;
  })
}

getStateName(){
  this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/CountryStateMaster`).subscribe((response: any) => {
    // console.log(response);
    this.stateNameGet=response;
  })
}


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

 
}






















































