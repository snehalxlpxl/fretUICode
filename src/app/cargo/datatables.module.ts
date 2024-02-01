import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CsvModule } from '@ctrl/ngx-csv';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { OiCargolistComponent } from './oi-cargolist/oi-cargolist.component';
import { ArkasComponent } from 'app/arkas/arkas.component';

// import { DatatablesService } from 'app/tables/datatables/datatables.service';

const routes: Routes = [
  {
    path: 'oi-cargolist',
    component: OiCargolistComponent,
    resolve: {
      // datatables: DatatablesService
    },
    data: { animation: 'oi-cargolist' }
  },
  {
    path: 'arkas',
    component: ArkasComponent,
    resolve: {
      // datatables: DatatablesService
    },
    data: { animation: 'arkas' }
  }
];

@NgModule({
  declarations: [OiCargolistComponent,ArkasComponent],
  imports: [
    RouterModule.forChild(routes),
    NgbModule,
    TranslateModule,
    CoreCommonModule,
    ContentHeaderModule,
    CardSnippetModule,
    NgxDatatableModule,
    CsvModule
  ],
  providers: []
})
export class DatatablesModule {}
