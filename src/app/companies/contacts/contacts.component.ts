import { Component, OnInit, OnDestroy,ViewEncapsulation, Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as snippet from 'app/companies/datatables.snippetcode';
import { ColumnMode,DatatableComponent,id, SelectionType } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import { from, Observable, Subject, Subscription, timer } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { startWith, switchMap } from 'rxjs/operators';
import { Contact } from './contact';
import { AppConfigService } from 'app/services/app-config.service';



@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  @Input() hero1;

  formatdate = 'dd/MM/yyyy'; 
  myDate=new Date();

  today:Date;

  ContactForm: FormGroup;
  custObj: Contact = new Contact();
  public selected = [];
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public SelectionType = SelectionType;
  tempData= [];
  rows: any;
  public ColumnMode = ColumnMode;
  companydataurlid: any;

  // private reset$ = new Subject();
  // timer$: Observable<any>;
  // subscription: Subscription;



  @ViewChild('closeModal') private closeModal: ElementRef;

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
    //  console.log(d.firstName);
      return d.firstName.toLowerCase().indexOf(val) !== -1 || !val;
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
    this.ContactForm = this.fb.group({
      contactId: 0,
      salutation: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.maxLength(35)]],
      middleName: ['', [Validators.required, Validators.maxLength(35)]],
      lastName: ['', [Validators.required, Validators.maxLength(35)]],
      email: ['',[ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ], Validators.maxLength(100)],
      mobile:['',[ Validators.required, Validators.pattern("[0-9]{10}"), Validators.maxLength(10)]],
      phone:['', [Validators.required, Validators.pattern("[0-9]{10}"), Validators.maxLength(10)]],
      department:['', Validators.required],
      dateCreated: [''],
      dob:['',[ Validators.required]]
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
  

  constructor( private httpclient: HttpClient, private fb: FormBuilder, private modalService: NgbModal, public datepipe:DatePipe, private route:ActivatedRoute,private apiConfig:AppConfigService)  {

    this.ContactForm = this.fb.group({
      contactId: 0,
      salutation: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.maxLength(35)]],
      middleName: ['', [Validators.required, Validators.maxLength(35)]],
      lastName: ['', [Validators.required, Validators.maxLength(35)]],
      email: ['',[ Validators.required]],
      mobile:['',[ Validators.required, Validators.pattern("[0-9]{10}")]],
      phone:['', [Validators.required, Validators.pattern("[0-9]{10}")]],
      department:['', Validators.required],
      dateCreated: [''],
      dob:['',[ Validators.required]]
    });

    // this.timer$ = this.reset$.pipe(
    //   startWith(0),
    //   switchMap(() => timer(0, 1000))
    // );
   }

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

    if (rowData.firstName != null) {
      this.selectElementText = rowData.firstName;
    }

    console.log('rowData.contactId');

    console.log(rowData.contactId);

    this.ContactForm.patchValue({
      
      contactId:rowData.contactId,
      salutation: rowData.salutation,
      firstName:rowData.firstName,
      middleName: rowData.middleName,
      lastName: rowData.lastName,
      email: rowData.email,
      mobile: rowData.mobile,
      phone: rowData.phone,
      department: rowData.department,
     dateCreated: rowData.dateCreated,
    dob: '',
    //  dob:rowData.dob
    // dob:this.datepipe.transform(rowdata.dob, 'yyyy-MM-dd')
    // salesQuoteDate:this.datepipe.transform(this.mydta.salesQuoteDate,'yyyy-MM-dd')
    
    });

    console.log('this.ContactForm.value PATCH VALUE');
    console.log(this.ContactForm.value);
    

  }
  ngOnInit(): void {
    
    this.today =new Date();
    console.log(new Date().toISOString());
  
    console.log("contact start: ",this.hero1);
 
    this.companydataurlid = this.route.snapshot.paramMap.get('id');
    
    console.log(this.companydataurlid);
   if(this.companydataurlid)
   {
    this.getDataTableRows( this.companydataurlid);
  //this.getCompanyDataById(this.companydataurlid);
    // console.log("myid",this.companydataurlid)
   }
   
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
  this.httpclient.delete(`${this.apiConfig.apiBaseUrl}/api/Contacts/${id}`).subscribe((Success: any) => {
       console.log('delete row');
       console.log(id);

       this.getDataTableRows(this.companydataurlid||this.hero1);
    });
}
  add(form: FormGroup)
  {

    if(this.companydataurlid||this.hero1){

    console.log(form.value.contactId);
    console.log(this.companydataurlid);
    // this.getDataTableRows(this.companydataurlid);
    this.custObj =
    {
      "contactId":0,
        "companyId":Number(this.companydataurlid ||this.hero1),
        "contactTypeId":0,
        "displayName":"",
        "reportsTo": 0,
        "addressId": 0,
        "notes":"",
        "createdBy": 0,
        "modifiedBy": 0,
        "dateModified": "2023-04-04T04:58:52.853Z",
        "deletedBy": 0,
        "dateDeleted": "2023-04-04T04:58:52.853Z",
        "isDeleted":true,
        "dob": form.value.dob,
        
        "salutation": form.value.salutation,
        "firstName": form.value.firstName,
        "middleName": form.value.middleName,
        "lastName": form.value.lastName,
        "email": form.value.email,
        "mobile":form.value.mobile,
        "phone": form.value.phone,
        "department": form.value.department,
        "dateCreated":new Date().toISOString(),
    }

    console.log('this.custObj');
    console.log(this.custObj);
    console.log(JSON.stringify(this.custObj));
    

    this.httpclient.post(`${this.apiConfig.apiBaseUrl}/api/Contacts`, JSON.stringify(this.custObj), this.headers).subscribe(res => {
      console.log('Success');
      console.log(res);
      this.resetForm(form);
      this.getDataTableRows(this.companydataurlid);

    }, err =>{
      console.log('Error');
      console.log(err);

    });
    
    this.resetForm;


  }

  // if(this.hero1){

  //   console.log(form.value.contactId);
  //   console.log(this.hero1);
  //   this.getDataTableRows(this.companydataurlid);
  //   this.custObj =
  //   {
  //     "contactId":0,
  //       "companyId":Number(this.hero1 ),
  //       "contactTypeId":0,
  //       "displayName":"",
  //       "reportsTo": 0,
  //       "addressId": 0,
  //       "notes":"",
  //       "createdBy": 0,
  //       "modifiedBy": 0,
  //       "dateModified": "2023-04-04T04:58:52.853Z",
  //       "deletedBy": 0,
  //       "dateDeleted": "2023-04-04T04:58:52.853Z",
  //       "isDeleted":true,
  //       "dob": form.value.dob,
        
  //       "salutation": form.value.salutation,
  //       "firstName": form.value.firstName,
  //       "middleName": form.value.middleName,
  //       "lastName": form.value.lastName,
  //       "email": form.value.email,
  //       "mobile":form.value.mobile,
  //       "phone": form.value.phone,
  //       "department": form.value.department,
  //       "dateCreated":new Date().toISOString(),
  //   }

  //   console.log('this.custObj');
  //   console.log(this.custObj);
  //   console.log(JSON.stringify(this.custObj));

  //   this.httpclient.post(`${this.apiConfig.apiBaseUrl}/api/Contacts`, JSON.stringify(this.custObj), this.headers).subscribe(res => {
  //     console.log('Success');
  //     console.log(res);
  //     this.resetForm(form);
  //     this.getDataTableRows(this.hero1);

  //   }, err =>{
  //     console.log('Error');
  //     console.log(err);

  //   });
    
  //   this.resetForm;
  //   this.modalService.dismissAll();

  // }

  }

    onSubmitService(form: FormGroup) {

      // this.success();
      console.log( this.ContactForm.value);

      this.custObj=this.ContactForm.value;

      console.log('this.custObj');
      console.log( this.custObj);

      console.log("companydataurlid");
      console.log(this.companydataurlid);
          
      console.log("this.custObj.contactId");
      console.log(this.custObj.contactId);

      if(this.custObj.contactId==0){
        console.log("INSERT");
        this.add(this.ContactForm);
      this.success();
      console.log(this.custObj.contactId);
      // this.ContactForm.reset();
      // this.resetForm;
      // this.clear();
      this.changeLocation;
      }
      else
    
      {
      //  this.ContactForm.reset();
        console.log("UPDATE");
      this.UpdateContact(this.ContactForm)
        this.success();

        console.log(this.custObj.contactId);
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
  this.ContactForm;
}
changeLocation(locationData) {

  // save current route first
  const currentRoute = this.router.url;

  this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); // navigate to same route
  }); 
}


