import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { SampleComponent } from './sample.component';
import { HomeComponent } from './home.component';
import { OeCargolistComponent } from 'app/cargo/oe-cargolist/oe-cargolist.component';
import { OiCargolistComponent } from 'app/cargo/oi-cargolist/oi-cargolist.component';
import { AeCargolistComponent } from 'app/cargo/ae-cargolist/ae-cargolist.component';
import { AiCargolistComponent } from 'app/cargo/ai-cargolist/ai-cargolist.component';
import { ArkasComponent } from 'app/arkas/arkas.component';
import { SelectComponent } from 'app/select/select.component';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { CalendarComponent } from 'app/calendar/calendar.component';
import { SalesQuotesComponent } from 'app/Sales/sales-quotes/sales-quotes.component';
import { AppointmentsComponent } from 'app/Sales/appointments/appointments.component';
import { LeadsComponent } from 'app/Sales/leads/leads.component';
// import { CustomerComponent } from 'app/Companies/customer/customer.component';
// import { CompanylistComponent } from 'app/Companies/companylist/companylist.component';
// import { OceanExportComponent } from 'app/Ocean/ocean-export/ocean-export.component';
// import { OceanImportComponent } from 'app/Ocean/ocean-import/ocean-import.component';
import { PricingComponent } from 'app/pricing/pricing.component';
import { AirExportComponent } from 'app/Air/air-export/air-export.component';
import { AirImportComponent } from 'app/Air/air-import/air-import.component';
import { ExchangeRatesComponent } from 'app/Accounts/exchange-rates/exchange-rates.component';
import { InvoicesComponent } from 'app/Accounts/invoices/invoices.component';
import { MySalesQuoteComponent } from 'app/Sales/my-sales-quote/my-sales-quote.component';
import { SalesQuoteFormComponent } from 'app/sales-quote-form/sales-quote-form.component';
import { PricingSalesQuotesListComponent } from 'app/pricing-sales-quotes-list/pricing-sales-quotes-list.component';
import { SaleQuoteDetailsListComponent } from 'app/sale-quote-details-list/sale-quote-details-list.component';
import { MasterComponent } from 'app/Masters/master/master.component';
import { OceanLineMasterComponent } from 'app/Masters/master/OceanLineMater/ocean-line-master/ocean-line-master.component';
import { AlltypemasterComponent } from 'app/Masters/master/AllTypeMasters/alltypemaster.component';
import { AirlinemasterComponent } from 'app/Masters/master/AirLineMaster/airlinemaster.component';
import { CompanylistComponent } from 'app/companies/companylist/companylist.component';
import { CustomerComponent } from 'app/companies/customer/customer.component';
import { OceanExportComponent } from 'app/Ocean/ocean-export/ocean-export.component';
import { OceanImportComponent } from 'app/Ocean/ocean-import/ocean-import.component';
import { CompanyComponent } from 'app/companies/company/company.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { OidetailsComponent } from 'app/Ocean/ocean-import/oidetails/oidetails.component';
import { OedetailsComponent } from 'app/Ocean/ocean-export/oedetails/oedetails.component';
// import { OidetailsComponent } from 'app/Ocean/ocean-import/oidetails/oidetails.component';
// import { DatatablesComponent } from 'app/tables/datatables/datatables.component';

