
import { Component, OnInit, OnDestroy,ViewEncapsulation, Input, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as snippet from 'app/companies/datatables.snippetcode';
import { ColumnMode,id, SelectionType } from '@swimlane/ngx-datatable';
import { DatatableComponent } from '@swimlane/ngx-datatable';
// import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { from, Observable, Subject, Subscription, timer } from 'rxjs';
import { clear, Console } from 'console';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { startWith, switchMap } from 'rxjs/operators';
import { SaleQuates } from 'app/pricing/saleQuates';
import{SharedSalesQuoteDataService} from 'app/services/shared-sales-quote-data.service';
import { AppConfigService } from 'app/services/app-config.service';


@Component({
  selector: 'app-sales-quote-form',
  templateUrl: './sales-quote-form.component.html',
  styleUrls: ['./sales-quote-form.component.scss']
})
export class SalesQuoteFormComponent implements OnInit {


  SalesQuoteForm:FormGroup
  SalesQuoteDetailsForm:FormGroup;
  fg: FormGroup;
  userdata: any;
  companyname: any;
  contacts: any;
  salequatesObj: SaleQuates = new SaleQuates();
  salequate: { SalesQuoteNumber: any; SaleQuoteDate: any; SaleQuoteType: any; SalePersonDisplayName: any; Modeoftransport: any; Direction: any; CompanyDisplayName: any; ContactDisplayName: any; EnquiryReceivedDate: any; ExpiryDate: any; };
  enquiryDateyear: any;
  enquiryDatemonth: any;
  enquiryDateday: any;
  enquiryd: any;
  expiryd: string;
  salequatesyear: any;
  salequatesmonth: any;
  salequatesd: string;
  salequatesday: any;
  salesPersonId: any;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  salesdata: any;
  id: any;
  salesdataurlid: any;
  mydta: any;
  companyId: any;
  contactId: any;
  salesPersonIdname: any;
  companyIdname: any;
  contactname: any;
  companyaddress:any;
  isqoatesdetailbtn: boolean;
  isdispalyQuoteDetailList: boolean;
  islisdispaly:boolean;
  locationmaster: any;
  oceanmaster: any;
  carrierId: any;
  carriername: any;
  polId: any;
  polname: any;
  podId: any;
  podname: any;
  // data:any="XLPXLSJ";
  formatdate = 'dd/MM/yyyy'; 
  myDate=new Date();
  today:Date;
  
  @ViewChild('closeModal') closeModal:ElementRef;
  quotedetailObj: any;
  SaleDetailList: any;
  rows: any;
  tempData: any;
  kitchenSinkRows: any;
  sharedData: any;


  @ViewChild('startPicker') pickerStart;
  @ViewChild('endPicker') pickerEnd;

  insertedrecord:any= [];
  sqID: any;
  saleQuoteNumberArr: any=[];
  transportMode: any;
  isunique: boolean=false;
  direction: any;
  err: boolean;
  customeraddr: any;
  prepareby: any;
  moveTypeMasetr: any;
  incotermMastr: any;
  vesselMastr: any;
  vesselname: any;
  typeofmove: any;
  incotermName: any;
  finaldestName: any;
  typeofmoveName: any;
  transshipment: any;
  originName: any;
  constructor( private httpclient: HttpClient,private fb: FormBuilder,private toastr: ToastrService,private modalService: NgbModal,private router:Router,private route: ActivatedRoute,private sharedService: SharedSalesQuoteDataService,public datepipe: DatePipe,private apiConfig:AppConfigService)  {
   
  }
  modalForm: any;
 
  modalOpenForm(modalForm1) {
    // alert("modal")
    this.modalService.open(modalForm1,{ size: 'lg', backdrop: 'static' });
    // this.islisdispaly=false;
    //bind data to drp
    this.getAllLoctionMaster();
    this.getAllOceanLineMaster();
    this.getTypeOfMove();
    this.getVessel()
    this.getIncoTerm()
    this.mymodalForm();
    this.SalesQuoteDetailsForm.setValidators(this.comparisonValidator())
  }
   //Create required field validator for name
   myForm() {
    this.SalesQuoteForm = new FormGroup({
      salesQuoteId:new FormControl(0),
      salesQuoteNumber: new FormControl('',Validators.required),
      salesQuoteDate:new FormControl('',[Validators.required, this.dateRangeValidator]),
      salesQuoteType:new FormControl('',Validators.required),
      salesPersonId:new FormControl('',Validators.required),
      salesPersonDisplayName:new FormControl(''),
      modeoftransport:new FormControl('',Validators.required),
      direction:new FormControl('',Validators.required),
      companyId:new FormControl('',Validators.required),
      companyDisplayName:new FormControl(''),
      contactId:new FormControl('',Validators.required),
      contactDisplayName:new FormControl(''),
      expiryDate:new FormControl('',[Validators.required, this.dateRangeValidator]),
      enqReceivedDate:new FormControl('',Validators.required),
      revisionId:new FormControl(1,Validators.required),
      commodity:new FormControl('',Validators.required),
      dateCreated:new FormControl(new Date()),
      salesQuoteStatus:new FormControl('',Validators.required),
      companyAddressId:new FormControl(0,Validators.required),
      companyAddress:new FormControl(''),
      preparedBy:new FormControl(0,Validators.required),
      preparedByDislayName:new FormControl(''),
      requiredEquipment:new FormControl('',Validators.required),
      volume:new FormControl(0,Validators.required),
      grossWeight:new FormControl(0,Validators.required),
      isHazardous:new FormControl(''),
      showTax:new FormControl(''),
      termsConditions:new FormControl(''),
      showTotal:new FormControl(''),
      showCarrier:new FormControl(''),

     });
    }
   //Create required field validator for name
   mymodalForm() {
   
    this.SalesQuoteDetailsForm = this.fb.group({
      salesQuoteID:[this.salesdataurlid],
      salesQuoteDetailId:[0],
      sortOrder: ['', Validators.required ],
      polid:[0,Validators.required ],
      pol:[''],
      podid:[0, Validators.required ],
      pod:[''],
      carrierId:[0, Validators.required ],
      carrier:[''],
      transitTime:['', Validators.required ],
      incoTerm:['', Validators.required ],
      notes:['', Validators.required ],
      placeOfOriginId: [0,Validators.required ],
      placeOfOrigin: [''],
      pot1id: [0,Validators.required ],
      pot1:[''],
      placeOfDeliveryId: [0,Validators.required],
      placeOfDelivery: [''],
      freeTime:['', Validators.required ],
      typeOfMove:['', Validators.required ],
      vesselId: [0, Validators.required],
      vesselName: [''],
    });
 }
  ngOnInit(): void {

    this.getAllSaleQuates();
    this.getAllSalesPersonNames();
    this.getAllCompanyNames();
    this.getAllContacts();

    this.myForm();
    this.salesdataurlid = this.route.snapshot.paramMap.get('id');
    this.transportMode=this.SalesQuoteForm.value.modeoftransport;
    if(this.salesdataurlid)
    {
      this.getSalesDataById(this.salesdataurlid);
      this.getallSalesQuoteDetailsList(this.salesdataurlid);
      // this.SaleDetailList=this.getallSalesQuoteDetailsList(this.salesdataurlid);
      this.transportMode=this.SalesQuoteForm.value.modeoftransport;
      console.log("List",this.SaleDetailList)
      this.isqoatesdetailbtn=true;
      this.islisdispaly=true
    }
    else{
      // this.islisdispaly=false;
      this.isqoatesdetailbtn=false;
    }
    
    this.today =new Date();
    // console.log(new Date().toISOString());
  }

  // get data by id (bind to form)
  getSalesDataById(id:any){
    // this.getAllSalesPersonNames();
    // this.getAllCompanyNames();
    // this.getAllContacts();
 
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/SalesQuotes/${id}`,this.headers).subscribe((res: any) => {
          this.mydta=res;
          console.log("mydatabyid",this.mydta)
          this.transportMode=this.mydta.modeoftransport
          this.direction=this.mydta.direction
          this.getAllCompanyAddress(this.mydta.companyId)
         this.SalesQuoteForm.patchValue({
          salesQuoteID:id,
          salesQuoteNumber: this.mydta.salesQuoteNumber,
          salesQuoteDate:this.datepipe.transform(this.mydta.salesQuoteDate,'yyyy-MM-dd'),
          salesQuoteType:this.mydta.salesQuoteType,
          salesPersonId:this.mydta.salesPersonId,
          salesPersonDisplayName:this.mydta.salesPersonDisplayName,
          modeoftransport:this.mydta.modeoftransport,
          direction:this.mydta.direction,
          companyId:this.mydta.companyId,
          companyDisplayName:this.mydta.companyDisplayName,
          contactId:this.mydta.contactId,
          contactDisplayName:this.mydta.contactDisplayName,
          expiryDate:this.datepipe.transform(this.mydta.expiryDate,'yyyy-MM-dd'),
          enqReceivedDate:this.datepipe.transform(this.mydta.enqReceivedDate,'yyyy-MM-dd'),
          revisionId:this.mydta.revisionId,
          commodity:this.mydta.commodity,
          dateCreated:this.mydta.dateCreated,
          dateModified:this.mydta.dateModified,
          salesQuoteStatus:this.mydta.salesQuoteStatus,
          companyAddressId:this.mydta.companyAddressId,
          companyAddress:this.mydta.companyAddress,
          preparedBy:this.mydta.preparedBy,
          preparedByDislayName: this.mydta.preparedByDislayName,
          requiredEquipment:this.mydta.requiredEquipment,
          volume:this.mydta.volume,
          grossWeight:this.mydta.grossWeight,
          isHazardous:this.mydta.isHazardous,
          showTax:this.mydta.showTax,
          termsConditions:this.mydta.termsConditions,
          showTotal:this.mydta.showTotal,
          showCarrier:this.mydta.showCarrier,
        });
        // console.log("mydatabyid",this.SalesQuoteForm.value)
        });
  }

  //get all sales person name
  getAllSaleQuates():Promise<any[]>{
      return new Promise((resolve, reject) => {
      this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/SalesQuotes`).subscribe((response: any) => {
        this.salesdata=response;
        // console.log("******",this.salesdata)
        for(let i=0;i<this.salesdata.length;i++){
          this.saleQuoteNumberArr.push(this.salesdata[i]);
        }
        // console.log(this.saleQuoteNumberArr);
      }, reject);
    });
  }

