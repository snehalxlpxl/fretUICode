import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
import * as snippet from 'app/cargo/datatables.snippetcode';

//import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { HttpClient } from '@angular/common/http';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-arkas',
  templateUrl: './arkas.component.html',
  styleUrls: ['./arkas.component.scss']
})
export class ArkasComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;
  @ViewChild('pdfTable') pdfTable: ElementRef;
  USERS = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'sincere@april.biz',
      phone: '1-770-736-8031 x56442',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'shanna@melissa.tv',
      phone: '010-692-6593 x09125',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      email: 'nathan@yesenia.net',
      phone: '1-463-123-4447',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'julianne@kory.org',
      phone: '493-170-9623 x156',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'lucio@annie.ca',
      phone: '(254)954-1289',
    },
    {
      id: 6,
      name: 'Mrs. Dennis',
      email: 'karley@jasper.info',
      phone: '1-477-935-8478 x6430',
    },
  ];

  rows: any = []; 
  public _snippetCodeKitchenSink = snippet.snippetCodeKitchenSink;
  public basicSelectedOption: number = 10;
  public kitchenSinkRows: any;
  public ColumnMode = ColumnMode;
  public SelectionType = SelectionType;
  public selected = [];

  private tempData = [];

  constructor(private httpclient:HttpClient, private modalService: NgbModal) { }

  ngOnInit(): void {

    this.getHBLList();
  }


    /**
   * For ref only, log selected values
   *
  //  * @param selected
  //  */
  onSelect({ selected }) {

    if(selected.type=='click'){
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    }
  }


  onActivate(event, modalXL) {

    if(event.type=='click'){

    console.log('Activate Event', event.row.hblid);

    if(event.row !=null){

      this.httpclient.get(`http://38.17.55.137:5000/api/cargo/cargohbls/${event.row.hblid}`).subscribe(res=>{
        console.log('get HBL');
        console.log(res['description1']);
        if(res!= null){

          const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
            putOnlyUsedFonts:true,
            floatPrecision: 16 
          });
          doc.setFont("times","italic",300);
          doc.setFontSize(7);
          //BL NO
          doc.text(res['hblnumber'],123, 27.5,{align:'left',maxWidth:50});
          // SHIPPER
          doc.text(res['shipperAddress'], 11, 29,{align:'left',maxWidth:50});
         //CONSIGNEE
          doc.text(res['consigneeAddress'], 11, 60.5,{align:'left',maxWidth:40});
         //NOTIFY PARTY
          doc.text(res['notifyAddress'], 11, 89.5,{align:'left',maxWidth:55});
           //For delivery of goods please apply to
           doc.text(res['deliveryInstructions'], 112, 80,{align:'left',maxWidth:70});
          //VESSEL
          doc.text(res['vesselVoyage'], 11, 116.5,{align:'left',maxWidth:50});
          //PLACE OF RECEIPT
          doc.text("-", 75, 116,{align:'left',maxWidth:30});
          //POL
          doc.text(res['portOfLoading'], 11, 125,{align:'left',maxWidth:30});
          //POD
          doc.text(res['portOfDischarge'], 75, 125,{align:'left',maxWidth:50});
          //PLACE OF DELIVERY
          doc.text(res['placeOfDelivery'], 138, 125,{align:'left',maxWidth:50});
           //marks and numbers
           doc.text(res['marksandNumbers'], 11, 139,{align:'left',maxWidth:30});
           //no of packages
          doc.text(res['noOfPackages'], 47, 139,{align:'left',maxWidth:40});
          //description of goods
          doc.text(res['descriptionOfPackagesGoods'], 77, 139,{align:'left',maxWidth:50});
       //Gross weight
       doc.text(res['grossWeight'], 132, 139,{align:'left',maxWidth:20});
        //Measurement
        doc.text(res['measurement'], 166, 139,{align:'right',maxWidth:30});
        //Freight Amount
        doc.text(res['freightCharges'], 11, 246.5,{align:'left',maxWidth:30});
        //Freight payable at
        doc.text(res['description1'], 74, 246.5,{align:'left',maxWidth:30});
        //Place and date of issue
        doc.text(res['description2'], 133, 246.5,{align:'left',maxWidth:50});
          //Number of original BL
          doc.text(res['byAgentForCarrier'], 74, 257.5,{align:'left',maxWidth:30});

           //As Agent For, FRETLOG India Pvt. Ltd.
           doc.setFontSize(8);
           doc.setFont('times', 'bold');
           doc.text('AS AGENT For, FRETLOG India Pvt. Ltd.', 133, 258,{align:'left',maxWidth:60});
           doc.setFontSize(7);
           doc.setFont('times', 'normal');
           doc.text('(Authorized Signatory)', 173, 274,{align:'left',maxWidth:60});

      
      
      //This is a key for printing
       doc.output('dataurlnewwindow');
       doc.autoPrint();
          // doc.save("a4.pdf");


        }
       
      }, err => {
        console.log("error while fetching data");
    
      });

    }

 



    // const modalRef= this.modalService.open(modalXL, {
    //   centered: true,
    //   size: 'xl'
    // });

    // this.cargoDetailsForm.patchValue({
    //   jobNo: event.row.jobNo,
    //   customerName:event.row.customerName
    //  });

   // modalRef.componentInstance.jobNo = event.row.jobNo;
 }
}

    /**
   * Search (filter)
   *
   * @param event
   */
    filterUpdate(event) {
      const val = event.target.value.toLowerCase();
  
      // filter our data
      const temp = this.tempData.filter(function (d) {
        return d.jobNo.toLowerCase().indexOf(val) !== -1 || !val;
      });
  
      // update the rows
      this.kitchenSinkRows = temp;
      // Whenever the filter changes, always go back to the first page
     // this.table.offset = 0;
    }

  getHBLList(){

    http://38.17.55.137:5000/api/cargo/cargohbl/list

    this.httpclient.get(`http://38.17.55.137:5000/api/cargo/cargohbl/list`).subscribe(res=>{
      console.log('get all cargolist');
      this.rows=res;
      this.kitchenSinkRows = this.rows;
      this.tempData = this.rows;
    }, err => {
      console.log("error while fetching data");
  
    });




  }

  // public openPDF(): void {
  //   let DATA: any = document.getElementById('htmlData');
  //   html2canvas(DATA).then((canvas) => {
  //     let fileWidth = 208;
  //     let fileHeight = (canvas.height * fileWidth) / canvas.width;
  //     const FILEURI = canvas.toDataURL('image/png');
  //     let PDF = new jsPDF('p', 'mm', 'a4');
  //     let position = 0;
  //     PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
  //     PDF.save('angular-demo.pdf');
  //   });
  // }

 
  //PDF genrate button click function
  public downloadAsPDF() {
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts:true,
      floatPrecision: 16 
    });
    doc.setFont("times","italic",300);
    doc.setFontSize(7);
    //BL NO
    doc.text("ARK00856356",124, 26,{align:'left',maxWidth:30});
    // SHIPPER
    doc.text("NUBIOLA INDIA PVT LTD. 70/1A,MEVALURKUPPAM VILLAGE,THANDALAM P.O. SRIPERUMBUDUR, TQ,KANCHEEPURM-602105", 10, 29,{align:'left',maxWidth:50});
   //CONSIGNEE
    doc.text("NUBIOLA INDIA PVT LTD. 70/1A,MEVALURKUPPAM VILLAGE,THANDALAM P.O. SRIPERUMBUDUR, TQ,KANCHEEPURM-602105", 10, 59,{align:'left',maxWidth:50});
   //NOTIFY PARTY
    doc.text("NUBIOLA INDIA PVT LTD. 70/1A,MEVALURKUPPAM VILLAGE,THANDALAM P.O. SRIPERUMBUDUR, TQ,KANCHEEPURM-602105", 10, 89,{align:'left',maxWidth:50});
    //VESSEL
    doc.text("MONTPELLIER /0026W", 10, 116,{align:'left',maxWidth:30});
    //PLACE OF RECEIPT
    doc.text("NAVKAR ICD/UMERGAON", 73, 116,{align:'left',maxWidth:30});
    //POL
    doc.text("NHAVA SHEVA, INDIA", 10, 124,{align:'left',maxWidth:30});
    //POD
    doc.text("JEBEL ALI,UNITED ARAB EMIRATES", 73, 124,{align:'left',maxWidth:50});
    //PLACE OF DELIVERY
    doc.text("JEBEL ALI,UNITED ARAB EMIRATES", 132, 124,{align:'left',maxWidth:50});
     //marks and numbers
     doc.text("01 TO 98 PCS & 01 WOODEN BOX, 01 TO 100 PCS & 02 WOODEN BOXES", 10, 137,{align:'left',maxWidth:30});
     //marks and numbers
    doc.text("2 X 20", 50, 137,{align:'center',maxWidth:40});
    //description of goods
    doc.text("02 X 20` FCL STC: TOTAL 201 PACKAGES, 01 TO 98 PCS & 01 WOODEN BOX, 01 TO 100 PCS & 02 WOODEN BOXES,Multipurpose Open Wooden Box for Gift Packing, Diwali Gifting, Decoration, Organiser (BP3-BOX8_Beige_7.2X7.2X3.1 IN)", 75, 137,{align:'left',maxWidth:30});
 //Gross weight
 doc.text("Gr 45780.000 Nt 45312.000", 135, 137,{align:'center',maxWidth:15});
  //Measurement
  doc.text("40.0000 CBM", 165, 137,{align:'right',maxWidth:30});
  //Freight Amount
  doc.text("456883.890", 10, 245,{align:'left',maxWidth:30});
  //Freight payable at
  doc.text("MUMBAI", 73, 245,{align:'left',maxWidth:30});
  //Place and date of issue
  doc.text("MUMBAI , 24/12/2022", 132, 245,{align:'left',maxWidth:50});
    //Number of original BL
    doc.text("Three(3)", 73, 255,{align:'left',maxWidth:30});


//This is a key for printing
 doc.output('dataurlnewwindow');
 doc.autoPrint();
    // doc.save("a4.pdf");


   // MEVALURKUPPAM VILLAGE,THANDALAM P.O. SRIPERUMBUDUR, TQ,KANCHEEPURM-602105
    // //get table html
    // const pdfTable = this.pdfTable.nativeElement;
    // //html to pdf format
    // var html = htmlToPdfmake(pdfTable.innerHTML);
   
    // const documentDefinition = { content: html };
    // pdfMake.createPdf(documentDefinition).open();
    
  
  }

}
