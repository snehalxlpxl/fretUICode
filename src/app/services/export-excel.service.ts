import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

  constructor() { }


  exportExcel(excelData) {

    const dateFormat = async function (date, format) {
      return moment(date).format(format);
    }

    //Title, Header & Data
    const title = excelData.title;
    const header = excelData.headers
    const data = excelData.data;

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Sales Data');

   


 
    //Adding Header Row
    let headerRow = worksheet.addRow(header);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4167B8' },
        bgColor: { argb: '' }
      }
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFF' },
        size: 12
      }
    })

    // Adding Data with Conditional Formatting
    data.forEach(d => {
      let row = worksheet.addRow(d);

      //console.log(row);
      let datecol15=row.getCell(15);
      let datecol16=row.getCell(16);
      let datecol23=row.getCell(23);
      let datecol25=row.getCell(25);
    

     row.getCell(15).value = new Date(datecol15.value.toString());
     row.getCell(15).numFmt = "DD/MM/YYYY";

     row.getCell(16).value = new Date(datecol16.value.toString());
     row.getCell(16).numFmt = "DD/MM/YYYY";

     row.getCell(23).value = new Date(datecol23.value.toString());
     row.getCell(23).numFmt = "DD/MM/YYYY";

     row.getCell(25).value = new Date(datecol25.value.toString());
     row.getCell(25).numFmt = "DD/MM/YYYY";


     //moment().format("MM/DD/YYYY");

      // console.log(row.getCell(15).numFmt);

      // datecol.style={
      //   numFmt:'DD-MM-YYYY'
      // }


      let sales = row.getCell(6);
     // console.log(sales);
      let color = 'FF99FF99';
      if (+sales.value < 200000) {
        color = 'FF9999'
      }

      sales.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color }
      }
    }
    );

 
    worksheet.getColumn(3).width = 20;
    worksheet.addRow([]);

    //Generate & Save Excel File
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, title + '.xlsx');
    })

  }

}