//get all sales person name
  getAllSalesPersonNames():Promise<any[]>{
      return new Promise((resolve, reject) => {
      this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/UserMaster`).subscribe((response: any) => {
        this.userdata=response;
        // console.log(this.userdata)
      }, reject);
    });
  }

  //get all companyes name
  getAllCompanyNames():Promise<any[]>{
      return new Promise((resolve, reject) => {
      this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/Companies`).subscribe((response: any) => {
        this.companyname=response;
        // console.log(this.companyname)
      }, reject);
    });
  } 

  

  //get all companyes name
  getAllContacts():Promise<any[]>{
    return new Promise((resolve, reject) => {
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/Contacts/Contact`).subscribe((response: any) => {
      this.contacts=response;
       console.log(this.contacts)
    }, reject);
  });
} 

//get all Location Details
getAllLoctionMaster():Promise<any[]>{
  return new Promise((resolve, reject) => {
  this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/LocationMaster`).subscribe((response: any) => {
    this.locationmaster=response;
     console.log("location",this.locationmaster)
  }, reject);
});
} 

//get all Location Details
getAllOceanLineMaster():Promise<any[]>{
  return new Promise((resolve, reject) => {
  this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/OceanLineMaster`).subscribe((response: any) => {
    this.oceanmaster=response;
     console.log("oceanLine",this.oceanmaster)
  }, reject);
});
} 

//get all Type Of Move
getTypeOfMove():Promise<any[]>{
  return new Promise((resolve, reject) => {
  this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/MoveType`).subscribe((response: any) => {
    this.moveTypeMasetr=response;
     console.log("moveTypeMasetr",this.moveTypeMasetr)
  }, reject);
});
}

