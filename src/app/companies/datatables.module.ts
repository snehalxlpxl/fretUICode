import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CsvModule } from '@ctrl/ngx-csv';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

// import { SalesQuoteListComponent } from 'app/companies/sales-quote-list/sales-quote-list.component';
// import { OcenexportComponent } from 'app/companies/oceanexport/ocenexport.component';
//  import { AirexportComponent } from './airexport/airexport.component';
// import { DemoCompListComponent } from './demo-comp-list/demo-comp-list.component';

// import { DatatablesService } from 'app/tables/datatables/datatables.service';
import { CompanylistComponent } from './companylist/companylist.component';
const routes: Routes = [
  {
    path: 'companylist',
    component: CompanylistComponent,
    resolve: {
      // datatables: DatatablesService
    },
    data: { animation: 'companylist' }
  },

  // {
  //   path: 'sales-quote-list',
  //   component: SalesQuoteListComponent,
  //   resolve: {
  //     // datatables: DatatablesService
  //   },
  //   data: { animation: 'sales-quote-list' }
  // },

  // {
  //   path: 'oceanexport',
  //   component: OcenexportComponent,
  //   resolve: {
  //     // datatables: DatatablesService
  //   },
  //   data: { animation: 'oceanexport' }
  // },
  // {
  //   path: 'airexport',
  //   component: AirexportComponent,
  //   resolve: {
  //     // datatables: DatatablesService
  //   },
  //   data: { animation: 'airexport' }
  // }

];

@NgModule({
  declarations: [
    // CompanylistComponent,
    // SalesQuoteListComponent,
    // AirexportComponent,DemoCompListComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    NgbModule,
    TranslateModule,
    CoreCommonModule,
    ContentHeaderModule,
    CardSnippetModule,
    NgxDatatableModule,
    CsvModule,
   
  ],
  providers: []
})
export class DatatablesModule {}