const routes = [
  {
    path: 'sample',
    component: SampleComponent,
    data: { animation: 'sample' }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { animation: 'home' }
  },
  // {
  //   path: 'oe-cargolist',
  //   component: OeCargolistComponent,
  //   data: { animation: 'oe-cargolist' }
  // },
  // {
  //   path: 'oi-cargolist',
  //   component: OiCargolistComponent,
  //   data: { animation: 'oi-cargolist' }
  // },
  // {
  //   path: 'ae-cargolist',
  //   component: AeCargolistComponent,
  //   data: { animation: 'ae-cargolist' }
  // },
  // {
  //   path: 'ai-cargolist',
  //   component: AiCargolistComponent,
  //   data: { animation: 'ai-cargolist' }
  // },
  // {
  //   path: 'datatables',
  //   component: DatatablesComponent,
  //   data: { animation: 'datatables' }
  // },
//   {
//     path: 'arkas',
//     component: ArkasComponent,
//     data: { animation: 'arkas' }
//   },
//   {
//     path: 'select',
//     component: SelectComponent,
//     data: { animation: 'select' }
//   },
{
  path: 'dashboard',
  component: DashboardComponent,
  data: { animation: 'dashboard' }
},
{
  path: 'calendar',
  component: CalendarComponent,
  data: { animation: 'calender' }
},

{
  path: 'companylist',
  component: CompanylistComponent,
  data: { animation: 'companylist' }
},
{
  path: 'company/:id',
  component : CompanyComponent,
  data: { animation: 'company' }
},
{
  path: 'company',
  component : CompanyComponent,
  data: { animation: 'company' }
},
{
  path: 'customer',
  component : CustomerComponent,
  data: { animation: 'customer' }
},
{
  path: 'appointments',
  component: AppointmentsComponent,
  data: { animation: 'appointments' }
},
// {
//   path: 'leads',
//   component: LeadsComponent,
//   data: { animation: 'leads' }
// },
{
  path: 'my-sales-quote',
  component: MySalesQuoteComponent,
  data: { animation: 'my-sales-quote' }
},
{
  path: 'sales-quotes',
  component: SalesQuotesComponent,
  data: { animation: 'sales-quotes' }
},
{
  path: 'ocean-export',
  component: OceanExportComponent,
  data: { animation: 'ocean-export' }
},

{
  path: 'ocean-import',
  component: OceanImportComponent,
  data: { animation: 'ocean-import' }
},
{
  path: 'pricing',
  component : PricingComponent,
  data: { animation: 'pricing' }
},
{
  path: 'air-export',
  component: AirExportComponent,
  data: { animation: 'air-export' }
},
{
  path: 'air-import',
  component: AirImportComponent,
  data: { animation: 'air-import' }
},

{
  path: 'invoices',
  component: InvoicesComponent,
  data: { animation: 'invoices' }
},
{
  path: 'exchange-rates',
  component : ExchangeRatesComponent,
  data: { animation: 'exchange-rates' }
},
{
  path: 'sales-quotes-form',
  component : SalesQuoteFormComponent,
  data: { animation: 'sales-quotes-form' }
},
{
  path: 'sales-quotes-list',
  component : PricingSalesQuotesListComponent,
  data: { animation: 'sales-quotes-list' }
},
{
  path: 'sales-quotes-form/:id',
  component : SalesQuoteFormComponent,
  data: { animation: 'sales-quotes-form' }
},
{
  path: 'app-sale-quote-details-list',
  component : SaleQuoteDetailsListComponent,
  data: { animation: 'app-sale-quote-details-list' }
},
{
  path: 'master',
  component : MasterComponent,
  data: { animation: 'master' }
},
{
  path: 'oceanMaster',
  component : OceanLineMasterComponent,
  data: { animation: 'oceanMaster' }
},
{
  path: 'airMaster',
  component : AirlinemasterComponent,
  data: { animation: 'airMaster' }
},
{
  path: 'alltypeMaster',
  component : AlltypemasterComponent,
  data: { animation: 'alltypeMaster' }
},
{
  path: 'oidetails',
  component : OidetailsComponent,
  data: { animation: 'alltypeMaster' }
},
{
  path: 'oidetails/:id',
  component : OidetailsComponent,
  data: { animation: 'oidetails' }
},
{
  path: 'oedetails',
  component : OedetailsComponent,
  data: { animation: 'alltypeMaster' }
},
{
  path: 'oedetails/:id',
  component : OedetailsComponent,
  data: { animation: 'oedetails' }
},
];

@NgModule({
  declarations: [SampleComponent, HomeComponent],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule],
  exports: [SampleComponent, HomeComponent]
})
export class SampleModule {}