//get all Type Of Move
getVessel():Promise<any[]>{
  return new Promise((resolve, reject) => {
  this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/VesselMaster`).subscribe((response: any) => {
    this.vesselMastr=response;
     console.log("vessel",this.vesselMastr)
  }, reject);
});
}

//get all IncoTerm
getIncoTerm():Promise<any[]>{
  return new Promise((resolve, reject) => {
  this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/IncoTermMaster`).subscribe((response: any) => {
    this.incotermMastr=response;
     console.log("incoterm",this.incotermMastr)
  }, reject);
});
}

//onchange events
onChangeSalePerson(form,event:any){
  this.salesPersonIdname = event.userName;
  form.controls['salesPersonDisplayName'].setValue(this.salesPersonIdname);
  // console.log(this.salesPersonIdname);
}

onChangePreparedBy(form,event:any){
  this.prepareby=event.userName
  form.controls['preparedByDislayName'].setValue(this.prepareby);
}

onChangeCompany(form,event:any){
  this.companyIdname = event.companyName;
  form.controls['companyDisplayName'].setValue(this.companyIdname);
  // alert(this.companyIdname)
 let companyId =event.companyId
  this.getAllCompanyAddress(companyId);
}
 //get all companyes name
 getAllCompanyAddress(id:any):Promise<any[]>{
  return new Promise((resolve, reject) => {
  this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/CustomerAddrView/${id}`).subscribe((response: any) => {
    this.companyaddress=response;
    console.log("print address",this.companyaddress)
  }, reject);
});
} 

isCheckedHazardous:any=false;
onChangeHazardous(event:any){
  this.isCheckedHazardous=event.target.checked;
  // alert(this.isCheckedHazardous)
}

isCheckedShowTax:any=false;
onChangeShowTax(event:any){
  this.isCheckedShowTax=event.target.checked;
  // alert(this.isCheckedShowTax)
}

isCheckedShowTotal:any=false;
onChangeShowTotal(event:any){
  this.isCheckedShowTotal=event.target.checked;
  // alert(this.isCheckedShowTotal)
}

isCheckedShowCarrier:any=false;
onChangeShowCarrier(event:any){
  this.isCheckedShowCarrier=event.target.checked;
  // alert(this.isCheckedShowCarrier)
}

onChangeCustomerAddress(form,event:any){
  this.customeraddr=(event.formattedAddress).replace(/(?:\\[rn]|[\r\n]+)+/g, "");
  form.controls['companyAddress'].setValue(this.customeraddr);
  // alert(this.customeraddr)
}


onChangeContact(form,event:any){
  this.contactname = event.displayName;
  form.controls['contactDisplayName'].setValue(this.contactname);
  console.log(this.contactname)
}

///carrier event
onChangeCarrier(form,event:any){
  this.carriername = event.lineCompanyName;
  form.controls['carrier'].setValue(this.carriername);
  console.log(this.carriername);
}

///pol event
onChangepol(form,event:any){
  this.polname = event.locationLongName;
  console.log(this.polname);
  form.controls['pol'].setValue(this.polname);
}

onChangeMacth(event:any){

  // alert(this.polname+" and "+this.podname)
}
///pol event
onChangetransshipment(form,event:any){
  this.transshipment = event.locationLongName;
  console.log(this.transshipment);
  form.controls['placeOfDelivery'].setValue(this.transshipment);
}

// onChangeIncoTerm(form,event:any){
//   this.incotermName = event.incotermName;
//   console.log(this.incotermName);
// }

///pol event
onChangefinalDestination(form,event:any){
  this.finaldestName = event.locationShortName;
  console.log(this.finaldestName);
  form.controls['pot1'].setValue(this.finaldestName);
}

onChangePlaceOrigin(form,event:any){
  this.originName = event.locationShortName;
  console.log(this.originName);
  form.controls['placeOfOrigin'].setValue(this.originName);
}

///pol event
onChangetypeOfMove(event:any){
  this.typeofmoveName = event.locationLongName;
  console.log(this.typeofmoveName);
}

///pod event
onChangepod(form,event:any){
  this.podname = event.locationLongName;
  console.log(this.podname);
  form.controls['pod'].setValue(this.podname);
}

///pod event
onChangeVessel(form,event:any){
  this.vesselname = event.vesselName;
  console.log(this.vesselname);
  form.controls['vesselName'].setValue(this.vesselname);
}

///get mode of transport
onChangeModeOfTransport(mode:any){
  this.transportMode=mode;
}
///get mode of transport
onChangeDirection(direction:any){
  this.direction=direction;
}

/// validation for unique quote number
aarray=[]
onChangeCheckUniqueQuoteNumber(event){
  const saleQuoteNumber=event.target.value
  
  for(let i=0;i<this.saleQuoteNumberArr.length;i++){
    this.aarray.push(this.saleQuoteNumberArr[i].salesQuoteNumber)
  }
  //console.log("saleQuoteNumber array",this.aarray)
    if(this.aarray.length>0 ){
      if(this.aarray.includes(saleQuoteNumber)){
        this.isunique=!this.isunique;
        // console.log("inner flag",this.isunique)
      }
      else{
        this.isunique=!this.isunique
      }
    }
}

private dateRangeValidator: ValidatorFn = (): {
  [key: string]: any;
} | null => {
  let invalid = false;
  const expiryDate = this.SalesQuoteForm && this.SalesQuoteForm.get("expiryDate").value;
  const salesQuoteDate = this.SalesQuoteForm && this.SalesQuoteForm.get("salesQuoteDate").value;
  
  if (expiryDate && salesQuoteDate) {
    invalid = new Date(salesQuoteDate).valueOf() > new Date(expiryDate).valueOf();
  }
  return invalid ? { invalidRange: { expiryDate, salesQuoteDate } } : null;
};

invalid:false
public comparisonValidator(): ValidatorFn {
  return (group: FormGroup): ValidationErrors => {
    const control1 = group.controls['polid'];
    const control2 = group.controls['podid'];
    if (control1.value == control2.value) {
      control2.setErrors({notEquivalent: false});
   } else {
      control2.setErrors(null);
   }
    return;
  };
}

//onSubmit Event Sales Quote form
  onSubmit(form:FormGroup)
  {
    if (form.invalid) {
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
    
		}else{
    this.transportMode=form.value.modeoftransport;
    this.islisdispaly=false;
    // if(form.value.salesQuoteID==0||form.value.salesQuoteID==null||form.value.salesQuoteID==undefined&&this.salesdataurlid==""){
    if(this.salesdataurlid==""||this.salesdataurlid==null){
      //Sales Quates obj
    this.salequatesObj = {
      salesQuoteId:form.value.salesQuoteId,
      salesQuoteNumber:form.value.salesQuoteNumber,
      salesQuoteDate:form.value.salesQuoteDate,
      salesQuoteType:form.value.salesQuoteType,
      salesPersonId:form.value.salesPersonId,
      salesPersonDisplayName:this.salesPersonIdname,
      modeoftransport:form.value.modeoftransport,
      direction:form.value.direction,
      companyId:form.value.companyId,
      companyDisplayName:this.companyIdname,
      contactId:form.value.contactId,
      contactDisplayName:this.contactname,
      enqReceivedDate:form.value.enqReceivedDate,
      expiryDate:form.value.expiryDate,
      revisionId:form.value.revisionId,
      commodity:form.value.commodity,
      dateCreated:new Date(),
      dateModified:new Date(),
      salesQuoteStatus:form.value.salesQuoteStatus,
      companyAddressId:form.value.companyAddressId,
      companyAddress:this.customeraddr,
      preparedBy:form.value.preparedBy,
      preparedByDislayName: this.prepareby,
      requiredEquipment:form.value.requiredEquipment,
      volume:form.value.volume,
      grossWeight:form.value.grossWeight,
      isHazardous:this.isCheckedHazardous,
      showTax:this.isCheckedShowTax,
      termsConditions:(form.value.termsConditions).toString(),
      showTotal:this.isCheckedShowTotal,
      showCarrier:this.isCheckedShowCarrier,
    };
    console.log("id",this.salequatesObj.salesQuoteId);
    console.log("form id",form.value.salesQuoteID)

    console.log("form data",form.value);
    console.log("form model",this.salequatesObj)
      this.httpclient.post(`${this.apiConfig.apiBaseUrl}/api/SalesQuotes`, JSON.stringify(this.salequatesObj), this.headers).subscribe(res => {
        console.log('Success');
        console.log("response:",res);

        this.isqoatesdetailbtn=!this.isqoatesdetailbtn
        // this.isqoatesdetailbtn1=false;
        this.islisdispaly=false;

        let data:any=res
        this.insertedrecord.push(data)
        console.log("inserted Record:",this.insertedrecord);
        this.sqID=this.insertedrecord[0].salesQuoteId
        // localStorage.setItem('sqID', JSON.stringify(this.sqID));
        // alert("sqID="+this.sqID)
        // this.resetForm(form);
        // this.getAllSaleQuates();
        this.toastr.success('Data Added successfully' ,'ADD',{
          timeOut :  3000});
          // this.router.navigateByUrl('/sales-quotes-list');
        
      }, err => {
        this.toastr.error('Please Fill all Valid details','',{
          timeOut :  3000});
        //alert(JSON.stringify(err));
        this.err=true

      });
        
       
      }

    else
      {
        //update
        
        this.islisdispaly=true
       this.getAllSaleQuates();
       this.isqoatesdetailbtn=true;
       this.salequatesObj = {
        salesQuoteId:this.salesdataurlid,
        salesQuoteNumber:form.value.salesQuoteNumber,
        salesQuoteDate:form.value.salesQuoteDate,
        salesQuoteType:form.value.salesQuoteType,
        salesPersonId:form.value.salesPersonId,
        salesPersonDisplayName:form.value.salesPersonDisplayName,
        modeoftransport:form.value.modeoftransport,
        direction:form.value.direction,
        companyId:form.value.companyId,
        companyDisplayName:form.value.companyDisplayName,
        contactId:form.value.contactId,
        contactDisplayName:form.value.contactDisplayName,
        enqReceivedDate:form.value.enqReceivedDate,
        expiryDate:form.value.expiryDate,
        revisionId:form.value.revisionId,
        commodity:form.value.commodity,
        dateCreated:form.value.dateCreated,
        dateModified:new Date(),
        salesQuoteStatus:form.value.salesQuoteStatus,
        companyAddressId:form.value.companyAddressId,
        companyAddress:form.value.companyAddress,
        preparedBy:form.value.preparedBy,
        preparedByDislayName: form.value.preparedByDislayName,
        requiredEquipment:form.value.requiredEquipment,
        volume:form.value.volume,
        grossWeight:form.value.grossWeight,
        isHazardous:form.value.isHazardous,
        showTax:form.value.showTax,
        termsConditions:form.value.termsConditions,
        showTotal:form.value.showTotal,
        showCarrier:form.value.showCarrier,
      };
      console.log("updatedob",this.salequatesObj)
        this.httpclient.put(`${this.apiConfig.apiBaseUrl}/api/SalesQuotes/${this.salesdataurlid}`, JSON.stringify(this.salequatesObj), this.headers).subscribe(res => {
        //alert('updated Successfully');
        console.log(res);
        // this.resetForm(form);
        // console.log(this.isqoatesdetailbtn);
        this.toastr.success('data updated successfully' ,'Updated',{
          timeOut :  2000});
        //this.getAllSaleQuates();
        // this.router.navigateByUrl('/sales-quotes-list');

      }, err => {
        console.log('Error');
        console.log(err);

      });
      }
    }//valide loop
  }
    

  //on submit Sales Quotes Details form
  submitted:boolean;
  onSubmitService(form:FormGroup,sqID){
    if(form.valid){
      this.submitted = true;
      let salesQuoteDetailId=form.value.salesQuoteDetailId
    
      if(salesQuoteDetailId==0){
          // alert("add")
          // if(this.salesdataurlid){
              this.quotedetailObj ={
                "salesQuoteId": Number(this.salesdataurlid)||Number(this.sqID),
                "salesQuoteDetailId": 0,
                "sortOrder": form.value.sortOrder,
                "polid":  form.value.polid,
                "pol":  this.polname,
                "podid": form.value.podid,
                "pod": this.podname,
                "carrierId": form.value.carrierId,
                "carrier": this.carriername,
                "transitTime": form.value.transitTime,
                "incoTerm": form.value.incoTerm,
                "notes": form.value.notes,
                "placeOfOriginId": form.value.placeOfOriginId,
                "placeOfOrigin":this.originName,
                "pot1id": form.value.pot1id,
                "pot1":this.finaldestName,
                "placeOfDeliveryId": form.value.placeOfDeliveryId,
                "placeOfDelivery": this.transshipment,
                "freeTime":form.value.freeTime,
                "typeOfMove":form.value.typeOfMove,
                "vesselId": form.value.vesselId,
                "vesselName":this.vesselname,
              }
              console.log("myobj",this.quotedetailObj)
      
              this.islisdispaly=true

              this.httpclient.post(`${this.apiConfig.apiBaseUrl}/api/SalesQuotesDetail`, JSON.stringify(this.quotedetailObj), this.headers).subscribe(res => {
                console.log('Success');
                console.log(res);
                //  this.sharedService.setData("hi")
                // alert("data added")
                // this.resetForm(form);
                this.getallSalesQuoteDetailsList(this.salesdataurlid||this.sqID);
                
              }, err => {
                this.toastr.error('Data Invalid','',{
                  timeOut :  2000});
                //alert(JSON.stringify(err));

              });
                this.toastr.success('Data Added Successfully' ,'ADD',{
                  timeOut :  2000});
                // this.closeModal.nativeElement.click();
                this.modalService.dismissAll(form)
          // }
          // if(sqID){
          //   this.quotedetailObj ={
          //     "salesQuoteId": Number(this.sqID),
          //       "salesQuoteDetailId": 0,
          //       "sortOrder": form.value.sortOrder,
          //       "polid":  form.value.polid,
          //       "pol":  this.polname,
          //       "podid": form.value.podid,
          //       "pod": this.podname,
          //       "carrierId": form.value.carrierId,
          //       "carrier": this.carriername,
          //       "transitTime": form.value.transitTime,
          //       "incoTerm": form.value.incoTerm,
          //       "notes": form.value.notes,
          //       "placeOfOriginId": form.value.placeOfOriginId,
          //       "placeOfOrigin":this.originName,
          //       "pot1id": form.value.pot1id,
          //       "pot1":this.finaldestName,
          //       "placeOfDeliveryId": form.value.placeOfDeliveryId,
          //       "placeOfDelivery": this.transshipment,
          //       "freeTime":form.value.freeTime,
          //       "typeOfMove":form.value.typeOfMove,
          //       "vesselId": form.value.vesselId,
          //       "vesselName":this.vesselname,
          //   }
          //   console.log("myobj",this.quotedetailObj)
    
          //   this.islisdispaly=true
          //   this.httpclient.post('${this.apiConfig.apiBaseUrl}/api/SalesQuotesDetail', JSON.stringify(this.quotedetailObj), this.headers).subscribe(res => {
          //     console.log('Success');
          //     console.log(res)
          //     // this.resetForm(form);
          //     this.getallSalesQuoteDetailsList(sqID);
              
          //   }, err => {
          //     this.toastr.error('Data Invalid','',{
          //       timeOut :  2000});

          //   });
          //     this.toastr.success('Data Added Successfully' ,'ADD',{
          //       timeOut :  2000});
          //     this.modalService.dismissAll();
          // }
    }
    else{
        // update
        // let salequatesdetailObj=form.value;
        console.log(this.originName)
        console.log(form.value.placeOfOrigin)
        let salequatesdetailObj
        // if(this.salesdataurlid){
          salequatesdetailObj ={
            "salesQuoteId": Number(this.salesdataurlid)|| Number(this.sqID),
              "salesQuoteDetailId": form.value.salesQuoteDetailId,
              "sortOrder": form.value.sortOrder,
              "polid":  form.value.polid,
              "pol":  form.value.pol,
              "podid": form.value.podid,
              "pod": form.value.pod,
              "carrierId": form.value.carrierId,
              "carrier": form.value.carrier,
              "transitTime": form.value.transitTime,
              "incoTerm": form.value.incoTerm,
              "notes": form.value.notes,
              "placeOfOriginId": form.value.placeOfOriginId,
              "placeOfOrigin":form.value.placeOfOrigin,
              "pot1id": form.value.pot1id,
              "pot1":form.value.pot1,
              "placeOfDeliveryId": form.value.placeOfDeliveryId,
              "placeOfDelivery": form.value.placeOfDelivery,
              "freeTime":form.value.freeTime,
              "typeOfMove":form.value.typeOfMove,
              "vesselId": form.value.vesselId,
              "vesselName":form.value.vesselName,
          }
        // }
        // if(this.sqID){
        //   salequatesdetailObj ={
        //     "salesQuoteId": Number(this.sqID),
        //       "salesQuoteDetailId": form.value.salesQuoteDetailId,
        //       "sortOrder": form.value.sortOrder,
        //       "polid":  form.value.polid,
        //       "pol":  this.polname,
        //       "podid": form.value.podid,
        //       "pod": this.podname,
        //       "carrierId": form.value.carrierId,
        //       "carrier": this.carriername,
        //       "transitTime": form.value.transitTime,
        //       "incoTerm": form.value.incoTerm,
        //       "notes": form.value.notes,
        //       "placeOfOriginId": form.value.placeOfOriginId,
        //       "placeOfOrigin":this.originName,
        //       "pot1id": form.value.pot1id,
        //       "pot1":this.finaldestName,
        //       "placeOfDeliveryId": form.value.placeOfDeliveryId,
        //       "placeOfDelivery": this.transshipment,
        //       "freeTime":form.value.freeTime,
        //       "typeOfMove":form.value.typeOfMove,
        //       "vesselId": form.value.vesselId,
        //       "vesselName":this.vesselname,
        //   }
        // }
        this.httpclient.put(`${this.apiConfig.apiBaseUrl}/api/SalesQuotesDetail/${salesQuoteDetailId}`, JSON.stringify(salequatesdetailObj), this.headers).subscribe(res => {
          console.log('updated Successfully');
          console.log(res);
          // console.log(this.isqoatesdetailbtn);
          console.log("*******",form.value.salesQuoteId)
          this.toastr.success('Sales Quote Details Updated Successfully' ,'Updated!!',{
            timeOut :  2000});
            if(this.salesdataurlid){
              this.getallSalesQuoteDetailsList(this.salesdataurlid);
            }
            if(sqID){
              this.getallSalesQuoteDetailsList(sqID);
            }
          
            this.modalService.dismissAll(form)

        }, err => {
          console.log('Error');
          console.log(err);

        });
      
    }
    }else
    {
      this.submitted=true;
      console.log(this.SalesQuoteDetailsForm)
      let key = Object.keys(this.SalesQuoteDetailsForm.controls)
      console.log(key)
      key.filter(data=>{
        console.log("data",data)
        let control=this.SalesQuoteDetailsForm.controls[data];
        let placeOfOriginId=this.SalesQuoteDetailsForm.controls['placeOfOriginId'];
        if(control.errors!=null){
          control.markAsTouched();
          placeOfOriginId.markAllAsTouched();
        }
      });
      return;
    }
  }
//


  //Display sales Quotes Details
  getallSalesQuoteDetailsList(id:any):Promise<any[]>{
    return new Promise((resolve, reject) => {
      console.log(id)
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/SalesQuoteDetailNewView/${id}`).subscribe((response: any) => {
      this.SaleDetailList=response;
      console.log("List",this.SaleDetailList);
      }, reject);
    });
       console.log("Sales Quotes Details",this.SaleDetailList)
    }

  // selectEvent(item) {
    // do something with selected item
  // }

  // onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  // }

  // onFocused(e) {
    // do something
  // }

  resetForm(form: FormGroup) {
    form.reset();
  }

  valueFromChild: string;
  modalForm1:any;
  salesDetailData:any
  editSalesQuoteDetails(valueFromChild,modalForm1){
    this.modalOpenForm(modalForm1);
    console.log("sales detail id=",valueFromChild)

    //get data by sales quote detail id
    //let salesDetailData
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/SalesQuotesDetail/${valueFromChild}`,this.headers).subscribe((res: any) => {
      this.salesDetailData=res;
      console.log("sales detail",this.salesDetailData)
        // this.SalesQuoteForm.patchValue({})
          this.SalesQuoteDetailsForm.patchValue({
            salesQuoteID:this.salesDetailData[0].salesQuoteId,
            salesQuoteDetailId:valueFromChild,
            sortOrder:this.salesDetailData[0].sortOrder,
            polid:this.salesDetailData[0].polid,
            pol:this.salesDetailData[0].pol,
            podid:this.salesDetailData[0].podid,
            pod:this.salesDetailData[0].pod,
            carrierId:this.salesDetailData[0].carrierId,
            carrier:this.salesDetailData[0].carrier,
            transitTime:this.salesDetailData[0].transitTime,
            incoTerm:this.salesDetailData[0].incoTerm,
            notes:this.salesDetailData[0].notes,
            placeOfOriginId: this.salesDetailData[0].placeOfOriginId,
            placeOfOrigin:this.salesDetailData[0].placeOfOrigin,
            pot1id: this.salesDetailData[0].pot1id,
            pot1:this.salesDetailData[0].pot1,
            placeOfDeliveryId: this.salesDetailData[0].placeOfDeliveryId,
            placeOfDelivery: this.salesDetailData[0].placeOfDelivery,
            freeTime:this.salesDetailData[0].freeTime,
            typeOfMove:this.salesDetailData[0].typeOfMove,
            vesselId: this.salesDetailData[0].vesselId,
            vesselName:this.salesDetailData[0].vesselName,
          })
    });
  }
  
 
  
}


