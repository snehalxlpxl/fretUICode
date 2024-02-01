import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from 'app/auth/helpers/auth.guards';
import{SpinnerIntercepter} from './httpIntercepter/spinner-intercepter';

import 'hammerjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr'; // For auth after login toast
import { FlatpickrModule } from 'angularx-flatpickr';

import { CoreModule } from '@core/core.module';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule, CoreThemeCustomizerModule } from '@core/components';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
 
import { coreConfig } from 'app/app-config';
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { OeCargolistComponent } from './cargo/oe-cargolist/oe-cargolist.component';
import { AiCargolistComponent } from './cargo/ai-cargolist/ai-cargolist.component';
import { AeCargolistComponent } from './cargo/ae-cargolist/ae-cargolist.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ContentHeaderModule } from "./layout/components/content-header/content-header.module";
import { AppConfigService } from './services/app-config.service';
import { CardSnippetModule } from "../@core/components/card-snippet/card-snippet.module";
import { CargoDetailsComponent } from './cargo/cargo-details/cargo-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AppointmentsComponent } from './Sales/appointments/appointments.component';
import { LeadsComponent } from './Sales/leads/leads.component';
import { SalesQuotesComponent } from './Sales/sales-quotes/sales-quotes.component';
// import { CustomerComponent } from './Companies/customer/customer.component';
// import { CompanylistComponent } from './Companies/companylist/companylist.component';
// import { OceanExportComponent } from './Ocean/ocean-export/ocean-export.component';
import { OceanImportComponent } from './Ocean/ocean-import/ocean-import.component';
import { PricingComponent } from './pricing/pricing.component';
import { AirExportComponent } from './Air/air-export/air-export.component';
import { AirImportComponent } from './Air/air-import/air-import.component';
import { InvoicesComponent } from './Accounts/invoices/invoices.component';
import { BillsComponent } from './Accounts/bills/bills.component';
import { ExchangeRatesComponent } from './Accounts/exchange-rates/exchange-rates.component';
import { DatePipe } from '@angular/common';
import { MySalesQuoteComponent } from './Sales/my-sales-quote/my-sales-quote.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MySalesQuoteListItemComponent } from './Sales/my-sales-quote-list-item/my-sales-quote-list-item.component';
import { PricingSalesQuotesListComponent } from './pricing-sales-quotes-list/pricing-sales-quotes-list.component';
import { SalesQuoteFormComponent } from './sales-quote-form/sales-quote-form.component';
import { SaleQuoteDetailsListComponent } from './sale-quote-details-list/sale-quote-details-list.component';
import { SalesDetailModalFormComponent } from './services/sales-detail-modal-form/sales-detail-modal-form.component';
import { SalesDetailModalfromComponent } from './sales-detail-modalfrom/sales-detail-modalfrom.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { ProgressBarModule } from "@progress/kendo-angular-progressbar";
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { NgSelectModule } from '@ng-select/ng-select';

// for HttpClient import:
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { SalesQuoteChargesModalComponent } from './Sales/sales-quote-charges-modal/sales-quote-charges-modal.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { MasterComponent } from './Masters/master/master.component';
import { OceanLineMasterComponent } from './Masters/master/OceanLineMater/ocean-line-master/ocean-line-master.component';
import { OceanLineModalComponent } from './Masters/master/OceanLineMater/oceanLineModal/ocean-line-modal/ocean-line-modal.component';
import { AirlinemasterComponent } from './Masters/master/AirLineMaster/airlinemaster.component';
import { AlltypemasterComponent } from './Masters/master/AllTypeMasters/alltypemaster.component';
import { OceanExportComponent } from './Ocean/ocean-export/ocean-export.component';
import { CompanylistComponent } from './companies/companylist/companylist.component';
import { CustomerComponent } from './companies/customer/customer.component';
import { CompanyComponent } from './companies/company/company.component';
import { AddressComponent } from './companies/address/address.component';
import { ContactsComponent } from './companies/contacts/contacts.component';
import { ShipmentsComponent } from './companies/shipments/shipments.component';
import { OidetailsComponent } from './Ocean/ocean-import/oidetails/oidetails.component';
import { OedetailsComponent } from './Ocean/ocean-export/oedetails/oedetails.component';
import { ContainerComponent } from './Ocean/ocean-export/oedetails/container/container.component';
import { PackagesComponent } from './Ocean/ocean-export/oedetails/packages/packages.component';
import { ShipmentRoutingComponent } from './Ocean/ocean-export/oedetails/shipment-routing/shipment-routing.component';
import { DocumentsComponent } from './Ocean/ocean-export/oedetails/documents/documents.component';
import { InvoiceComponent } from './Ocean/ocean-export/oedetails/invoice/invoice.component';
import { BillComponent } from './Ocean/ocean-export/oedetails/bill/bill.component';
import { HistoryComponent } from './Ocean/ocean-export/oedetails/history/history.component';
import { CostSheetComponent } from './Ocean/ocean-export/oedetails/cost-sheet/cost-sheet.component';
// import { AirlinemasterComponent } from './Masters/master/AirLineMaster/airlinemaster/airlinemaster/airlinemaster.component';
// import { AlltypemasterComponent } from './Masters/master/AirLineMaster/airlinemaster/airlinemaster/alltypemaster/alltypemaster.component';
// import { SaleQuoteDetailsListComponentComponent } from './Sales/sales-quotes/sale-quote-details-list-component/sale-quote-details-list-component.component';
// import { Ng2CompleterModule } from "ng2-completer";



