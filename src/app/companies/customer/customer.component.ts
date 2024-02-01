import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Company } from './Company';
import * as snippet from 'app/companies/datatables.snippetcode'

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppConfigService } from 'app/services/app-config.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  
  
    CompanyForm:FormGroup;
    compObj: Company = new Company();
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
    cmpData:any;
    companyTypeName: any;
  
  
    
  
    @ViewChild('closeModal') private closeModal: ElementRef;
  
    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('tableRowDetails') tableRowDetails: any;
  
    
    constructor(private fb: FormBuilder, private httpclient : HttpClient,private route:ActivatedRoute,private apiConfig:AppConfigService) {
      this.CompanyForm = this.fb.group({
        companyId:0,
        companyName: ['', Validators.required],
        companyTypeName: ['',Validators.required],
        ownerId: ['',Validators.required],
        gsttypeName: ['', Validators.required],
        gstin: ['',Validators.maxLength(15)],
        pannumber: ['', Validators.maxLength(10)],
        paymentTermLabel: [''],
        // PrimaryContacts:[''],
        // PrimaryAddress: ['']
      })
     }
  
    ngOnInit(): void {
        this.getCompanyType();
        this.getSalesPerson();
        this.getPaymentTerms();
        // this.getPrimaryContacts();
        // this.getCompanyAddress();
        this.getGstTreatment();
        
  
        
        this.companydataurlid = this.route.snapshot.paramMap.get('id');
         console.log(this.companydataurlid);
        if(this.companydataurlid)
        {
       this.getCompanyDataById(this.companydataurlid);
         // console.log("myid",this.companydataurlid)
        }
  
  
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
        paymentTermId:this.paymentTermId
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
  
      console.log(form.value.companyName);
  
      this.compObj =
      // {
        
      //   // "companyId":0,
      //   "companyName":form.value.companyName,
      //   "companyTypeName":form.value.companyTypeName,
      //   "ownerId":this.ownerid,
      //   "gsttypeName":form.value.gsttypeName,
      //   "gstin":form.value.gstin,
      //   "pannumber":form.value.pannumber,
      //   "paymentTermLabel":form.value.paymentTermLabel,
      //   // "PrimaryContacts":form.value.PrimaryContacts,
      //   // "PrimaryAddress":form.value.PrimaryAddress,
        
      // }"
      {
      "companyId":0,
      "companyName":form.value.companyName,
      "companyCode":"",
      // "companyTypeId":0,
      "companyTypeId": this.selectedindex,
      // "companyTypeName": form.value.companyTypeName,
      "companyTypeName": this.companyTypeName,
      "parentCompanyId":0,
      "email": "",
      "website":"",
      "notes":"",
      "createdBy":0,
      "dateCreated": "2023-03-30T09:17:06.188Z",
      "modifiedBy":0,
      "dateModified":"2023-03-30T09:17:06.188Z",
      "deletedBy": 0,
      "dateDeleted":"2023-03-30T09:17:06.188Z",
      "isDeleted":true,
      "officeId":0,
      "ownerId":this.ownerid,
      "companyApprovalStatus": "",
      "cafReceived":true,
      "cafReceivedDate": "2023-03-30T09:17:06.188Z",
      "creditDays":"",
      "mepzCode": "",
      "pannumber":form.value.pannumber,
      "gsttypeId":this.gstTypeId,
      "gstin":form.value.gstin,
      "pan":"",
      "paymentTermId": this.paymentTermId,
      "paymentTermLabel":this.paymentTermLabel,
      "gsttypeName":this.gstTypeName,
      "companyType": {
        "companyTypeId":this.selectedindex,
        "companyType1":this.companyTypeName,
        "isInternal": true,
        "isActive": true
      }
      }
      console.log('this.cmpObj');
      console.log(this.compObj);
      console.log(JSON.stringify(this.compObj));
  
      //  console.log(myobj);
  
      this.httpclient.post(`${this.apiConfig.apiBaseUrl}/api/Cmp`, JSON.stringify(this.compObj), this.headers).subscribe(res => {
        console.log('Success');
        console.log(res);
        // this.resetForm(form);
  
  
  
      }, err => {
        console.log('Error');
        console.log(err);
  
      });
  
    }
  
    updateComapny(form: FormGroup) {
  
      if (form.value.companyTypeName != null) {
        this.selectElementText = form.value.companyTypeName
      }
      this.compObj =
      // {
      //   "companyId":form.value.companyId,
      //   "companyName":form.value.companyName,
      //   "companyCode":"",
      //   "companyTypeId": this.selectedindex,
      //   // "companyTypeName": form.value.companyTypeName,
      //   "companyTypeName": this.selectElementText,
      //   "parentCompanyId":0,
      //   "email": "",
      //   "website":"",
      //   "notes":"",
      //   "createdBy":0,
      //   "dateCreated": "",
      //   "modifiedBy":0,
      //   "dateModified":"2023-03-30T09:17:06.188Z",
      //   "deletedBy": 0,
      //   "dateDeleted":"2023-03-30T09:17:06.188Z",
      //   "isDeleted":true,
      //   "officeId":0,
      //   "ownerId":this.ownerid,
      //   "companyApprovalStatus": "",
      //   "cafReceived":true,
      //   "cafReceivedDate": "2023-03-30T09:17:06.188Z",
      //   "creditDays":"",
      //   "mepzCode": "",
      //   "pannumber":form.value.pannumber,
      //   "gsttypeId":this.gstTypeId,
      //   "gstin":form.value.gstin,
      //   "pan":"",
      //   "paymentTermId": this.paymentTermId,
      //   "paymentTermLabel":this.paymentTermLabel,
      //   "gsttypeName":this.gstTypeName,
      //   "companyType": {
      //     "companyTypeId":this.selectedindex,
      //     "companyType1":this.selectElementText,
      //     "isInternal": true,
      //     "isActive": true
      //   }
      //   }
      {
        "companyId":form.value.companyId,
        "companyName":form.value.companyName,
        "companyCode":"",
        // "companyTypeId":0,
        "companyTypeId": this.selectedindex,
        // "companyTypeName": form.value.companyTypeName,
        "companyTypeName": this.companyTypeName,
        "parentCompanyId":0,
        "email": "",
        "website":"",
        "notes":"",
        "createdBy":0,
        "dateCreated": "2023-03-30T09:17:06.188Z",
        "modifiedBy":0,
        "dateModified":"2023-03-30T09:17:06.188Z",
        "deletedBy": 0,
        "dateDeleted":"2023-03-30T09:17:06.188Z",
        "isDeleted":true,
        "officeId":0,
        "ownerId":this.ownerid,
        "companyApprovalStatus": "",
        "cafReceived":true,
        "cafReceivedDate": "2023-03-30T09:17:06.188Z",
        "creditDays":"",
        "mepzCode": "",
        "pannumber":form.value.pannumber,
        "gsttypeId":this.gstTypeId,
        "gstin":form.value.gstin,
        "pan":"",
        "paymentTermId": this.paymentTermId,
        "paymentTermLabel":this.paymentTermLabel,
        "gsttypeName":this.gstTypeName,
        "companyType": {
          "companyTypeId":this.selectedindex,
          "companyType1":this.companyTypeName,
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
      }, err => {
        console.log('Error');
        console.log(err);
  
      });
  
    }
    onSubmitService(form: FormGroup) {
      console.log(this.CompanyForm.value);
      console.log(this.CompanyForm);
      // console.log(this.compObj.companyId)
      this.compObj = this.CompanyForm.value;
  
  
      if (this.compObj.companyId == 0) {
        console.log("INSERT");
        this.addCompany(this.CompanyForm);
      }
      else {
        console.log("UPDATE");
        this.updateComapny(this.CompanyForm)
  
  
      }
  
    }
    getCompanyType(){
     
      //console.log(form.value.companyType);
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
        console.log(response);
        this.GstTreatment=response;
      })
  }
  resetForm(form: FormGroup) {
  
    form.reset();
  
  }

}

