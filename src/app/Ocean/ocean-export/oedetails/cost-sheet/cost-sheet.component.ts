import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoreTranslationService } from '@core/services/translation.service';
import { jsons2arrays } from '@ctrl/ngx-csv';
import { id } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { CostSheet } from './CostSheet';
import { AppConfigService } from 'app/services/app-config.service';

@Component({
  selector: 'app-cost-sheet',
  templateUrl: './cost-sheet.component.html',
  styleUrls: ['./cost-sheet.component.scss']
})
export class CostSheetComponent {
  @Input() hero;
  @Input() modeOfTransport;
  @Input() transportDirection;
  @Input() myObj;

  CostSheetObj: CostSheet = new CostSheet();
  isButtonDisabled:Boolean;
  formatdate = 'dd/MM/yyyy';
  myDate = new Date();
  today: Date;
  companydataurlid: any;
  router: any;
 public costSheetNo:any;
  public chargesForm: FormGroup;
  subscription: Subscription;
  totalBuyingAmt: any;
  totalBuyingAmtTax: any;
  GetChargeItem: any;
  GetApplyPer: any;
  GetCurrency: any;
  GetTax: any;
  GetPayTo: any;
  cust: any;
  GetInvoiceTo: any;
  Tax: any;
  TaxPercentage: any;
  GetTaxPercentage: any;
  currencyId: any;
  GetCurr: any;
  currCode: any;
  applyPerId: any;
  buyingAmmount: number;
  totalSellingAmt: any;
  totalSellyingAmtTax: any;
  profitIncludingTax: number;
  profitExcludingTax: number;
  currencyCode: any;
  datachargpatch = [];
  addflag: boolean = false;
  chargeslist: any = [];
  chargesflag: boolean = false;
  isValidFormSubmitted = null;
  datachargsell = [];
  mergedData: any;
  datacharg: any = [];


  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  cargoId: any;
  costSheetId: any;
  costsheet: any;
  chargeId: any;
  insertedrecord: any;
  cost: any;
  rowData: any;
  costSheetData: any;

  constructor(private fb: FormBuilder, private httpclient: HttpClient, private route: ActivatedRoute, public datepipe: DatePipe, private _coreTranslationService: CoreTranslationService,private apiConfig:AppConfigService) {
    this.chargesForm = this.fb.group({
      Rows: this.fb.array([], [Validators.required])
    });
    this.addRow();
  }
  get formArr() {
    return this.chargesForm.get('Rows') as FormArray;
  }
  createFormGroup(): FormGroup {
    return this.fb.group({
      // firstname: [''],
      // lastname: ['',],
      // city:[''],
      // state: [''],
      chargeIdSell: [0],
      cargoId: [''],
      costSheetId: [0],
      chargeId: [0],
      status: [''],
      payingPartyId: 0,
      invoiceTo: [''],
      currencyName: [''],
      applyPer: [''],
      chargeItemId: '0',
      chargeDescription: [''],
      quantity: [''],
      totalAmount: [''],
      rate: [''],
      currId: [''],
      currencyId: [''],
      taxPercent: [''],
      currencyCode: [''],
      currCode: [''],
      taxAmount: [''],
      sellingrate: [''],
      selltotalAmount: [''],
      selltaxAmount: [''],
      selltaxPercent: [''],
      incomeExpense: ['EXPENSE'],
      sellincomeExpense: ['INCOME'],
      costSheetType: ['Freight'],
      costSheetStatus: [''],
      createdBy: [''],
      dateCreated: [''],
      modifiedBy: [''],
      dateModified: [''],
      verifiedBy: [''],
      buyExRateUsd: [''],
      buyExRateEur: [''],
      buyExRateTl: [''],
      buyExRateInr: [''],
      sellExRateUsd: [''],
      sellExRateEur: [''],
      sellExRateTl: [''],
      sellExRateInr: [''],
      exchangeRateDate: [''],
      costCategoryId: [''],
    });
  }
  ngOnInit(): void {
   
    this.chargesForm =this.fb.group({
        Rows: this.fb.array([]),
    })
    
    this.hero;

    console.log('this.hero', this.hero);
    this.getDataTableRows(this.companydataurlid);
    this.getTableRows(this.companydataurlid);

    JSON.stringify(this.modeOfTransport);
    console.log(this.modeOfTransport);


    JSON.stringify(this.transportDirection);
    console.log(this.transportDirection);

    JSON.stringify(this.myObj);
    console.log('this.myObj', this.myObj);
    console.log('cargoId', this.myObj.cargoId);
    this.cargoId=this.myObj.cargoId
    this.today = new Date();
    console.log(new Date().toISOString());

    this.companydataurlid = this.route.snapshot.paramMap.get('id');
    // this.getDataRows(this.companydataurlid);
    console.log(this.companydataurlid);

    this.getChargeItem(this.modeOfTransport, this.transportDirection);
    this.getApplyPer();
    this.getCurr();
    this.getCurrency();
    this.getTax();
    this.getTaxPercentage();
    this.getPayingTo();
    this.getInvoiceTo();


  }
  // end ngOnInit