const appRoutes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'forms',
    loadChildren: () => import('./common-module/forms.module').then(m => m.FormsModule),
    canActivate: [AuthGuard]
  },
  { path: 'cargo-details', component: CargoDetailsComponent },
  // {
  //   path: 'tables',
  //   loadChildren: () => import('./cargo/tables.module').then(m => m.TablesModule),
  //   canActivate: [AuthGuard]
  // },
  {
    path: '**',
    redirectTo: '/pages/miscellaneous/error' //Error 404 - Page not found
  }
];

@NgModule({
    declarations: [AppComponent,OeCargolistComponent, AiCargolistComponent, AeCargolistComponent, CargoDetailsComponent, DashboardComponent, CalendarComponent, AppointmentsComponent, LeadsComponent, SalesQuotesComponent, CustomerComponent, 
      CompanylistComponent, OceanExportComponent, OceanImportComponent, PricingComponent, AirExportComponent, AirImportComponent, InvoicesComponent, BillsComponent, ExchangeRatesComponent, MySalesQuoteComponent, MySalesQuoteListItemComponent, PricingSalesQuotesListComponent,
       SalesQuoteFormComponent, SaleQuoteDetailsListComponent, SalesDetailModalFormComponent, SalesDetailModalfromComponent, SalesQuoteChargesModalComponent, SpinnerComponent, MasterComponent, OceanLineMasterComponent, OceanLineModalComponent, AirlinemasterComponent,
        AlltypemasterComponent,CompanyComponent,AddressComponent,ContactsComponent,ShipmentsComponent,OidetailsComponent,OedetailsComponent,ContainerComponent,PackagesComponent,ShipmentRoutingComponent,DocumentsComponent,InvoiceComponent,BillComponent,
        HistoryComponent,CostSheetComponent],
    bootstrap: [AppComponent],
    providers: [DatePipe,
      {
        provide:HTTP_INTERCEPTORS,
        useClass:SpinnerIntercepter,
        multi:true
      }
      ,
      
      {
            provide: APP_INITIALIZER,
            multi: true,
            deps: [AppConfigService],
            useFactory: (appConfigService: AppConfigService) => {
                return () => {
                    //Make sure to return a promise!
                    return appConfigService.loadAppConfig();
                };
            }
        }],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        OwlDateTimeModule, 
        OwlNativeDateTimeModule,
        RouterModule.forRoot(appRoutes, {
            scrollPositionRestoration: 'enabled',
            relativeLinkResolution: 'legacy'
        }),
        TranslateModule.forRoot(),
        NgxDatatableModule,
        NgSelectModule,
        //NgBootstrap
        NgbModule,
        ToastrModule.forRoot(),
        // Core modules
        CoreModule.forRoot(coreConfig),
        CoreCommonModule,
        CoreSidebarModule,
        CoreThemeCustomizerModule,
        // App modules
        LayoutModule,
        SampleModule,
        ContentHeaderModule,
        CardSnippetModule,
        NgApexchartsModule,
        ProgressBarModule,
        ReactiveFormsModule,
        Ng2FlatpickrModule,
    // for HttpClient use:
    LoadingBarHttpClientModule,
    
    ]
})
export class AppModule {}

export class Company{
  id:number =0;
  companyName : string ='';
  companyTypeId : string ='';
  sales : string = '';
  email : string = '';
  website:string='';
  companyApprovalStatus:string='';
}