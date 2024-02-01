

import { Component, OnDestroy, OnInit, HostBinding, HostListener, ViewEncapsulation } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { AuthenticationService } from 'app/auth/service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { CoreConfigService } from '@core/services/config.service';
import { CoreMediaService } from '@core/services/media.service';

import { User } from 'app/auth/models';

import { coreConfig } from 'app/app-config';
import { NavigationEnd, Router, RouterLink, Routes } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
// import { Company } from 'app/model/company';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,Subscription, interval  } from 'rxjs';
// import { AppointmentsComponent } from 'app/appointments/appointments.component';
import { RouterModule } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Company } from 'app/services/company';
import { AppointmentsComponent } from 'app/Sales/appointments/appointments.component';

// @Injectable()

const routes:Routes=[
  // {path:"navbar", component:NavbarComponent},

  {path:"appointments", component:AppointmentsComponent},
]
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

@Injectable()

export class NavbarComponent implements OnInit, OnDestroy {
  formatdate = 'dd/MM/yyyy'; 
  myDate=new Date();

  today:Date;

  // private updateSubscription: Subscription;
private subscription: Subscription= new Subscription();

data: any;
interval: any;

//public isonSubmitService: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);



  CompanyForm: FormGroup;

  public horizontalMenu: boolean;
  public hiddenMenu: boolean;

  public coreConfig: any;
  public currentSkin: string;
  public prevSkin: string;

  public currentUser: User;

  public languageOptions: any;
  public navigation: any;
  public selectedLanguage: any;
  tempData= [];
  rows: any;
  public kitchenSinkRows: any;

  selectElementText: "Select Company";
  custObj: Company = new Company();
  @HostBinding('class.fixed-top')
  public isFixed = false;

  @HostBinding('class.navbar-static-style-on-scroll')
  public windowScrolled = false;
  myService: any;
 
 

