import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { SelectComponent } from 'app/select/select.component';
import { OiCargolistComponent } from 'app/cargo/oi-cargolist/oi-cargolist.component';

const routes: Routes = [
  {
    path: './select',
    component: SelectComponent,
    data: { animation: 'select' }
  },
  // {
  //   path: 'oi-cargolist',
  //   component: OiCargolistComponent,
  //   data: { animation: 'oi-cargolist' }
  // }
];

@NgModule({
  declarations: [SelectComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    NgbModule,
    ContentHeaderModule,
    CardSnippetModule,
    FormsModule,
    NgSelectModule
  ]
})
export class SelectModule {}
