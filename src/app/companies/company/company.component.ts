import { Component, OnInit, NgModule, ViewChild , ElementRef} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CompanyModel } from './CompanyModel';
import * as snippet from 'app/companies/datatables.snippetcode';
import { resolve } from 'dns';
import { rejects } from 'assert';
import { setTimeout } from 'timers';
import {AbstractControl,ValidationErrors, ValidatorFn,} from '@angular/forms';
import Swal from 'sweetalert2';
import { NgSelectConfig, NgSelectModule } from '@ng-select/ng-select';
import { DatePipe } from '@angular/common';
import { startWith, switchMap } from 'rxjs/operators';
import { Observable, Subject, timer } from 'rxjs';
import { ColumnMode, DatatableComponent, id, SelectionType } from '@swimlane/ngx-datatable';
import { Address } from '../address/Address';
import { AddressComponent } from '../address/address.component';
import { CoreTranslationService } from '@core/services/translation.service';
import { AppConfigService } from 'app/services/app-config.service';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  fullScreen = true;
  formatdate = 'dd/MM/yyyy'; 
  myDate=new Date();
  today:Date;
  viewMode: string ;
  activeId:any = 1;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  // showloader:boolean=false;
  isExist: boolean=false;
  isSavebtn: boolean=false;
  submitted: boolean = false;
  CompanyForm:FormGroup;