UpdateContact(form: FormGroup) {
  size: 'lg'
  // if (form.value.contactId != null) {
  //   this.selectElementText = form.value.contactId
  // }
// this.clear();

  this.custObj =


    {
      "contactId":form.value.contactId,
      "companyId":Number(this.companydataurlid),
      "contactTypeId":0,
      "displayName":"",
      "reportsTo": 0,
      "addressId": 0,
      "notes":"",
      "createdBy": 0,
      "modifiedBy": 0,
      "dateModified": "2023-04-04T04:58:52.853Z",
      "deletedBy": 0,
      "dateDeleted": "2023-04-04T04:58:52.853Z",
      "isDeleted":true,
      "dob": form.value.dob,
      
      "salutation": form.value.salutation,
      "firstName": form.value.firstName,
      "middleName": form.value.middleName,
      "lastName": form.value.lastName,
      "email": form.value.email,
      "mobile":form.value.mobile,
      "phone": form.value.phone,
      "department": form.value.department,
      "dateCreated":form.value.dateCreated,
      
      
     
    }
  

  console.log('this.custObj');

  console.log(JSON.stringify(this.custObj));


  this.httpclient.put(`${this.apiConfig.apiBaseUrl}/api/Contacts/${this.custObj.contactId}`, JSON.stringify(this.custObj), this.headers).subscribe(res => {
    console.log(' Update Success');
    this.resetForm(form);
    this.getDataTableRows(this.companydataurlid);
    console.log(res);
  }, err => {
    console.log('Error');
    console.log(err);

  });

}


// getDataTableRowsdisplay(): Promise<any[]> {
//   return new Promise((resolve, reject) => {

//     this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/Contacts/Contact`).subscribe((response: any) => {
//       console.log('get all comapnies');
//       this.rows = response;
//       this.tempData = this.rows;
//       this.kitchenSinkRows = this.rows;
//       resolve(this.rows);
//     }, reject);
//   });
// }

getDataTableRows(id:any): Promise<any[]> {
  return new Promise((resolve, reject) => {
console.log("getbyid",id);
// http://localhost:5014/api/Contacts/GetContactbyCmpID?id=12
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/Contacts/GetContactbyCmpID?id=${id}`).subscribe((response: any) => {
      console.log('get all contacts by id');
      this.rows = response;
      this.tempData = this.rows;
      this.kitchenSinkRows = this.rows;
      resolve(this.rows);
      console.log(this.rows)

    }, reject);
  });
}

  ngOnDestroy() {
    // if (this.subscription) {
    //   this.subscription.unsubscribe();
    // }
  }


}