  // Add .navbar-static-style-on-scroll on scroll using HostListener & HostBinding
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) &&
      this.coreConfig.layout.navbar.type == 'navbar-static-top' &&
      this.coreConfig.layout.type == 'horizontal'
    ) {
      this.windowScrolled = true;
    } else if (
      (this.windowScrolled && window.pageYOffset) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < 10
    ) {
      this.windowScrolled = false;
    }
  }

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {Router} _router
   * @param {AuthenticationService} _authenticationService
   * @param {CoreConfigService} _coreConfigService
   * @param {CoreSidebarService} _coreSidebarService
   * @param {CoreMediaService} _coreMediaService
   * @param {MediaObserver} _mediaObserver
   * @param {TranslateService} _translateService
   */
  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService,
    private _coreConfigService: CoreConfigService,
    private _coreMediaService: CoreMediaService,
    private _coreSidebarService: CoreSidebarService,
    private _mediaObserver: MediaObserver,
    public _translateService: TranslateService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    public datepipe:DatePipe,
    private httpclient: HttpClient
    

    
  ) {
    {

      this.CompanyForm = this.fb.group({
        companyId: 0,
       companyName: ['', Validators.required],
        displayName: [''],
        companyTypeId: ['', Validators.required],
        companyTypeName: ['', Validators.required],
        parentCompanyId: ['', Validators.required],
        parentCompanyName:[''],
        gstNumber:[''],
        gstType:[''],
        placeOfSupply: [''],
        website: [''],
        dateCreated: ['']
      });
    }
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));

    this.languageOptions = {
      en: {
        title: 'English',
        flag: 'us'
      },
      fr: {
        title: 'French',
        flag: 'fr'
      },
      de: {
        title: 'German',
        flag: 'de'
      },
      pt: {
        title: 'Portuguese',
        flag: 'pt'
      }
    };

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }


  private _refreshNeeded=new Subject<void>();
  
  get refreshNeeded$(){
    return this._refreshNeeded;
  }

  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  modalOpen(modalBasic) {
    this.modalService.open(modalBasic);
  }

  modalOpenForm(modalForm) {
    size:'lg'
    // this.modalService.open(modalForm);
    this.CompanyForm = this.fb.group({
      companyId: 0,
     companyName: ['', Validators.required],
      displayName: ['', Validators.required],
      companyTypeId: ['', Validators.required],
      companyTypeName: ['', Validators.required],
      parentCompanyId: ['', Validators.required],
      parentCompanyName:['', Validators.required],
      gstNumber:['', Validators.required],
      gstType:['', Validators.required],
      placeOfSupply: ['', Validators.required],
      website: ['', Validators.required],
      dateCreated: ['']
    });
   
    this.openModal(modalForm)

  }

  openModal(targetModal) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
  }

  populateForm(rowData, modalForm) {
    size: 'lg'
    console.log('get all');
    console.log(rowData);

    this.modalService.open(modalForm, {windowClass: 'modalForm', size:'lg'});

    if (rowData.companyTypeName != null) {
      this.selectElementText = rowData.companyTypeName;
      console.log(this.selectElementText);
    }

    console.log('rowData.CompanyId');

    console.log(rowData.companyId);

    this.CompanyForm.patchValue({
      
      companyId:rowData.companyId,
      companyName: rowData.companyName,
      displayName:rowData.displayName,
      companyTypeId: rowData.companyTypeId,
      companyTypeName: rowData.companyTypeName,
      parentCompanyId: rowData.parentCompanyId,
      parentCompanyName: rowData.parentCompanyName,
      gstNumber: rowData.gstNumber,
      gstType: rowData.gstType,
      placeOfSupply: rowData.placeOfSupply,
      website: rowData.website,
     dateCreated: rowData.dateCreated,
      createdBy: rowData.createdBy
    });

    console.log('this.CompanyForm.value PATCH VALUE');
    console.log(this.CompanyForm.value);
    

  }
  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle sidebar open
   *
   * @param key
   */
  toggleSidebar(key): void {
    this._coreSidebarService.getSidebarRegistry(key).toggleOpen();
  }

  /**
   * Set the language
   *
   * @param language
   */
  setLanguage(language): void {
    // Set the selected language for the navbar on change
    this.selectedLanguage = language;

    // Use the selected language id for translations
    this._translateService.use(language);

    this._coreConfigService.setConfig({ app: { appLanguage: language } }, { emitEvent: true });
  }

  /**
   * Toggle Dark Skin
   */
  toggleDarkSkin() {
    // Get the current skin
    this._coreConfigService
      .getConfig()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(config => {
        this.currentSkin = config.layout.skin;
      });

    // Toggle Dark skin with prevSkin skin
    this.prevSkin = localStorage.getItem('prevSkin');

    if (this.currentSkin === 'dark') {
      this._coreConfigService.setConfig(
        { layout: { skin: this.prevSkin ? this.prevSkin : 'default' } },
        { emitEvent: true }
      );
    } else {
      localStorage.setItem('prevSkin', this.currentSkin);
      this._coreConfigService.setConfig({ layout: { skin: 'dark' } }, { emitEvent: true });
    }
  }

  /**
   * Logout method
   */
  logout() {
    this._authenticationService.logout();
    this._router.navigate(['/pages/authentication/login-v2']);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.today =new Date();
    // console.log(new Date().toISOString());

  //   this._router.navigateByUrl('/RefrshComponent', { skipLocationChange: true }).then(() => {
  //     this._router.navigate(['this.router.navigate(["/appointments"])']);
  // }); 


    // this.refreshData();
    // this.interval = setInterval(() => { 
    //     this.refreshData(); 
    // }, 5000);

    // this.updateSubscription = interval(3000).subscribe(
    //   (val) => { this.add()});

   // this.getDataTableRows();
    // get the currentUser details from localStorage
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Subscribe to the config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
      this.horizontalMenu = config.layout.type === 'horizontal';
      this.hiddenMenu = config.layout.menu.hidden === true;
      this.currentSkin = config.layout.skin;

      // Fix: for vertical layout if default navbar fixed-top than set isFixed = true
      if (this.coreConfig.layout.type === 'vertical') {
        setTimeout(() => {
          if (this.coreConfig.layout.navbar.type === 'fixed-top') {
            this.isFixed = true;
          }
        }, 0);
      }
    });

    // Horizontal Layout Only: Add class fixed-top to navbar below large screen
    if (this.coreConfig.layout.type == 'horizontal') {
      // On every media(screen) change
      this._coreMediaService.onMediaUpdate.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
        const isFixedTop = this._mediaObserver.isActive('bs-gt-xl');
        if (isFixedTop) {
          this.isFixed = false;
        } else {
          this.isFixed = true;
        }
      });
    }

    // Set the selected language from default languageOptions
    this.selectedLanguage = _.find(this.languageOptions, {
      id: this._translateService.currentLang
    });
  }



  add(form: FormGroup)
  {
    console.log(form.value.companyId);
    this.custObj =
    {
      "companyId":0,
      "companyName": form.value.companyName,
      "displayName": form.value.displayName,
      "companyTypeId": form.value.companyTypeId,
      "companyTypeName": form.value.companyTypeName,
      "parentCompanyId": form.value.parentCompanyId,
      "parentCompanyName":form.value.parentCompanyName,
      "gstNumber": form.value.gstNumber,
      "gstType": form.value.gstType,
      "placeOfSupply": form.value.placeOfSupply,
      "website": form.value.website,
    // "dateCreated":"2023-03-08T05:04:38.000Z",
      "dateCreated":new Date().toISOString(),
      "createdBy": 1
    }
  
  
    console.log('this.custObj');
    console.log(this.custObj);
    console.log(JSON.stringify(this.custObj));
  
    //  console.log(myobj);
  
    this.httpclient.post('http://localhost:5289/api/Company', JSON.stringify(this.custObj), this.headers).subscribe(res => {
      console.log('Success');
      console.log(res);
      this.resetForm(form);
  //  this.getDataTableRows();
  
    }, err =>{
      console.log('Error');
      console.log(err);
  
    });
    
    this.resetForm;
    this.modalService.dismissAll();
  }
  
  onSubmitService(form: FormGroup) {

    // this.success();
    console.log( this.CompanyForm.value);

    this.custObj=this.CompanyForm.value;

    console.log('this.custObj');
    console.log( this.custObj);

        
    console.log("this.custObj.companyId");
    console.log(this.custObj.companyId);

    if(this.custObj.companyId==0){
      console.log("INSERT");
      this.add(this.CompanyForm);
    this.success();
      this.changeLocation;
    console.log(this.custObj.companyId);
    // this.CompanyForm.reset();
    // this.resetForm;
    // this.clear();
   
    }
    // else
  
    // {
    // //  this.CompanyForm.reset();
    //   console.log("UPDATE");
    //  this.updateComapny(this.CompanyForm)
    //   this.success();

    //   console.log(this.custObj.companyId);
    // }
   
  
    this.modalService.dismissAll();
    // this.changeLocation;

}


success(){
  Swal.fire(
    'Save',
    'Saved Successfully',
    'success'
  )
}



changeLocation(locationData) {

  // save current route first
  const currentRoute = this._router.url;

  this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate([currentRoute]); // navigate to same route
  }); 
}

resetForm(form: FormGroup) {

  form.reset();

}



  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();


    // this.subscription.unsubscribe();
    // clearInterval(this.interval);
  }


 

// refreshData(){
//   this.subscription.add(
//     this.myService.getData()
//         .subscribe(data => {
//             this.data = data;
//         })
// );

// doAction(){
//   this.subscription.add(
//     this.myService.doAction()
//         .subscribe(result => {
//             if(result === true){
//                 this.refreshData();
//             }
//           }));
        
// }
  
}

// getDataTableRows(): Promise<any[]> {
//   return new Promise((resolve, reject) => {

//     this.httpclient.get(`http://localhost:5289/api/Company/CompanyList`).subscribe((response: any) => {
//       console.log('get all comapnies');
//       this.rows = response;
//       this.tempData = this.rows;
//       this.kitchenSinkRows = this.rows;
//       resolve(this.rows);
//     }, reject);
//   });
// }