// compObj: Comp = new Company();
  compObj:CompanyModel = new CompanyModel();
  company: any;
  SalesPerson: any;
  PaymentTerms: any;
  Contact: any;
  CompanyAddress: any;
  GstTreatment: any;
  selectElementText: any;
  ownerid: any;
  cmptypeId = 5;
  selectedindex: any;
  gstTypeId: any;
  gstTypeName: any;
  paymentTermId: any;
  paymentTermLabel: any;
  companydataurlid: any;
  private _unsubscribeAll: Subject<any>;

  private reset$ = new Subject();
  timer$: Observable<any>;
  cmpData:any;
  companyTypeName: any;
  public contentHeader: object;
  public kitchenSinkRows: any;
  private tempData = [];
  public rows: any = [];
  public ColumnMode = ColumnMode;


  private duplicateCompanyDbounce;

   // snippet code variables
   public _snippetCodeKitchenSink = snippet.snippetCodeKitchenSink;
   public _snippetCodeInlineEditing = snippet.snippetCodeInlineEditing;
   public _snippetCodeRowDetails = snippet.snippetCodeRowDetails;
   public _snippetCodeCustomCheckbox = snippet.snippetCodeCustomCheckbox;
   public _snippetCodeResponsive = snippet.snippetCodeResponsive;
   public _snippetCodeMultilangual = snippet.snippetCodeMultilangual;
   public _snippetCodeVertical = snippet.snippetCodeVertical;
   router: any;
  insertedrecord: any=[];
  companyId: any;
  

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;
 
  /**
   * Constructor
   *
   * @param {DatatablesService} _datatablesService
   * @param {CoreTranslationService} _coreTranslationService
   */

  constructor(private fb: FormBuilder, private httpclient : HttpClient,private route:ActivatedRoute, private config: NgSelectConfig,  public datepipe:DatePipe,private _coreTranslationService: CoreTranslationService,private apiConfig:AppConfigService) {
    this._unsubscribeAll = new Subject();

    this.timer$ = this.reset$.pipe(
      startWith(0),
      switchMap(() => timer(0, 1000))
    );
    this.config.notFoundText = 'Custom not found';
    this.config.appendTo = 'body';
    // set the bindValue to global config when you use the same 
    // bindValue in most of the place. 
    // You can also override bindValue for the specified template 
    // by defining `bindValue` as property
    // Eg : <ng-select bindValue="some-new-value"></ng-select>
    this.config.bindValue = 'value';

    
//     this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/Cmp/CompanyLi`).subscribe((response: any) => {
// console.log(response);
// let data=response;
    this.CompanyForm = this.fb.group({
      companyId:0,
      companyName: ['', [Validators.required, Validators.maxLength(100)]],
      companyTypeId: ['',Validators.required],
      ownerId: ['',Validators.required],
      gsttypeId: ['', Validators.required],
      gstin: ['',[Validators.required,Validators.pattern("[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}")]],
      pannumber: ['', [Validators.required,Validators.pattern("[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}")]],
      paymentTermId: [''],
      dateCreated:['']
      // ,Validators.pattern("[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}")
      // PrimaryContacts:[''],
      // PrimaryAddress: ['']
    });
  
   }
    // )}
    // ,[this.uniqueNameValidation(data.map((x) => x.companyName))]
  ngOnInit(): void {
    // this.showloader=true;
    // setTimeout(() => {
    //   this.getDataTableRows();
    // }, 1000);
   this.viewMode='address'
    this.today =new Date();
      this.getCompanyType();
      this.getSalesPerson();
      this.getPaymentTerms();
      this.getGstTreatment();
      this.getDataTableRows();
      
      this.companydataurlid = this.route.snapshot.paramMap.get('id');
      //  alert(this.companydataurlid);
      if(this.companydataurlid)
      {
     this.getCompanyDataById(this.companydataurlid);
       // console.log("myid",this.companydataurlid)

      }
    

      if(this.companydataurlid || this.companyId){
        this.isSavebtn=true;
      }
      else{
        this.isSavebtn=false;
      }
      

      this.contentHeader = {
        headerTitle: 'Company Form ',
        actionButton: true,
        breadcrumb: {
          type: '',
          links: [
            {
              name: 'CompanyList',
              isLink: true,
              link: '/company-list'
            },
            // {
            //   name: 'Forms & Tables',
            //   isLink: true,
            //   link: '/'
            // },
            {
              name: 'Company',
              isLink: false
            }
          ]
        }
      };

  }
  // uniqueNameValidation(names: string[]): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     Swal.fire({
  //       title: 'Company already exist'
  //     })
  //     return !names.find((x) => x == control.value)
  //       ? null
  //       : {
  //           validateName: {
  //             valid: false,
  //           },
  //         };
  //   };
  // }

  get companyName(): AbstractControl {
    return this.CompanyForm.controls.companyName as FormControl;
  }


  getDataTableRows(): Promise<any[]> {
    return new Promise((resolve, reject) => {

      this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/Cmp/${this.companydataurlid}`).subscribe((response: any) => {
        console.log('get all comapnies');
        this.rows = response;
        this.tempData = this.rows;
        this.kitchenSinkRows = this.rows;
        resolve(this.rows);
      }, reject);
    });
  }

  getCompanyDataById(id:any){
    // this.companydataurlid;
    // console.log(companydataurlid);

    // if (rowData.companyTypeName != null) {
    //   this.selectElementText = rowData.companyTypeName;
    //   console.log(this.selectElementText);
    // }
console.log(id,"newid");

    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/Cmp/${id}`,this.headers).subscribe((res: any) => {

  this.cmpData=res;
  console.log("**************",this.cmpData)
  this.rows = this.cmpData;
  this.tempData = this.rows;
  this.kitchenSinkRows = this.rows;
    console.log('cmpData.CompanyId');

    console.log(this.cmpData.companyId);

    this.CompanyForm.patchValue({
      
      companyId:this.cmpData.companyId,
      companyName: this.cmpData.companyName,
      displayName:this.cmpData.displayName,
      companyTypeId: this.cmpData.companyTypeId,
      companyTypeName: this.cmpData.companyTypeName,
      parentCompanyId: this.cmpData.parentCompanyId,
      parentCompanyName: this.cmpData.parentCompanyName,
      gstNumber: this.cmpData.gstNumber,
      gstType: this.cmpData.gstType,
      placeOfSupply: this.cmpData.placeOfSupply,
      website: this.cmpData.website,
   dateCreated: this.cmpData.dateCreated,
      createdBy: this.cmpData.createdBy,
      ownerId:this.cmpData.ownerId,
      gsttypeName:this.cmpData.gsttypeName,
      gstin:this.cmpData.gstin,
      pannumber:this.cmpData.pannumber,
      paymentTermLabel:this.paymentTermLabel,
      paymentTermId:this.cmpData.paymentTermId,
      gsttypeId:this.cmpData.gsttypeId,
    });
  });

    console.log('this.CompanyForm.value PATCH VALUE');
    console.log(this.CompanyForm.value);
    

  }
  onGSTtypeId(event){
    // console.log(event.target.value);
    // this.gstTypeId=event.target.value;


    // console.log(event.target['options'][event.target['options'].gstTypeId].value);
    this.gstTypeId = event.target['options'][event.target['options'].selectedIndex].value;
    console.log(this.gstTypeId);

    this.gstTypeName = event.target['options'][event.target['options'].selectedIndex].text;
    console.log(this.gstTypeName);
    
  }
 onPaymentTerms(event){
    this.paymentTermId = event.target['options'][event.target['options'].selectedIndex].value;
    console.log(this.paymentTermId);

    this.paymentTermLabel = event.target['options'][event.target['options'].selectedIndex].text;
    console.log(this.paymentTermLabel);  
  }

  getSelectedOptionText(event: Event) {


    // this.selectElementText = event.target['options'][event.target['options'].selectedIndex].value;
    console.log(event.target['options'][event.target['options'].selectedIndex].value);
    this.selectedindex=event.target['options'][event.target['options'].selectedIndex].value;
    // this.selectElementText = event.target['options'][event.target['options'].selectElementText].text;
    // console.log(this.selectElementText);
    this.companyTypeName = event.target['options'][event.target['options'].selectedIndex].text;
    console.log(this.companyTypeName);  
  }

  changeWebsite(event){
    console.log(event.target.value);
    this.ownerid=event.target.value;
    
    }
  addCompany(form: FormGroup) {
     this.isSavebtn=true;
    console.log(this.isSavebtn);
    console.log(form.value.companyName);

    this.compObj =
  
    {
    "companyId":0,
    "companyName":form.value.companyName,
    "companyCode":"",
    // "companyTypeId":0,
    // "companyTypeId": this.selectedindex,
    "companyTypeId": form.value.companyTypeId,
    // "companyTypeName": form.value.companyTypeName,
    "companyTypeName": form.value.companyTypeName,
    "parentCompanyId":0,
    "email": "",
    "website":"",
    "notes":"",
    "createdBy":0,
    "dateCreated": new Date().toISOString(),
    "modifiedBy":0,
    "dateModified":new Date().toISOString(),
    "deletedBy": 0,
    "dateDeleted":"2023-03-30T09:17:06.188Z",
    "isDeleted":true,
    "officeId":0,
    "ownerId":form.value.ownerId,
    "companyApprovalStatus": "",
    "cafReceived":true,
    "cafReceivedDate": "2023-03-30T09:17:06.188Z",
    "creditDays":"",
    "mepzCode": "",
    "pannumber":form.value.pannumber,
    "gsttypeId":form.value.gsttypeId,
    "gstin":form.value.gstin,
    "pan":"",
    "paymentTermId": form.value.paymentTermId,
    "paymentTermLabel":form.value.paymentTermLabel,
    "gsttypeName":form.value.gstTypeName,
    "companyType": {
      "companyTypeId":form.value.selectedindex,
      "companyType1":form.value.companyTypeName,
      "isInternal": true,
      "isActive": true
    }
    }
    console.log('this.cmpObj');
    console.log(this.compObj);
    console.log(JSON.stringify(this.compObj));

    //  console.log(myobj);

    this.httpclient.post('${this.apiConfig.apiBaseUrl}/api/Cmp', JSON.stringify(this.compObj), this.headers).subscribe(res => {
      console.log('Success');
      console.log(res);
     
      let data:any=res
      this.insertedrecord.push(data)
      console.log("inserted Record:",this.insertedrecord);
      this.companyId=this.insertedrecord[0].companyId;
       JSON.stringify(this.companyId);
      // alert("companyId="+this.companyId);

      // this.isSavebtn=true;
       console.log(this.isSavebtn);
       Swal.fire({
        title: 'Company Added'
      })

    }, err => {
      console.log('Error');
      console.log(err);
      Swal.fire({
        title: 'Something went wrong'
      })
    });

  }

  updateComapny(form: FormGroup) {
    //  this.isSavebtn=true;
    console.log(this.isSavebtn);
    if (form.value.companyTypeName != null) {
      this.selectElementText = form.value.companyTypeName
    }
    this.compObj =
    
    {
      "companyId":form.value.companyId,
      "companyName":form.value.companyName,
      "companyCode":"",
      // "companyTypeId":0,
      // "companyTypeId": this.selectedindex,
      "companyTypeId": form.value.companyTypeId,
      // "companyTypeName": this.companyTypeName,
      "companyTypeName": form.value.companyTypeName,
      "parentCompanyId":0,
      "email": "",
      "website":"",
      "notes":"",
      "createdBy":0,
      "dateCreated": form.value.dateCreated,
      "modifiedBy":0,
      "dateModified":new Date().toISOString(),
      "deletedBy": 0,
      "dateDeleted":"2023-03-30T09:17:06.188Z",
      "isDeleted":true,
      "officeId":0,
      "ownerId":form.value.ownerId,
      "companyApprovalStatus": "",
      "cafReceived":true,
      "cafReceivedDate": "2023-03-30T09:17:06.188Z",
      "creditDays":"",
      "mepzCode": "",
      "pannumber":form.value.pannumber,
      "gsttypeId":form.value.gsttypeId,
      "gstin":form.value.gstin,
      "pan":"",
      "paymentTermId": form.value.paymentTermId,
      "paymentTermLabel":form.value.paymentTermLabel,
      "gsttypeName":form.value.gstTypeName,
      "companyType": {
        "companyTypeId":form.value.companyTypeId,
        "companyType1":form.value.companyTypeName,
        "isInternal": true,
        "isActive": true
      }
      }
    console.log('this.compObj');

    console.log(JSON.stringify(this.compObj));
// console.log(this.compObj.com)

    this.httpclient.put(`${this.apiConfig.apiBaseUrl}/api/Cmp/${this.compObj.companyId}`, JSON.stringify(this.compObj), this.headers).subscribe(res => {
      console.log(' Update Success');
      console.log(res);
      // this.isSavebtn=true;
      // console.log(this.isSavebtn);
      Swal.fire({
        title: 'Company UPDATE'
      })
    }, err => {
      console.log('Error');
      console.log(err);
      Swal.fire({
        title: 'Something went wrong'
      })
    });

  }
exist(){
  this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/Cmp/check/${this.compObj.companyName}`).subscribe((response: any) => {
    console.log('get company name');
    var res = response;
    console.log(res);
    console.log("res.length",res.length);
 
    if (res.length > 0 &&  this.compObj.companyId ==0) {
      console.log("already exist ");
      Swal.fire({
        title: 'Company Already Exist'
      })
      this.isExist=true;
      return;
      
    }
    if (res.length > 0 &&  this.compObj.companyId > 0 && this.compObj.companyId!=res[0].companyId) {
      console.log("already exist - ");
      this.updateComapny(this.CompanyForm)
      console.log("already exist - update done");

      return;
      
    }
    console.log(res);

    console.log("this.custObj.companyId");
    console.log(this.compObj.companyId);

    if (this.compObj.companyId == 0) {
      console.log("INSERT");
      this.addCompany(this.CompanyForm);
    }
    else {
      console.log("UPDATE");
      this.updateComapny(this.CompanyForm)
    }
});
}

// onClickDefault(){
//   this.showloader = true;
//   this.fullScreen = true;
 
//   // setTimeout(() => {
//   //   this.getDataTableRows();
//   //     this.showloader = false
//   // }, 2000);
// }
  onSubmitService(form: FormGroup) {
    //  this.showloader=true;
    this.compObj = this.CompanyForm.value;
    
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/Cmp/check/${this.compObj.companyName}`).subscribe((response: any) => {
      console.log('get company name');
      var res = response;
      console.log(res);
      console.log("res.length",res.length);
   
      if (res.length > 0 &&  this.compObj.companyId ==0) {
        // this.showloader=false;
        console.log("already exist ");
        // Swal.fire({
        //   title: 'Company Already Exist'
        // })
        this.isExist=true;
        return;
        
      }
      if (res.length > 0 &&  this.compObj.companyId > 0 && this.compObj.companyId!=res[0].companyId) {
        // this.showloader=false;

        console.log("already exist - ");
        this.updateComapny(this.CompanyForm)
        console.log("already exist - update done");

        return;
        
      }
      console.log(res);

      console.log("this.custObj.companyId");
      console.log(this.compObj.companyId);
  
      if (this.compObj.companyId == 0) {
        // this.showloader=false;

        console.log("INSERT");
        this.addCompany(this.CompanyForm);
      }
      else {
        // this.showloader=false;

        console.log("UPDATE");
        this.updateComapny(this.CompanyForm)
      }
      this.resetForm(form);
 });
  }

  collectFormData(){
    console.log(this.CompanyForm.value);
  }

  getCompanyType(){
   
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/CompanyType/CompanyTypeList`).subscribe((response: any) => {
        console.log(response);
        this.company=response;
    })
  }

  getSalesPerson(){

    
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/UserMaster/UserMaster`).subscribe((response: any) => {
        console.log(response);
        this.SalesPerson=response;
    })
  }

getPaymentTerms(){
  this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/PaymentTerms/Payment Terms`).subscribe((response: any) => {
    console.log(response);
    this.PaymentTerms=response;
    })
  }
  getPrimaryContacts(){
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/Contact/Contact`).subscribe((response: any) => {
      console.log(response);
      this.Contact=response;
    })
  }
  getCompanyAddress(){
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/CompanyAddress/CompanyAddress`).subscribe((response: any) => {
      console.log(response);
      this.CompanyAddress=response;
    })
  }
getGstTreatment(){
  this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/GstTypeMaster`).subscribe((response: any) => {
      console.log("gst data",response);
      this.GstTreatment=response;
    })
}
resetForm(form: FormGroup) {

  form.reset();

}

}


function uniqueNameValidation(names: any, arg1: any) {
  throw new Error('Function not implemented.');
}