  get getFormControls() {
    const control = this.chargesForm.get('Rows') as FormArray;
    return control;
  }

  addRow() {

    // const control =  this.chargesForm.get('Rows') as FormArray;
    // control.push(this.createFormGroup());
    this.formArr.push(this.createFormGroup());

  }



  remove(index: number, id: any) {
    // if(chargeId!=0){
    //   this.deleteSalesQuotesCharge(chargeId,sqid,sqdetailid);  
    // }
    // else{
    //     this.formArr.removeAt(index);
    // }
   
    if(this.costSheetId!=0){
      this.deleteCostSheetCharges(this.costSheetId, this.chargeId);
    }
    else
    {
      // const control =  this.chargesForm.get('Rows') as FormArray;
      // control.removeAt(index);
      this.formArr.removeAt(index);

    }
  }
  deleteCostSheetCharges(costSheetId:any, chargeId:any){
    this.httpclient.delete(`${this.apiConfig.apiBaseUrl}/api/CostSheet/${costSheetId}`).subscribe((Success: any) => {
    });
    this.httpclient.delete(`${this.apiConfig.apiBaseUrl}/api/CargoCharge/${chargeId}`).subscribe((Success: any) => {

    });
    this.httpclient.delete(`${this.apiConfig.apiBaseUrl}/api/CargoCharge/${chargeId+1}`).subscribe((Success: any) => {
     Swal.fire({
      title:'Delete'
     })
        this.patch();
    });
  }

  onSaveForm(form: FormGroup) {
    const formValue = this.chargesForm.value;
    console.log(formValue)

  }

