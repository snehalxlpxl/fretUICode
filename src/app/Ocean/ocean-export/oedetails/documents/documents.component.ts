import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import * as snippet from 'app/companies/datatables.snippetcode';
import { ColumnMode, DatatableComponent, id, SelectionType } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { startWith, switchMap } from 'rxjs/operators';
import { from, Observable,Subscription, timer } from 'rxjs';
// import { PdfService } from './pdf.service';
import {Document} from './Document'
// import { PdfViewerComponent } from 'ng2-pdf-viewer'; 
import { AppConfigService } from 'app/services/app-config.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  // @ViewChild(PdfViewerComponent, {static: false})
  // private pdfComponent: PdfViewerComponent;
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public SelectionType = SelectionType;
  companydataurlid:any;
  tempData= [];
  rows: any;
  public ColumnMode = ColumnMode;
  public chkBoxSelected = [];
  // public exportCSVData;
  selectElementText = "Select";
  public selected = [];
  public expanded = {};
  public myType = [];
  someSubscription: any;
  router: any;
  documentType:any;
  private reset$ = new Subject();
  timer$: Observable<any>;
  subscription: Subscription;

  DocumentObj: Document=new Document();

  @Input() hero;
  formatdate = 'dd/MM/yyyy'; 
  myDate=new Date();
  DocumentForm: FormGroup;

  today:Date;
  
  http: any;
  // pdfurl="http://38.17.55.137:5000/api/webtracking/download/724079";
  // pdfurl='../assets/sample.pdf'
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;

  
  private _unsubscribeAll: Subject<any>;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  // snippet code variables
  public _snippetCodeKitchenSink = snippet.snippetCodeKitchenSink;
  public _snippetCodeInlineEditing = snippet.snippetCodeInlineEditing;
  public _snippetCodeRowDetails = snippet.snippetCodeRowDetails;
  public _snippetCodeCustomCheckbox = snippet.snippetCodeCustomCheckbox;
  public _snippetCodeResponsive = snippet.snippetCodeResponsive;
  public _snippetCodeMultilangual = snippet.snippetCodeMultilangual;
  public _snippetCodeVertical = snippet.snippetCodeVertical;
  service: any;



  constructor(private httpclient : HttpClient, public datepipe:DatePipe,private route:ActivatedRoute,private modalService: NgbModal, private fb: FormBuilder,private apiConfig:AppConfigService)
  // private pdfService: PdfService,
  { }

  ngOnInit(): void {
    this.today =new Date();
    this.hero;
    console.log('this.hero',this.hero);

    this.getDocumentType();

    this.companydataurlid = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.companydataurlid);
   if(this.companydataurlid)
   {
    this.getDataTableRows(this.companydataurlid);

  // this.add(this.companydataurlid);
    // console.log("myid",this.companydataurlid)
   }
  }
  getDocumentType(){
    this.httpclient.get(`${this.apiConfig.apiBaseUrl}/api/DocumentMaster`).subscribe((response: any) => {
        console.log("Document Type",response);
        this.documentType=response;
      })
  }

  getDataTableRows(id:any): Promise<any[]> {
    // alert("get id"+id)
      return new Promise((resolve, reject) => {
        this.httpclient.get(` ${this.apiConfig.apiBaseUrl}/api/CargoDocument/GetDocumentByCargoID?id=${id}`).subscribe((response: any) => {
          console.log('get Documents',this.rows);
          this.rows = response;
          this.tempData = this.rows;
          this.kitchenSinkRows = this.rows;
          resolve(this.rows);
        }, reject);
      });
    
    }


  deleterecord(id){
    this.httpclient.delete(`${this.apiConfig.apiBaseUrl}/api/CargoDocument/${id}`).subscribe((Success: any) => {
         console.log('delete row');
         console.log(id);
  
         this.getDataTableRows(id);
      });
  
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
  openPDF(id: any) {
    prompt("id="+id)
    // this.service.GeneratePDF(id).subscribe(res=>{
    //   let blob:Blob=res.body as Blob;
    //   let url=window.URL.createObjectURL(blob);
    //    this.pdfurl=url;
    //   // window.open(url);
      
    // })
    //  const pdfurl='http://38.17.55.137:5000/api/webtracking/download/724079'
    //  const pdfurl='http://38.17.55.137:5000/api/webtracking/download/${id}'

     const pdfurl='../assets/sample.pdf'
  //  const pdfurl=`${this.apiConfig.apiBaseUrl}/api/CargoDocument/GetDocumentBycargoDocumentId?id=${id}`
  //  window.open(this.pdfurl, '_blank');

    window.open(pdfurl);
  // this.pdfSrc = 'http://38.17.55.137:5000/api/webtracking/download/724079';

    // this.getPDF().subscribe((pdfData: Blob) => {
    //   const fileURL = URL.createObjectURL(pdfData);
    //   window.open(fileURL, '_blank');
    // });
  }
  pageRendered() {
    // this.pdfComponent.pdfViewer.currentScaleValue = 'page-fit';
  }


  // pdfFilePath = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";




  modalOpenForm(modalForm) {
    size:'lg'
    // alert(this.country);
    // this.modalService.open(modalForm);
    this.DocumentForm = this.fb.group({
      documentType:[''],
      // containerId:0,
      // containerCode:[''],
      // containerTypeId:0,
      // cargoId:0,
      // containerNumber:[''],
      // seal1:[''],
      // seal2:[''],
      // vgmweight:[''],
      // description:[''],
      dateCreated:['']
    });
   
    this.openModal(modalForm)

  }

  openModal(targetModal) {
    // alert(this.country);
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      // size: 'lg'
    });
  }


  add(form: FormGroup){
        if(this.companydataurlid){

      console.log(this.companydataurlid);
      this.getDataTableRows(this.companydataurlid);
      this.DocumentObj =
      {
        "cargoDocumentId": 0,
        "documentTypeId": 0,
        "documentType": form.value.documentType,
        "documentName": "",
        "documentFileType": "",
        "remarks": "",
        "ftplink": "",
        "createdBy": form.value.createdBy,
        "dateCreated": new Date().toISOString(),
        "modifiedBy": form.value.modifiedBy,
        "dateModified": new Date().toISOString(),
        "deletedBy": 0,
        "dateDeleted": "",
        "isDeleted": false,
        "cargoId": this.companydataurlid
      }
    }
  }





  onSubmitService(form: FormGroup) {

    console.log( this.DocumentForm.value);

    this.DocumentObj=this.DocumentForm.value;

    console.log('this.DocumentObj');
    console.log( this.DocumentObj);

    
    console.log("companydataurlid");
    console.log(this.companydataurlid);    

    console.log("this.DocumentObj.cargoDocumentId*******");
    console.log(this.DocumentObj.cargoDocumentId);

    if(this.DocumentObj.cargoDocumentId==0){
      console.log('this.hero',this.hero);
      console.log("INSERT");
      this.add(this.DocumentForm);
    this.success();
    console.log(this.DocumentObj.cargoDocumentId);
    }
    // else
  
    // {
   
    //   console.log("UPDATE");
    //  this.Update(this.DocumentForm)
    //   this.success();

    //   console.log(this.DocumentObj.cargoDocumentId);
    // }
    this.resetForm(form);
  
    this.modalService.dismissAll();

}
success(){
  Swal.fire(
    'Save',
    'Saved Successfully',
    'success'
  )
}
resetForm(form: FormGroup) {

  form.reset();

}
}
