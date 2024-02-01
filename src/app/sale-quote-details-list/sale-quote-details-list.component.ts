import { Component, OnInit, OnDestroy,ViewEncapsulation, ElementRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Company } from 'app/services/company';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as snippet from 'app/companies/datatables.snippetcode';
import { ColumnMode,columnsTotalWidth,DatatableComponent,id, SelectionType } from '@swimlane/ngx-datatable';
// import Swal from 'sweetalert2';
import { from, Observable, Subject, Subscription, timer } from 'rxjs';
import { clear } from 'console';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { concatMap, delay, mergeMap, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { CoreTranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { SharedSalesQuoteDataService } from 'app/services/shared-sales-quote-data.service';
import { salesQuotesChargesModel } from './salesQuotesChargesModel';
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
import { AppConfigService } from 'app/services/app-config.service';
import { ExportExeclFileService } from 'app/export-execl-file.service';


pdfMake.vfs = pdfFonts.pdfMake.vfs; 


@Component({
  selector: 'app-sale-quote-details-list',
  templateUrl: './sale-quote-details-list.component.html',
  styleUrls: ['./sale-quote-details-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SaleQuoteDetailsListComponent implements OnInit {


  // @Output() bookTitleCreated = new EventEmitter<{ myobj1: any }>();
  
  @Input() ModeOfTransport;
  @Input() Direction;
  @Input() SaleQuotedata:any;
  @Input() SaleDetailList:[];
  @Input() hero;
  @Output() sendChildValue= new EventEmitter<any>();
  sqid: any;
  companyname: any;
  datachargsell=[];
  datachargpatch=[];
  mergedData: any;
 

  sendValueToParent(id: any) {
    this.sendChildValue.emit(id);
  }
  
  @ViewChild('closeModal') closeModal:ElementRef;  

  public chargesForm: FormGroup;
  

  _datatablesService: any;
  exportCSVData: any;
  public rows: any = [];
  public selected = [];
  public editingName = {};
  public editingAge = {};
  public editingSalary = {};
  public editingStatus = {};
  _unsubscribeAll: Observable<any>;
  tempData: any;
  ColumnMode: any;
  isValidFormSubmitted= null;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

   saleQuoteChargeObj: salesQuotesChargesModel = new salesQuotesChargesModel();

  public _snippetCodeKitchenSink = snippet.snippetCodeKitchenSink;
  public _snippetCodeInlineEditing = snippet.snippetCodeInlineEditing;
  public _snippetCodeRowDetails = snippet.snippetCodeRowDetails;
  public _snippetCodeCustomCheckbox = snippet.snippetCodeCustomCheckbox;
  public _snippetCodeResponsive = snippet.snippetCodeResponsive;
  public _snippetCodeMultilangual = snippet.snippetCodeMultilangual;
  public _snippetCodeVertical = snippet.snippetCodeVertical;
  LocationType2: any;
  public contentHeader: object;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;

  
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public SelectionType = SelectionType;
  editdata: any;
  id: any;
  mydta: any;
  salesdataurlid: string;
  sharedData: any;

  currency: any;
  applyPer: any;
  chargeditem: any;
  taxerates: any;

  salesDetailRowId: any;
  addflag: boolean=false;
  chargeslist:any= [];
  // datacharg:[ { sqchargeId:any;sqdetailRowId:any;sqid:any;chargeItemId: any; chargeDescription:string;quantity: any; applyPer: any; rate: any; currencyId: any; totalAmount: any; taxPercent: any; taxAmount: any; incomeExpense:any;payingPartyId:any}];
  datacharg:any=[];
  chargesflag: boolean=false;
  percent:any=100;
  per=0.10;
  taxtamt:any;
  quantity:ElementRef
  rate:ElementRef
  subscription: Subscription;
  totalBuyingAmtTax:any;
  totalBuyingAmt:any;
  totalSellingAmt:any;
  totalSellyingAmtTax:any;
  profitExcludingTax:any;
  profitIncludingTax:any
  /**
   * Method Search (filter)
   *
   * @param event
   */
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.pol.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.kitchenSinkRows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

    /**
   * Constructor
   *
   * @param {DatatablesService} _datatablesService
   * @param {CoreTranslationService} _coreTranslationService
   */

  constructor(private _coreTranslationService: CoreTranslationService,private httpclient: HttpClient, private fb: FormBuilder,private router: Router,private toastr: ToastrService,private route: ActivatedRoute,private sharedService: SharedSalesQuoteDataService,private modalService: NgbModal,private _fb: FormBuilder,private apiConfig:AppConfigService,private excelExport:ExportExeclFileService) { }
  
  ngOnInit(): void {
    
    console.log("hero",this.hero)
  
    this.salesdataurlid=this.route.snapshot.paramMap.get('id');
     this.getallSalesQuoteDetailsList(this.salesdataurlid);
     console.log("urlid in list",this.salesdataurlid)

     this.chargesForm = this._fb.group({
      Rows: this._fb.array([]),
    });
    // this.chargesForm = this._fb.group({
    //   Rows: this._fb.array([this.initRows()]),
    // });
    console.log("init row",this.salesDetailRowId)
    // this.subscription.unsubscribe();
  }

//sales charges 
get formArr() {
    return this.chargesForm.get('Rows') as FormArray;
  }

  initRows() {
    return this._fb.group({
      sqid:this.sqid,
      sqdetailRowId:this.salesDetailRowId,
      sqchargeId:[0],
      chargeItemId: ['',Validators.required],
      chargeDescription:[''],
      quantity: ['',Validators.required],
      applyPer: ['',Validators.required],
      rate: ['',Validators.required],
      currencyId: ['',Validators.required],
      currencyCode:[''],
      totalAmount: [{value: '', disabled: false},Validators.required],
      taxPercent: ['',Validators.required],
      taxAmount:[{value: '', disabled: false},Validators.required],
      sqchargeIdSell:[0],
      sellingrate:['',Validators.required],
      sellcurrencyId:[{value: '', disabled: true},Validators.required],
      selltotalAmount:['',Validators.required],
      selltaxPercent:['',Validators.required],
      selltaxAmount:['',Validators.required],
      incomeExpense:['EXPENSE'],
      sellincomeExpense:['INCOME'],
      invoiceTo:[''],
      payingPartyId:['',Validators.required],
    });
  }

  addNewRow() {
    this.formArr.push(this.initRows());
  }

  //delete charges from list
  deleteRow(index: number,chargeId:any,sqid:any,sqdetailid:any) {
  
    if(chargeId!=0){
      this.deleteSalesQuotesCharge(chargeId,sqid,sqdetailid);  
    }
    else{
        this.formArr.removeAt(index);
    }
      

  }
  deleteSalesQuotesCharge(chargeId: any,sqid:any,sqdetailid:any) {
    this.httpclient.delete(`${this.apiConfig.apiBaseUrl}/api/SalesQuoteCharge/${chargeId}`).subscribe((Success: any) => {
      //  this.toastr.success('Data Deleted Sucessfully!!!' ,'',{
      //   timeOut :  2000});
      //   this.getSaleQuoteChargesList(sqid,sqdetailid);
    });
    this.httpclient.delete(`${this.apiConfig.apiBaseUrl}/api/SalesQuoteCharge/${chargeId+1}`).subscribe((Success: any) => {
       this.toastr.success('Data Deleted Sucessfully!!!' ,'',{
        timeOut :  2000});
        this.getSaleQuoteChargesList(sqdetailid);
    });
  }
  totalamt:any
  totalAmt(tot){
    console.log("tot=",tot)
    this.totalamt=tot
  }

  ///////onchange event for totalAmt and taxamt
  mrate: any;
  mquantiy:any;
  mtotalAmount:any;
  onChange(index:number){
    const subTotal = (this.formArr.at(index).get('rate').value || 0) *
    (this.formArr.at(index).get('quantity').value || 0);
    this.formArr.at(index).get('totalAmount').setValue(subTotal);
    
    const taxsubtotal=((this.formArr.at(index).get('rate').value || 0) *
    (this.formArr.at(index).get('quantity').value || 0) * (this.formArr.at(index).get('taxPercent').value || 0))/100;
    
    this.formArr.at(index).get('taxAmount').setValue(taxsubtotal);

    // selling amt calculation
    const sellsubTotal = (this.formArr.at(index).get('sellingrate').value || 0) *
    (this.formArr.at(index).get('quantity').value || 0);
    this.formArr.at(index).get('selltotalAmount').setValue(sellsubTotal);
    
    const selltaxsubtotal=((this.formArr.at(index).get('sellingrate').value || 0) *
    (this.formArr.at(index).get('quantity').value || 0) * (this.formArr.at(index).get('selltaxPercent').value || 0))/100;
    
    this.formArr.at(index).get('selltaxAmount').setValue(selltaxsubtotal);
  }

  chargeItemName:any
  dropdownValues:any;
  onChangeChargeMaster(event,index) {
    const selectedChargeItem = event.chargeItemName;
    // const chargeItemName = selectedChargeItem.chargeItemName;
    console.log(selectedChargeItem); // Use chargeItemName as needed
    this.chargeItemName=selectedChargeItem
    // Update the corresponding form control within the form array
    const chargeItemControl =this.formArr.at(index).get('chargeDescription');
    chargeItemControl.setValue(this.chargeItemName)

    this.dropdownValues=[];
    for (let i = 0; i < this.formArr.length; i++) {
      const formGroup = this.formArr.at(i) as FormGroup;
      const dropdownControl = formGroup.get('chargeDescription');
      const selectedValue = dropdownControl.value;
      this.dropdownValues.push(selectedValue);
    }
    console.log('Dropdown Values:', this.dropdownValues);
  }

  currencyName:any;
  currencydropdownValues:any;
  onChangeCurrency(event,index){
    // alert(event.currencyId)
    const selectedCurrencyCode = event.currencyCode;
    // const chargeItemName = selectedCurrencyCode.currencyCode;
    // alert(selectedCurrencyCode); // Use chargeItemName as needed
    this.currencyName=selectedCurrencyCode
    const currencyControl =this.formArr.at(index).get('currencyCode');
    currencyControl.setValue(this.currencyName)

    const currencySellControl =this.formArr.at(index).get('sellcurrencyId');
    currencySellControl.setValue( event.currencyId)

    this.currencydropdownValues=[];
    for (let i = 0; i < this.formArr.length; i++) {
      const formGroup = this.formArr.at(i) as FormGroup;
      const dropdownControl = formGroup.get('currencyCode');
      const selectedValue = dropdownControl.value;
      this.currencydropdownValues.push(selectedValue);
    }
    console.log('Dropdown Values:', this.currencydropdownValues);
  }

  // add charges submit btn
   async onAddCharges(form:FormGroup){

   console.log(this.chargesForm.value.Rows.length)

    this.isValidFormSubmitted = false;

    //form invalid
		if (this.chargesForm.invalid) {
			
      this.isValidFormSubmitted = true;
      for (let i = 0; i < this.formArr.length; i++) {
        const control = this.formArr.at(i);
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(innerControl => {
            innerControl.markAsTouched();
          });
        } else {
          control.markAsTouched();
        }
      }
      
		}
    else//form valid
    {
    //change data model as per the sqid from url or sqid gennerated by new form
    // if(this.salesdataurlid){
      // console.log(this.dropdownValues[0])
      for(let i=0;i<this.chargesForm.value.Rows.length;i++)
      {
        const charge = this.chargesForm.value.Rows[i];

        this.datacharg[i] = {
          sqdetailRowId: this.salesDetailRowId,
          sqid: this.salesdataurlid || this.sqid,
          sqchargeId: charge.sqchargeId,
          chargeItemId: charge.chargeItemId,
          chargeDescription: charge.chargeDescription,
          quantity: charge.quantity,
          applyPer: charge.applyPer,
          rate: charge.rate,
          currencyId: charge.currencyId,
          currencyCode:charge.currencyCode,
          totalAmount: charge.totalAmount,
          taxPercent: charge.taxPercent,
          taxAmount: charge.taxAmount,
          incomeExpense: charge.incomeExpense,
          payingPartyId: charge.payingPartyId
        };
        
        this.datachargsell[i] = {
          sqdetailRowId: this.salesDetailRowId,
          sqid: this.salesdataurlid || this.sqid,
          sqchargeId: charge.sqchargeIdSell,
          chargeItemId: charge.chargeItemId,
          chargeDescription: charge.chargeDescription,
          quantity: charge.quantity,
          applyPer: charge.applyPer,
          rate: charge.sellingrate,
          currencyId: charge.sellcurrencyId,
          currencyCode:charge.currencyCode,
          totalAmount: charge.selltotalAmount,
          taxPercent: charge.selltaxPercent,
          taxAmount: charge.selltaxAmount,
          incomeExpense: charge.sellincomeExpense,
          payingPartyId: charge.payingPartyId
        };
      }
          console.log("form data datacharg=",this.datacharg.length);
          console.log("form data datacharg=",this.datacharg);
          console.log("form data datacharg sell=",this.datachargsell);
      
    let mergedArray = [];
    let maxArrayLength = Math.max(this.datacharg.length, this.datachargsell.length);

    for (let i = 0; i < maxArrayLength; i++) {
      if (this.datacharg[i]) {
        mergedArray.push(this.datacharg[i]);
      }
      if (this.datachargsell[i]) {
        mergedArray.push(this.datachargsell[i]);
      }
    }

    this.mergedData = mergedArray;
    
    //  let sqchargeId=this.chargesForm.value.Rows[0].sqchargeId
    //  if(this.mergedData.length>0 ){
      // console.log(console.log("***********upadte********",this.mergedData))
      //     for(let i=0;i<this.mergedData.length;i+=2){

      //       for(let j=i;j<i+2;j++){
      //         await new Promise<void>(async (resolve, reject) => {
      //           // console.log(this.mergedData[j])
      //           console.log(j,this.mergedData)
      //           let sqcharIDnew=this.mergedData[j].sqchargeId
                
      //           if(sqcharIDnew){
      //             this.httpclient.put(`${this.apiConfig.apiBaseUrl}/api/SalesQuoteCharge/${this.mergedData[j].sqchargeId}`, JSON.stringify(this.mergedData[j]), this.headers).subscribe(
      //               () => {
      //                 resolve(); // Resolve the promise when the insertion is successful
      //                 this.toastr.success('Sales Quote Detail Charges Updated Successfully' ,'Update',{
      //                         timeOut :  3000});
      //               },
      //               (error) => {
      //                 reject(error); // Reject the promise if there is an error
      //               }
      //             );
      //           }
      //           else{

      //             //add data if sqchargeId not found
      //               let sqchargeszeroID=[]
      //               let sqcharIDnew=this.mergedData[i].sqchargeId
      //               for(let j=0;j<this.mergedData.length;j++){
      //                 if(this.mergedData[j].sqchargeId==0)
      //                   sqchargeszeroID.push(this.mergedData[j])
      //               }
      //               console.log("zero id array",sqchargeszeroID)

      //             for (const data of sqchargeszeroID) {
      //               await new Promise<void>((resolve, reject) => {
      //                 this.httpclient.post(`${this.apiConfig.apiBaseUrl}/api/SalesQuoteCharge`, JSON.stringify(data), this.headers).subscribe(
      //                   () => {
      //                     resolve(); // Resolve the promise when the insertion is successful
      //                     this.toastr.success('Sales Quote Detail Charges Added Successfully' ,'ADD',{
      //                             timeOut :  3000});
                                  
      //                   },
      //                   (error) => {
      //                     reject(error); // Reject the promise if there is an error
      //                   }
      //                 );
      //               });
      //                 console.log(this.mergedData)
      //                 this.modalService.dismissAll(form)
      //               }
      //           }
               
      //         });
      //       }
        
      //     this.modalService.dismissAll(form)
      // }

      this.updateOrCreateSalesQuoteCharges(form,this.mergedData);
     
    }
  }

  async updateOrCreateSalesQuoteCharges(form,data) {
    console.log("data sale Quote",data)
    try {
      const response = await this.httpclient.post(`${this.apiConfig.apiBaseUrl}/api/SalesQuoteCharge/UpdateOrCreateSalesQuoteCharges`, data, this.headers).toPromise();
      this.toastr.success('Sales Quote Detail Charges Updated/Added Successfully', 'Update', { timeOut: 1000 });
      console.log(response);
    } catch (error) {
      this.toastr.error('Something Went Wrong', 'Error', { timeOut: 1000 });
      console.error(error);
    }
    this.modalService.dismissAll(form);
  }
  

  //liest data by sales Quotes Id
  getallSalesDetails(salesQuoteId:any):Promise<any[]>{
    return new Promise((resolve, reject) => {
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/SalesQuoteDetailNewView/${salesQuoteId}`).subscribe((response: any) => {
        // this.SaleDetailList=response;
        console.log("Sales Quotes Details list",response)
        this.rows = response;
        console.log("Sales Quotes Details list row", this.rows)
        this.tempData = this.rows;
        this.hero = this.rows;
        // console.log("Sales list",this.rows)
        //  this.salesDetailRowId=this.rows.salesQuoteDetailId;
        resolve(this.rows);
      }, reject);
    });
    }

 //Display sales Quotes Details
 getallSalesQuoteDetailsList(id:any):Promise<any[]>{
  return new Promise((resolve, reject) => {
  this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/SalesQuoteDetailNewView/${id}`).subscribe((response: any) => {
      // this.SaleDetailList=response;
      console.log("Sales Quotes Details list",response)
      this.rows = response;
      console.log("Sales Quotes Details list row", this.rows)
      this.tempData = this.rows;
      this.hero = this.rows;
      // console.log("Sales list",this.rows)
      //  this.salesDetailRowId=this.rows.salesQuoteDetailId;
      resolve(this.rows);
    }, reject);
  });
  }

    onShowQuoteForm(){
      this.router.navigateByUrl('/sales-quotes-form');
    
    }
    onDelete(id){
        this.deleterecord(id); 
    }
      deleterecord(id: any) {
        this.httpclient.delete(`${this.apiConfig.apiBaseUrl}/api/SalesQuotesDetail/${id}`).subscribe((Success: any) => {
          
           this.toastr.success('Data Deleted Sucessfully!!!' ,'Deleted',{
            timeOut :  2000});
            this.getallSalesDetails(this.salesdataurlid);
        });
        
      }
      async modalOpenForm(sqID:any,sqldetailid:any,modalForm) {
        console.log("direction=",this.ModeOfTransport)
        console.log("direction=",this.Direction)
        console.log('Open model');
        console.log(this.chargesForm.value);

        this.salesDetailRowId=sqldetailid;
        this.sqid=sqID
      
        this.getCurrency();
        this.getApplyPerList();
        this.getAllCompanyNames()
        this.getChargedItemList(this.ModeOfTransport,this.Direction);
        this.getAllTaxRate();
        console.log("salesDetailRowId=",this.salesDetailRowId)
        console.log("salesDetailRowId=",this.sqid)
       
        // this.chargesForm = this._fb.group({
        //   Rows: this._fb.array([this.initRows()]),
        // });
        this.modalService.open(modalForm,{ size: 'xl', backdrop: 'static' ,windowClass: 'your-modal-class'});
        this.getSaleQuoteChargesList(this.salesDetailRowId);
        this.getallSQeDetailsSingledata(this.salesDetailRowId)
        //alert(this.chargesflag)

        this.subscription = this.formArr.valueChanges.subscribe(data => {
          
          this.totalBuyingAmt=data.reduce((a,b) => a + +b.totalAmount, 0)
          this.totalBuyingAmtTax = data.reduce((a,b) => a + +b.taxAmount, 0)
          this.totalSellingAmt=data.reduce((a,b) => a + +b.selltotalAmount, 0)
          this.totalSellyingAmtTax = data.reduce((a,b) => a + +b.selltaxAmount, 0)
          
          this.profitExcludingTax=this.totalSellingAmt - this.totalBuyingAmt
          this.profitIncludingTax=(this.totalSellingAmt + this.totalSellyingAmtTax)-(this.totalBuyingAmt+this.totalBuyingAmtTax)

        })
      }
 
  getCurrency():Promise<any[]>{
    return new Promise((resolve, reject) => {
      
      this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/CurrencyMaster`).subscribe((response: any) => {
        console.log('get all currency');
       this.currency=response;
       console.log(this.currency);
      }, reject);
    });
    }

    getApplyPerList():Promise<any[]>{
      return new Promise((resolve, reject) => {
        
        this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/ApplyPerMaster`).subscribe((response: any) => {
          console.log('get all Apply Per');
         this.applyPer=response;
         console.log(this.applyPer);
        }, reject);
      });
      }

    getChargedItemList(mode:any,direction:any):Promise<any[]>{
        return new Promise((resolve, reject) => {
          
          this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/ChargedItemMaster/${mode}/${direction}`).subscribe((response: any) => {
            console.log('get all Charged Item');
           this.chargeditem=response;
           console.log(this.chargeditem);
          }, reject);
        });
    }

    getAllTaxRate():Promise<any[]>{
      return new Promise((resolve, reject) => {
        
        this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/TaxRate`).subscribe((response: any) => {
          console.log('get all Tax Rate');
         this.taxerates=response;
         console.log(this.taxerates);
        }, reject);
      });
    }

        //list all sale charges in modal
          getSaleQuoteChargesList(id){
            console.log("this.formArr.length"); 
            console.log(this.formArr.length);

            this.formArr.clear();
         
            if(id)
            {
                this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/SalesQuoteCharge/{salesDetailRowId}?salesDetailRowId=${id}`).subscribe((response: any) => {
                console.log('get all charges');
                this.chargeslist=response;
                console.log("chargelist",this.chargeslist);
                // let sqchargeId=this.chargeslist[0].sqchargeId;
                // let sqchargeId1=this.chargeslist[0+1].sqchargeId;
                // console.log(sqchargeId)
                // console.log(sqchargeId1)
                
                if(this.chargeslist.length==0){
                    this.chargesflag=false;
                    console.log("zero charges");
                    this.chargesForm = this._fb.group({
                      Rows: this._fb.array([this.initRows()]),
                    });
            
                }
                else
                {
                    this.chargesflag=true;
                    console.log("chargelist length",this.chargeslist.length,this.chargeslist[0].sqid)

                  
                    for(let i=0,j=0;j<=this.chargeslist.length/2;j++,i+=2){
                      
                      this.datachargpatch[j] = 
                          {
                            sqid:this.chargeslist[i].sqid,
                            sqdetailRowId:this.chargeslist[i].sqdetailRowId,
                            sqchargeId:this.chargeslist[i].sqchargeId,
                            chargeItemId: this.chargeslist[i].chargeItemId,
                            chargeDescription: this.chargeslist[i].chargeDescription,
                            quantity: this.chargeslist[i].quantity,
                            applyPer: this.chargeslist[i].applyPer,
                            rate: this.chargeslist[i].rate,
                            currencyId: this.chargeslist[i].currencyId,
                            currencyCode: this.chargeslist[i].currencyCode,
                            totalAmount: this.chargeslist[i].totalAmount,
                            taxPercent: this.chargeslist[i].taxPercent,
                            taxAmount:this.chargeslist[i].taxAmount,
                            incomeExpense:this.chargeslist[i].incomeExpense,
                            sqchargeIdSell:this.chargeslist[i+1].sqchargeId,
                            sellingrate:this.chargeslist[i+1].rate,
                            sellcurrencyId:this.chargeslist[i+1].currencyId,
                            selltotalAmount:this.chargeslist[i+1].totalAmount,
                            selltaxPercent:this.chargeslist[i+1].taxPercent,
                            selltaxAmount:this.chargeslist[i+1].taxAmount,
                            sellincomeExpense:this.chargeslist[i+1].incomeExpense,
                            invoiceTo:this.chargeslist[i+1].invoiceTo,
                            payingPartyId:this.chargeslist[i+1].payingPartyId,
                          }
                      console.log("patch data",this.datachargpatch)

                      // if(this.salesdataurlid){
                                this.formArr.push(
                                  this._fb.group({
                                  sqid:this.salesdataurlid || this.sqid,
                                  sqdetailRowId:this.salesDetailRowId,
                                  sqchargeId:this.chargeslist[i].sqchargeId,
                                  chargeItemId: this.chargeslist[i].chargeItemId,
                                  chargeDescription:this.chargeslist[i].chargeDescription,
                                  quantity: this.chargeslist[i].quantity,
                                  applyPer: this.chargeslist[i].applyPer,
                                  rate: this.chargeslist[i].rate,
                                  currencyId: this.chargeslist[i].currencyId,
                                  currencyCode: this.chargeslist[i].currencyCode,
                                  totalAmount: this.chargeslist[i].totalAmount,
                                  taxPercent: this.chargeslist[i].taxPercent,
                                  taxAmount:this.chargeslist[i].taxAmount,
                                  incomeExpense:this.chargeslist[i].incomeExpense,
                                  sqchargeIdSell:this.chargeslist[i+1].sqchargeId,
                                  sellingrate:this.chargeslist[i+1].rate,
                                  sellcurrencyId:this.chargeslist[i+1].currencyId,
                                  selltotalAmount:this.chargeslist[i+1].totalAmount,
                                  selltaxPercent:this.chargeslist[i+1].taxPercent,
                                  selltaxAmount:this.chargeslist[i+1].taxAmount,
                                  sellincomeExpense:this.chargeslist[i+1].incomeExpense,
                                  invoiceTo:this.chargeslist[i+1].payingPartyId,
                                  payingPartyId:this.chargeslist[i+1].payingPartyId,
                                }));
                        // }
                        // else
                        // {
                        //         this.formArr.push(
                        //             this._fb.group({
                        //             sqid:this.sqid,
                        //             sqdetailRowId:this.salesDetailRowId,
                        //             sqchargeId:this.chargeslist[i].sqchargeId,
                        //             chargeItemId: this.chargeslist[i].chargeItemId,
                        //             chargeDescription:this.chargeslist[i].chargeDescription,
                        //             quantity: this.chargeslist[i].quantity,
                        //             applyPer: this.chargeslist[i].applyPer,
                        //             rate: this.chargeslist[i].rate,
                        //             currencyId: this.chargeslist[i].currencyId,
                        //             totalAmount: this.chargeslist[i].totalAmount,
                        //             taxPercent: this.chargeslist[i].taxPercent,
                        //             taxAmount:this.chargeslist[i].taxAmount,
                        //             incomeExpense:this.chargeslist[i].incomeExpense,
                        //             sqchargeIdSell:this.chargeslist[i+1].sqchargeId,
                        //             sellingrate:this.chargeslist[i+1].rate,
                        //             sellcurrencyId:this.chargeslist[i+1].currencyId,
                        //             selltotalAmount:this.chargeslist[i+1].totalAmount,
                        //             selltaxPercent:this.chargeslist[i+1].taxPercent,
                        //             selltaxAmount:this.chargeslist[i+1].selltaxAmount,
                        //             sellincomeExpense:this.chargeslist[i+1].incomeExpense,
                        //             invoiceTo:this.chargeslist[i+1].invoiceTo,
                        //             payingPartyId:this.chargeslist[i+1].payingPartyId,
                        //     }));
                        // }
                    }//end for
                  }});
                // }, err => {
                //   this.toastr.error('NoCharges found','',{
                //     timeOut :  3000});
                //   //alert(JSON.stringify(err));
                //   // this.err=true
          
                // });
          
                this.chargesForm.patchValue(this.datachargpatch);
                console.log("patch data",this.datachargpatch)

                // this.chargesForm 
                console.log("after patch")
                console.log(this.chargesForm)
            }
        }

        //get Sales Quote by id
        salesdetaildata:any;
        getallSQeDetailsSingledata(salesdetailid){
          this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/SalesQuotesDetail/${salesdetailid}`).subscribe((response: any) => {
            console.log('get single sales quote detail');
          this.salesdetaildata=response;
          console.log(this.salesdetaildata)
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

  
  salesQuote:any
  generatePDF(SaleQuotedata:any) {  
  
    this.salesQuote=JSON.parse(SaleQuotedata)
    console.log("pdf data",this.salesQuote)
    console.log(this.salesQuote.salesQuoteId)

    let docDefinition = { 
      footer: {
        columns: [ [ 
          { text: '_____________________________________________________________________________________________',alignment: 'center',color:"#2f82bb"},
          { text: 'INDIA    |     TURKEY     |     JAPAN', alignment: 'center' ,color:"#2f82bb"}
        ]]
      },
     
      content: [  
          // Previous configuration  
          {  
              columns: [  
                  [  
                      {  
                          text: "FRETLOG",  
                          bold: true  ,
                          fontSize: 25, 
                          margin: [0, 15, 0, 15] 
                      },  
                      { 
                        text: `FRETLOG India Pvt. Ltd.
                                Sanjona Chambers | 10th Floor |
                                Ofce No:1002 | (Opp. IIPS) |
                                BKSD Marg Govandi Station Road
                                Mumbai - 400088 Phone :02267843000`,fontSize: 9 },  
                      
                      {  
                        text: "TO",  
                        bold: true  ,
                        fontSize: 10, 
                        margin: [0, 20, 0, 10] ,
                        alignment: 'left'  ,
                      },  
                      { 
                        text: `${this.salesQuote.companyAddress}`,fontSize: 10 ,alignment: 'left'  
                      },
                      {  
                        text: "Attn:",  
                        bold: true  ,
                        fontSize: 10, 
                        margin: [0, 20, 0, 10] ,
                        alignment: 'left'  ,
                      },
                      { 
                        text: `JAIMIN SHAH`,fontSize: 10 ,alignment: 'left'  
                      },

                     
                  ],  
                  [  {  
                    text: "Quotation",
                    margin: [0, 15, 0, 15] ,  
                    fontSize: 35, 
                    color:"#888",
                    alignment: 'right'  
                      }, 
                      {  
                          text: `Date: ${new Date().toLocaleString()}`,  
                          alignment: 'right'  ,
                          fontSize: 9, 
                          margin: [0, 10, 0, 0] ,  
                      },  
                      {  
                          text: `Quotation #: ${this.salesQuote.salesQuoteNumber}`,  
                          alignment: 'right' ,
                          fontSize: 9, 
                          margin: [0, 10, 0, 0] ,   
                      }  ,
                      {  
                        text: `Valid Till : ${this.salesQuote.expiryDate}`,  
                        alignment: 'right' ,
                        fontSize: 9,  
                        margin: [0, 10, 0, 0] ,  
                      }  ,
                      {  
                        text: `Prepared By : ${this.salesQuote.preparedByDislayName}`,  
                        alignment: 'right',
                        fontSize: 9,   
                        margin: [0, 10, 0, 0] ,  
                      }  ,
                      {  
                        text: `Sales Person : ${this.salesQuote.salesPersonDisplayName}`,  
                        alignment: 'right' ,
                        fontSize: 9,  
                        margin: [0, 10, 0, 0] ,  
                      }  ,
                  
                      
                  ],
                   
                    
              ]  ,
             
              
          },  
          {
            columns:[
              [
                {         text: "-------------------------------------------------------------",
                          bold: true  ,
                          fontSize: 25, 
                          color:"#ddd",
                          margin: [0, 10, 0, 10] 
                }
              ]
            ]
          },
          {
            columns:[
              [
                { 
                  text: `COMMODITY:  ${this.salesQuote.commodity}`, 
                  fontSize: 10 ,alignment: 'left'  
                },
                { 
                  text: `GR.WT. : ${this.salesQuote.grossWeight}`, 
                  fontSize: 10 ,alignment: 'left'  
                },
                { 
                  text: `EXCHANGE RATE: EUR 90.85, USD 83.27`, 
                  fontSize: 10 ,alignment: 'left'  
                },
              ],
           
            ]
          },
          {
            columns:[
              [
                {         text: "-------------------------------------------------------------",
                          bold: true  ,
                          fontSize: 25, 
                          color:"#ddd",
                          margin: [0, 10, 0, 10] 
                }
              ]
            ]
          },
          {
            columns:[
              [
                { 
                  text: `POL : ${this.salesdetaildata[0].pol}`, 
                  fontSize: 10 ,alignment: 'left'  
                },
                { 
                  text: `POD: ${this.salesdetaildata[0].pod}`, 
                  fontSize: 10 ,alignment: 'left'  
                },
              ],
              [
                { 
                  text: `DESTINATION:  ${this.salesdetaildata[0].placeOfDelivery}`, 
                  fontSize: 10 ,alignment: 'left'  ,
                },
              ]
            ]
          },
          {
            columns:[
              [
                {  
                  table: {  
                      headerRows: 1,  
                      widths: ['auto',200, 'auto', 'auto', 'auto', 'auto'],  
                      body: [  
                          ['SR #','PARTICULARS','APPLY PER / \n UNIT', 'QTY\nA',  'RATE\nB','SUB TOTAL\n C=A*B'],  
                          ...this.chargeslist.map(p => ([p.sqchargeId,p.chargeDescription,p.applyPer,  p.quantity,p.currencyCode+"     "+p.rate,p.currencyCode+"     "+ (p.rate * p.quantity).toFixed(2)])),  
                          // [{ text: 'Total Amount', colSpan: 5 },{}, {},{}, {}, this.invoice.reduce((sum, p) => sum + (p.qty * p.price), 0).toFixed(2)]  
                      ]  
                  } ,
                  margin: [0, 20, 0, 20] , 
                  fontSize:8,
                }  ,
                {  
                  text: "Notes",  
                  bold: true  ,
                  uderline:true,
                  fontSize: 10, 
                  margin: [0, 15, 0, 5] 
              },
              {  
                text: "______________________________________________________________________________________________", 
                color:"#1754ff"
              },
              ]
            ]
          },
      ],  
      // Common Styles  
  } 
    pdfMake.createPdf(docDefinition).open();  
  } 

  exportAsXLSX(SaleQuotedata:any):void {
    this.salesQuote=JSON.parse(SaleQuotedata)
    this.excelExport.exportAsExcelFile(this.salesQuote, 'myExcelFile');
 }
}