  getChargeItem(mode: any, direction: any) {
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/ChargeItemMaster/${mode}/${direction}`).subscribe((response: any) => {
      console.log("ChargeItemMaster=", response);
      this.GetChargeItem = response;
    })
  }
  chargeItemName: any

  // onChangeChargeMaster(event, form) {
  //   // const selectedChargeItem = event.chargeItemName;
  //   // // const chargeItemName = selectedChargeItem.chargeItemName;
  //   // console.log(selectedChargeItem); // Use chargeItemName as needed
  //   // this.chargeItemName=selectedChargeItem
  //   // // Update the corresponding form control within the form array
  //   // const chargeItemControl =this.FormArray.at(index).get('chargeDescription');
  //   // chargeItemControl.setValue(this.chargeItemName)

  //   console.log("chargeItemName",event.chargeItemName);
  //   this.chargeItemName=event.chargeItemName;
  //   form.controls['chargeItemName'].setValue(this.chargeItemName);
  // }
  onChangeChargeMaster(event, form) {

    console.log("chargeItemName=", event.chargeItemName);
    this.chargeItemName = event.chargeItemName;
    form.controls['chargeItemName'].setValue(this.chargeItemName);

  }

  getApplyPer() {
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/ApplyPerMaster`).subscribe((response: any) => {
      console.log("ApplyPerMaster", response);
      this.GetApplyPer = response;
    })
  }
  // onApplyPer(event,form){
  //   console.log("applyPerId",event.applyPerId);
  //   this.applyPerId=event.applyPerId;
  //   form.controls['applyPerId'].setValue(this.applyPerId);
  // }

  getCurr() {
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/CurrencyMaster`).subscribe((response: any) => {
      console.log("CurrMaster", response);
      this.GetCurr = response;
    })
  }
  onGetCurr(event, form) {
    console.log("currencyId", event.currencyCode);
    this.currCode = event.currencyCode;
    form.controls['currCode'].setValue(this.currCode);
  }


  getCurrency() {
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/CurrencyMaster`).subscribe((response: any) => {
      console.log("CurrencyMaster", response);
      this.GetCurrency = response;
    })
  }
  onGetCurrency(event, form) {
    console.log("currencyId", event.currencyCode);
    this.currencyCode = event.currencyCode;
    form.controls['currencyCode'].setValue(this.currencyCode);
  }

  getTaxPercentage() {
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/TaxRate`).subscribe((response: any) => {
      console.log("TaxPercentage", response);
      this.GetTaxPercentage = response;
    })
  }


  getTax() {
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/TaxRate`).subscribe((response: any) => {
      console.log("TaxRate", response);
      this.GetTax = response;
    })
  }


  getInvoiceTo() {
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/Cmp/Customer`).subscribe((response: any) => {
      console.log("Invoice To", response);
      this.GetInvoiceTo = response;
    })
  }

  onInvoiceTo(event, form) {
    console.log("companyName=", event.companyName);
    this.cust = event.companyName;
    console.log(this.cust);
    let id = event.companyId;
    console.log(id);
    form.controls['cust'].setValue(this.cust);
  }


  getPayingTo() {
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/Cmp/Customer`).subscribe((response: any) => {
      console.log("Pay To", response);
      this.GetPayTo = response;
    })
  }

  onPayTo(event, form) {
    console.log("companyName=", event.companyName);
    this.cust = event.companyName;
    console.log(this.cust);
    let id = event.companyId;
    console.log(id);
    form.controls['cust'].setValue(this.cust);
  }




  onChange(index: number) {
    const subTotal = (this.formArr.at(index).get('rate').value || 0) *
      (this.formArr.at(index).get('quantity').value || 0);
    this.formArr.at(index).get('totalAmount').setValue(subTotal);

    const taxsubtotal = ((this.formArr.at(index).get('rate').value || 0) *
      (this.formArr.at(index).get('quantity').value || 0) * (this.formArr.at(index).get('taxPercent').value || 0)) / 100;
    this.formArr.at(index).get('taxAmount').setValue(taxsubtotal);


    // selling amt calculation
    const sellsubTotal = (this.formArr.at(index).get('sellingrate').value || 0) *
      (this.formArr.at(index).get('quantity').value || 0);
    this.formArr.at(index).get('selltotalAmount').setValue(sellsubTotal);

    const selltaxsubtotal = ((this.formArr.at(index).get('sellingrate').value || 0) *
      (this.formArr.at(index).get('quantity').value || 0) * (this.formArr.at(index).get('selltaxPercent').value || 0)) / 100;
    this.formArr.at(index).get('selltaxAmount').setValue(selltaxsubtotal);

    // Profit Excluding Tax & Profit Including Tax

    this.subscription = this.formArr.valueChanges.subscribe(data => {
          
      this.totalBuyingAmt=data.reduce((a,b) => a + +b.totalAmount, 0)
      this.totalBuyingAmtTax = data.reduce((a,b) => a + +b.taxAmount, 0)
      this.totalSellingAmt=data.reduce((a,b) => a + +b.selltotalAmount, 0)
      this.totalSellyingAmtTax = data.reduce((a,b) => a + +b.selltaxAmount, 0)
      
      this.profitExcludingTax=this.totalSellingAmt - this.totalBuyingAmt
      this.profitIncludingTax=(this.totalSellingAmt + this.totalSellyingAmtTax)-(this.totalBuyingAmt+this.totalBuyingAmtTax)

    })
  }


  tempData = [];
  rows: any;
  public kitchenSinkRows: any;

  getDataTableRows(id): Promise<any[]> {
    return new Promise((resolve, reject) => {

      this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/CargoCharge/GetCargoChargetbyCargoID?id=${id}`).subscribe((response: any) => {
        console.log('get CostSheet', response);
        this.rows = response;
        this.tempData = this.rows;
        this.kitchenSinkRows = this.rows;
        resolve(this.rows);
      }, reject);
    });
  }

  getTableRows(id): Promise<any[]> {
    return new Promise((resolve, reject) => {

      this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/CostSheet/GetCostSheettbyCargoID?id=${id}`).subscribe((response: any) => {
        console.log('get CostSheet', response);
        this.rows = response;
        this.tempData = this.rows;
        this.kitchenSinkRows = this.rows;
        resolve(this.rows);
      }, reject);
    });
  }


  async onAddCharges(form: FormGroup) {
    
  // console.log(this.chargesForm.value.Rows.length)
  
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

      this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/CargoCharge/GetCargoChargetbyCargoID?id=${this.companydataurlid}`).subscribe(async (response: any) => {
        console.log('get all charges on save btn');
        this.chargeslist=response;
        console.log("chargelist",this.chargeslist);
      console.log(this.chargeslist[0].costSheetId)
      console.log(this.rowData.costSheetId)
        if (this.chargeslist[0].costSheetId==0 || this.chargeslist[0].costSheetId==undefined)
        {
          console.log(this.costSheetId, "where costsheetId==0")
            console.log("Generate Cost Sheet")

            console.log(this.companydataurlid);
              this.getDataTableRows(this.companydataurlid);
              this.getTableRows(this.companydataurlid);
        
        
              console.log(form.value);
        
              console.log(form.value.costSheetId);
              this.CostSheetObj =    
              {
                costSheetId: 0,
                cargoId: this.companydataurlid || this.hero,
                costSheetType: "Freight",
                costSheetStatus: "string",
                createdBy: 0,
                dateCreated: new Date().toISOString(),
                modifiedBy: 0,
                dateModified: new Date().toISOString(),
                verifiedBy: "string",
                buyExRateUsd: 0,
                buyExRateEur: 0,
                buyExRateTl: 0,
                buyExRateInr: 0,
                sellExRateUsd: 0,
                sellExRateEur: 0,
                sellExRateTl: 0,
                sellExRateInr: 0,
                exchangeRateDate: new Date().toISOString(),
                costCategoryId: 0
              }
        
              console.log('this.CostSheetObj', this.CostSheetObj);
              
        
              this.httpclient.post(`${this.apiConfig.apiBaseUrl}/api/CostSheet`, JSON.stringify(this.CostSheetObj), this.headers).subscribe(async res => {
                console.log('Success');
                console.log(res);
              this.costsheet=res;
              console.log(this.costsheet.costSheetId)
              JSON.stringify(this.costsheet.costSheetId)
              console.log(this.costsheet.costSheetId)
              this.costSheetNo=JSON.stringify(this.costsheet.costSheetId)
              console.log(this.costSheetNo)
                // this.resetForm(form);
                this.getDataTableRows(this.companydataurlid);
                this.getTableRows(this.companydataurlid);
                Swal.fire({
                  title: ' Added'
                })


                if(this.costSheetNo>0){
                  console.log("welcome to add charges")
                  for (let i = 0; i < this.chargesForm.value.Rows.length; i++) {
                    const charge = this.chargesForm.value.Rows[i];
                    // console.log(this.costsheet.costSheetId,"eeeeeee")
                    this.datacharg[i] = {
                        costSheetId: this.costSheetNo,
                        cargoId: this.companydataurlid || this.cargoId,
                        chargeId: charge.chargeId,
                        chargeItemId: charge.chargeItemId,
                        chargeDescription: charge.chargeDescription,
                        quantity: charge.quantity,
                        applyPer: charge.applyPer,
                        rate: charge.rate,
                        currencyId: charge.currId,
                        currencyCode: charge.currCode,
                        totalAmount: charge.totalAmount,
                        taxPercent: charge.taxPercent,
                        taxAmount: charge.taxAmount,
                        incomeExpense: charge.incomeExpense,
                        payingPartyId: charge.payingPartyId,
                        invoiceTo: charge.invoiceTo,
            
                    };
            
                    this.datachargsell[i] = {
                        costSheetId: this.costSheetNo,
                        cargoId: this.companydataurlid || this.cargoId,
                        chargeId: charge.chargeIdSell,
                        chargeItemId: charge.chargeItemId,
                        chargeDescription: charge.chargeDescription,
                        quantity: charge.quantity,
                        applyPer: charge.applyPer,
                        rate: charge.sellingrate,
                        currencyId: charge.currencyId,
                        currencyCode: charge.currencyCode,
                        totalAmount: charge.selltotalAmount,
                        taxPercent: charge.selltaxPercent,
                        taxAmount: charge.selltaxAmount,
                        incomeExpense: charge.sellincomeExpense,
                        payingPartyId: charge.payingPartyId,
                        invoiceTo: charge.invoiceTo,
                    };
                }
                console.log("=", this.costSheetNo);
                console.log("form data datacharg=", this.datacharg.length);
                console.log("form data datacharg=", this.datacharg);
                console.log("form data datacharg sell=", this.datachargsell);
            
            
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
                console.log('mergedData', this.mergedData)
                for (let i = 0; i < this.mergedData.length; i += 2) {
                    console.log('***********************************************')
            
                    // {
                    // console.log(this.costsheet.costSheetId)
                    console.log(this.costSheetNo)
            
                    let chargeszeroID = []
                    let charIDnew = this.mergedData[i].chargeId
                    for (let j = 0; j < this.mergedData.length; j++) {
                        if (this.mergedData[j].chargeId == 0)
                            chargeszeroID.push(this.mergedData[j])
                    }
                    console.log("zero id array", chargeszeroID)
            
                    for (const data of chargeszeroID) {
                        await new Promise<void>((resolve, reject) => {
                            this.httpclient.post(`${this.apiConfig.apiBaseUrl}/api/CargoCharge`, JSON.stringify(data), this.headers).subscribe(
                                () => {
                                    resolve(); // Resolve the promise when the insertion is successful
                                    Swal.fire({
                                        title: 'Charges Added'
                                    })
            
                                },
                                (error) => {
                                    reject(error); // Reject the promise if there is an error
                                    Swal.fire({
                                        title: 'Something Went Wrong 2',
                                        // icon:"error"
                                    })
                                }
                            );
                        });
                        console.log(this.mergedData)
                    }
            
                }
                }


              }, async err => {
                console.log('Error');
                console.log(err);
                Swal.fire({
                  title: 'Something Went Wrong 1'
                })



              });
              console.log(form.value.costSheetId)

        }
        else
        {
          this.patch();
          console.log(this.costSheetId, "where costsheetId > 0")

          console.log("CostSheet Already Generated - Update Now")

          console.log("form.value", form.value);

          this.CostSheetObj =
          {
              costSheetId: this.costSheetNo||this.chargeslist[0].costSheetId,
              cargoId: this.companydataurlid || this.hero,
              costSheetType: "Freight",
              costSheetStatus: "string",
              createdBy: 0,
              dateCreated: new Date().toISOString(),
              modifiedBy: 0,
              dateModified: new Date().toISOString(),
              verifiedBy: "string",
              buyExRateUsd: 0,
              buyExRateEur: 0,
              buyExRateTl: 0,
              buyExRateInr: 0,
              sellExRateUsd: 0,
              sellExRateEur: 0,
              sellExRateTl: 0,
              sellExRateInr: 0,
              exchangeRateDate: new Date().toISOString(),
              costCategoryId: 0
          }
      
      
      
          console.log(JSON.stringify(this.CostSheetObj));
          this.httpclient.put(`${this.apiConfig.apiBaseUrl}/api/CostSheet/${this.CostSheetObj.costSheetId}`, JSON.stringify(this.CostSheetObj), this.headers).subscribe(res => {
              console.log(' Update Cost sheet Success');
              console.log(res);
      
      
              let updateData: any = res
              this.insertedrecord.push(updateData)
              console.log("Updated Record:", this.insertedrecord);
              this.costSheetId = this.insertedrecord[0].costSheetId;
              JSON.stringify(this.costSheetId);
              // this.isSavebtn=true;
              // console.log(this.isSavebtn);
              Swal.fire({
                  title: 'Cost Sheet UPDATE'
              })
          }, err => {
              console.log('Error');
              console.log(err);
              Swal.fire({
                  title: 'Something went wrong'
              })
          });
      
      
          // if(this.updateData.opportunityId>0){
          console.log(form.value.modeOfTransport);
      
          console.log(form.value)
      
      
      
          


    // if (this.costSheetId>0){
    // this.getChargesList(id);
    for (let i = 0; i < this.chargesForm.value.Rows.length; i++) {
      const charge = this.chargesForm.value.Rows[i];
      // console.log(this.costsheet.costSheetId,"eeeeeee")
      this.datacharg[i] = {
          costSheetId: this.costSheetNo ||this.chargeslist[0].costSheetId,
          cargoId: this.companydataurlid || this.cargoId,
          chargeId: charge.chargeId,
          chargeItemId: charge.chargeItemId,
          chargeDescription: charge.chargeDescription,
          quantity: charge.quantity,
          applyPer: charge.applyPer,
          rate: charge.rate,
          currencyId: charge.currId,
          currencyCode: charge.currCode,
          totalAmount: charge.totalAmount,
          taxPercent: charge.taxPercent,
          taxAmount: charge.taxAmount,
          incomeExpense: charge.incomeExpense,
          payingPartyId: charge.payingPartyId,
          invoiceTo: charge.invoiceTo,

      };

      this.datachargsell[i] = {
          costSheetId: this.costSheetNo||this.chargeslist[0].costSheetId,
          cargoId: this.companydataurlid || this.cargoId,
          chargeId: charge.chargeIdSell,
          chargeItemId: charge.chargeItemId,
          chargeDescription: charge.chargeDescription,
          quantity: charge.quantity,
          applyPer: charge.applyPer,
          rate: charge.sellingrate,
          currencyId: charge.currencyId,
          currencyCode: charge.currencyCode,
          totalAmount: charge.selltotalAmount,
          taxPercent: charge.selltaxPercent,
          taxAmount: charge.selltaxAmount,
          incomeExpense: charge.sellincomeExpense,
          payingPartyId: charge.payingPartyId,
          invoiceTo: charge.invoiceTo,
      };
  }
  console.log("=", this.costSheetNo);
  console.log("form data datacharg=", this.datacharg.length);
  console.log("form data datacharg=", this.datacharg);
  console.log("form data datacharg sell=", this.datachargsell);


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
  console.log('mergedData', this.mergedData)
  for (let i = 0; i < this.mergedData.length; i += 2) {
      for (let j = i; j < i + 2; j++) {
          await new Promise<void>(async (resolve, reject) => {
              //  console.log(j,this.mergedData)
              let charIDnew = this.mergedData[j].chargeId

              if (charIDnew) {
                  this.httpclient.put(`${this.apiConfig.apiBaseUrl}/api/CargoCharge/${this.mergedData[j].chargeId}`, JSON.stringify(this.mergedData[j]), this.headers).subscribe(
                      () => {
                          resolve(); // Resolve the promise when the insertion is successful
                          Swal.fire({
                              title: 'Charges Updated'
                          })
                      },
                      (error) => {
                          reject(error); // Reject the promise if there is an error
                          Swal.fire({
                              title: 'Something went wrong'
                          })
                      }
                  );
              }

          });


      }
  }
         }
    })
  // })
   }
}

  patch(){
    // prompt("this.costSheetId",JSON.stringify(this.costSheetId))
    // prompt("this.costSheetNO",JSON.stringify(this.costSheetNo))
    // prompt("this.costSheet",JSON.stringify(this.costsheet))

    this.getChargesList(this.cargoId || this.companydataurlid,this.costSheetNo||this.costSheetId)
  }
    // this.getChargesList(this.chargeId)
   
    getChargesList(id, id1){
      console.log("this.formArr.length"); 
      console.log(this.formArr.length);
  
      this.formArr.clear();
      // console.log(this.chargeId);
      // console.log(this.cargoId);
      console.log(this.companydataurlid);
      // console.log(this.costSheetId);
      // console.log(this.costSheetNo)
      // ${this.companydataurlid}
     
 
      {
        // ${this.apiConfig.apiBaseUrl}/api/CargoCharge/GetByCargoIDandCostSheetID?id=${id}&id1=${id1}
        // ${this.apiConfig.apiBaseUrl}/api/CargoCharge/GetCargoChargeByCostSheetID?id=${id}
        // `${this.apiConfig.apiBaseUrl}/api/CargoCharge/GetCargoChargetbyCargoID?id=${this.companydataurlid}`
        // ${this.apiConfig.apiBaseUrl}/api/CargoCharge/
          this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/CargoCharge/GetCargoChargetbyCargoID?id=${this.companydataurlid}`).subscribe((response: any) => {
          console.log('get all charges');
          this.chargeslist=response;
          console.log("chargelist",this.chargeslist);
         
          // prompt("this.costSheetId",JSON.stringify(this.costSheetId))
          // prompt("this.costSheetNO",JSON.stringify(this.costSheetNo))
          // prompt("this.costSheet",JSON.stringify(this.costsheet))
  
          if(this.chargeslist.length==0){
              this.chargesflag=false;
              console.log("zero charges");
              Swal.fire({
                title: 'Data not Found'
              })
              // this.chargesForm = this.fb.group({
              //   Rows: this.fb.array([this.createFormGroup()]),
              // });
  
          }
          
          // if(id=319199)   
          else
          {
            this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/CostSheet/GetCostSheettbyCargoID?id=${this.companydataurlid}`).subscribe((response: any) => {
              console.log('get all charges');
              this.rowData=response;
              console.log("rowData",this.rowData);
          


            this.chargesForm.patchValue({
                  costSheetId: this.rowData.costSheetId,
                  cargoId: this.cargoId||this.companydataurlid,
                  costSheetType: this.rowData.costSheetType,
                  costSheetStatus: this.rowData.costSheetStatus,
                  createdBy: this.rowData.createdBy,
                  dateCreated: this.rowData.dateCreated,
                  modifiedBy: this.rowData.modifiedBy,
                  dateModified: this.rowData.dateModified,
                  verifiedBy: this.rowData.verifiedBy,
                  buyExRateUsd: this.rowData.buyExRateUsd,
                  buyExRateEur: this.rowData.buyExRateEur,
                  buyExRateTl: this.rowData.buyExRateTl,
                  buyExRateInr: this.rowData.buyExRateInr,
                  sellExRateUsd: this.rowData.sellExRateUsd,
                  sellExRateEur: this.rowData.sellExRateEur,
                  sellExRateTl: this.rowData.sellExRateTl,
                  sellExRateInr: this.rowData.sellExRateInr,
                  exchangeRateDate: this.rowData.exchangeRateDate,
                  costCategoryId: this.rowData.costCategoryId
            })
            console.log("----------",this.chargesForm.value)
          });

              // this.chargesflag=true;
              console.log("chargelist length",this.chargeslist.length,this.chargeslist[0].cargoId)
  
  
              for(let i=0,j=0;j<=this.chargeslist.length/2;j++,i+=2){

console.log(i,"i");
console.log(j,"j");
  
                this.datachargpatch[j] = 
                    {
                      cargoId:this.chargeslist[i].cargoId ||this.companydataurlid||this.hero||this.cargoId,
                      costSheetId:this.chargeslist[i].costSheetId || this.costSheetNo ||this.costSheetId ||this.chargeslist[i].costSheetNo,
                      chargeId:this.chargeslist[i].chargeId,
                      chargeItemId: this.chargeslist[i].chargeItemId,
                      chargeDescription: this.chargeslist[i].chargeDescription,
                      quantity: this.chargeslist[i].quantity,
                      applyPer: this.chargeslist[i].applyPer,
                      rate: this.chargeslist[i].rate,
                      currId: this.chargeslist[i].currencyId,
                      currCode: this.chargeslist[i].currencyCode,
                      totalAmount: this.chargeslist[i].totalAmount,
                      taxPercent: this.chargeslist[i].taxPercent,
                      taxAmount:this.chargeslist[i].taxAmount,
                      incomeExpense:this.chargeslist[i].incomeExpense,
                      chargeIdSell:this.chargeslist[i+1].chargeId,
                      sellingrate:this.chargeslist[i+1].rate,
                      currencyId:this.chargeslist[i+1].currencyId,
                      currencyCode:this.chargeslist[i+1].currencyCode,
                      selltotalAmount:this.chargeslist[i+1].totalAmount,
                      selltaxPercent:this.chargeslist[i+1].taxPercent,
                      selltaxAmount:this.chargeslist[i+1].taxAmount,
                      sellincomeExpense:this.chargeslist[i+1].incomeExpense,
                     
                      payingPartyId:this.chargeslist[i+1].payingPartyId,
                      invoiceTo:this.chargeslist[i+1].invoiceTo,
                    }
                    
                console.log("patch data",this.datachargpatch)
               
  
                // if(this.salesdataurlid){
                          this.formArr.push(
                            this.fb.group({
                              cargoId:this.companydataurlid || this.cargoId ||this.chargeslist[i].cargoId ||this.hero,
                              costSheetId:this.costSheetId || this.costSheetNo || this.chargeslist[i].costSheetId || this.chargeslist[i].costSheetNo,
                            chargeId:this.chargeslist[i].chargeId,
                            chargeItemId: this.chargeslist[i].chargeItemId,
                            chargeDescription:this.chargeslist[i].chargeDescription,
                            quantity: this.chargeslist[i].quantity,
                            applyPer: this.chargeslist[i].applyPer,
                            rate: this.chargeslist[i].rate,
                            currId: this.chargeslist[i].currencyId,
                            currCode: this.chargeslist[i].currencyCode,
                            totalAmount: this.chargeslist[i].totalAmount,
                            taxPercent: this.chargeslist[i].taxPercent,
                            taxAmount:this.chargeslist[i].taxAmount,
                            incomeExpense:this.chargeslist[i].incomeExpense,
                            chargeIdSell:this.chargeslist[i+1].chargeId,
                            sellingrate:this.chargeslist[i+1].rate,
                            currencyId:this.chargeslist[i+1].currencyId,
                            currencyCode:this.chargeslist[i+1].currencyCode,
                            selltotalAmount:this.chargeslist[i+1].totalAmount,
                            selltaxPercent:this.chargeslist[i+1].taxPercent,
                            selltaxAmount:this.chargeslist[i+1].taxAmount,
                            sellincomeExpense:this.chargeslist[i+1].incomeExpense,
                            
                            payingPartyId:this.chargeslist[i+1].payingPartyId,
                            invoiceTo:this.chargeslist[i+1].payingPartyId,
                          }));
  
              }
            }
          
          });
  
  
          this.chargesForm.patchValue(this.datachargpatch);
          console.log("patch data",this.datachargpatch)
  
          // this.chargesForm 
          console.log("after patch")
          console.log(this.chargesForm.value)
      }
   
    }

}
// }