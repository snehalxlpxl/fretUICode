import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Observable, of } from 'rxjs';

import { Person, DataService, UserMaster } from 'app/select/data.service';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Users } from 'app/services/user.model';
import { ExportExcelService } from 'app/services/export-excel.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectComponent implements OnInit {
  // public
  public contentHeader: object;
  contentparam:string;
  parameterValue:string;

  li:any;
  lis=[];

  defaultBindingsList = [
    { value: 1, label: 'Vilnius' },
    { value: 2, label: 'Kaunas' },
    { value: 3, label: 'Pavilnys', disabled: true }
];

title = 'angular-export-to-excel';

dataForExcel = [];

rows:any=[];

empPerformance = [
  { ID: 10011, NAME: "A", DEPARTMENT: "Sales", MONTH: "Jan", YEAR: 2020, SALES: 132412, CHANGE: 12, LEADS: 35 },
  { ID: 10012, NAME: "A", DEPARTMENT: "Sales", MONTH: "Feb", YEAR: 2020, SALES: 232324, CHANGE: 2, LEADS: 443 },
  { ID: 10013, NAME: "A", DEPARTMENT: "Sales", MONTH: "Mar", YEAR: 2020, SALES: 542234, CHANGE: 45, LEADS: 345 },
  { ID: 10014, NAME: "A", DEPARTMENT: "Sales", MONTH: "Apr", YEAR: 2020, SALES: 223335, CHANGE: 32, LEADS: 234 },
  { ID: 10015, NAME: "A", DEPARTMENT: "Sales", MONTH: "May", YEAR: 2020, SALES: 455535, CHANGE: 21, LEADS: 12 },
];

selectedCity = null;



  // select basic
  // public selectBasic: Person[] = [];
  public selectBasic: UserMaster[] = [];
  public selectBasicLoading = false;
  public selected:any;
  dataList: UserMaster[];
  // select group
  public selectGroupselected = 'Adam';
  public selectGroup = [
    {
      name: 'Adam',
      country: 'United States'
    },
    {
      name: 'Homer',
      country: ''
    },
    {
      name: 'Samantha',
      country: 'United States'
    },
    {
      name: 'Amalie',
      country: 'Argentina'
    },
    {
      name: 'Estefanía',
      country: 'Argentina'
    },
    {
      name: 'Adrian',
      country: 'Ecuador'
    },
    {
      name: 'Wladimir',
      country: 'Ecuador'
    },
    {
      name: 'Natasha',
      country: 'Ecuador'
    },
    {
      name: 'Nicole',
      country: 'Colombia'
    },
    {
      name: 'Michael',
      country: 'Colombia'
    },
    {
      name: 'Nicolás',
      country: 'Colombia'
    }
  ];

  // select icon
  public selectIcon = [
    {
      id: 1,
      name: 'Chrome',
      icon: 'fa fa-chrome'
    },
    {
      id: 2,
      name: 'Firefox',
      icon: 'fa fa-firefox'
    },
    {
      id: 3,
      name: 'Safari',
      icon: 'fa fa-safari'
    },
    {
      id: 4,
      name: 'Opera',
      icon: 'fa fa-opera'
    }
  ];
  public selectIconSelected = this.selectIcon[0].name;

  // select custom option
  public selectCustomSelected = this.selectIcon[0].name;

  // select tag
  public SelectTag;

  // Select Custom Tag
  public customTagselected;
  public customTag: any[] = [];
  public customTagNames = ['Uber', 'Microsoft', 'Flexigen'];

  // select Basic Multi
  public selectMulti: Observable<any[]>;
  public selectMultiSelected = [{ name: 'Karyn Wright' }];

  // Select Multi with group
  public selectMultiGroupSelected = [{ name: 'Karyn Wright' }];

  // Select Multi with Icon
  public multiIconGithubUsers: Observable<any[]>;
  public multiIconGithubUsersSelected = ['anjmao'];

  // Select Multi Custom
  public multiCustomGithubUsersSelected = ['anjmao'];

  // select with limited number of selections
  public selectMultiLimitedSelected = [{ name: 'Karyn Wright' }];

  // Select Custom header footer template
  public selectCustomHeaderFooter = [];
  public selectCustomHeaderFooterSelected = [];

  // select size
  public SelectSizeLargeSelected = 'Adam';
  public SelectSizeDefaultSelected = 'Adam';
  public SelectSizeSmallSelected = 'Adam';

  // multiple sizes
  public MultiLarge: Observable<any[]>;
  public MultiLargeSelected = [{ name: 'Karyn Wright' }];

  public MultiDefault: Observable<any[]>;
  public MultiDefaultSelected = [{ name: 'Karyn Wright' }];

  public MultiSmall: Observable<any[]>;
  public MultiSmallSelected = [{ name: 'Karyn Wright' }];

  /**
   * Constructor
   *
   * @param {DataService} dataService
   * @param {NgbModal} modalService
   */
  constructor(private dataService: DataService, private modalService: NgbModal,private httpclient:HttpClient, public ete: ExportExcelService,private route: ActivatedRoute) {}

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  exportToExcel() {

    this.httpclient.get(`http://localhost:5094/api/AllCargoList/GetCargotop`).subscribe(res=>{
      console.log('get all cargolist');
    //  console.log(res)
      this.rows=res;
      // console.log(this.rows);
  this.rows.forEach((row: any) => {
      this.dataForExcel.push(Object.values(row))
    })

     let reportData = {
      title: 'CargoList - JOB msi21004 RANGE',
      data: this.dataForExcel,
      headers: Object.keys(this.rows[0])
    }

    this.ete.exportExcel(reportData);
    
    }, err => {
      console.log("error while fetching data");
  
    });
    
  }




  // select basic
  private selectBasicMethod() {
    this.selectBasicLoading = true;
    // this.getUserNames().forEach(x=>{
    //   console.log(x.values);
    // });
    // this.getUserNames().subscribe(x => {
    //   this.selectBasic = x;
    //   this.selectBasicLoading = false;
    // });
    this.dataService.getPeople().subscribe(x => {
      this.selectBasic = x;
      this.selectBasicLoading = false;
    });
  }

  // select multi limited selections
  multiLimitedClearModel() {
    this.selectMultiLimitedSelected = [];
  }

  /**
   * Select Custom Tag
   *
   * @param name
   */
  selectAddTagMethod(name) {
    return { name: name, tag: true };
  }

  customHeaderFooterSelectAll() {
    this.selectCustomHeaderFooterSelected = this.selectCustomHeaderFooter.map(x => x.name);
  }

  customHeaderFooterUnselectAll() {
    this.selectCustomHeaderFooterSelected = [];
  }

  // ng-select in model
  modalSelectOpen(modalSelect) {
    this.modalService.open(modalSelect, {
      windowClass: 'modal'
    });
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {

    // this.route.queryParams.subscribe(
    //   (params: Params) => {
    //     // this.parameterValue = +params["reportname"].toString();
    //     console.log(params['reportname']);
    //     // console.log(this.contentparam);
    //   }
    // );

   

    this.route.queryParams.subscribe(params => {
      console.log('params');
      console.log(params['reportname']);
      this.contentparam = params['reportname'];
  
    });

    this.selectedCity = this.defaultBindingsList[0];
    //this.getData();
    this.selectBasicMethod();

  // this.getPeople();

    // this.selectMulti = this.dataService.getPeople();

    // this.customTagNames.forEach((c, i) => {
    //   this.customTag.push({ id: i, name: c });
    // });

    // this.multiIconGithubUsers = this.dataService.getGithubAccounts('anjm');

    // this.dataService.getPeople().subscribe(items => {
    //   this.selectCustomHeaderFooter = items;
    // });

    // // multiple sizes
    // this.MultiLarge = this.dataService.getPeople();
    // this.MultiDefault = this.dataService.getPeople();
    // this.MultiSmall = this.dataService.getPeople();

    // content header
    this.contentHeader = {
      headerTitle: 'Select',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Form Elements',
            isLink: true,
            link: '/'
          },
          {
            name: 'Select',
            isLink: false
          }
        ]
      }
    };
  }






getUserNames(term: string = null): Observable<UserMaster[]> {
  let items = this.getUsers();
  console.log(items);
  if (term) {
    items = items.filter(x => x.UserDisplayName.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
  }
  return of(items).pipe(delay(50));
}

getUsers(){

 //return this.httpclient.get<any[]>(`http://localhost:5094/api/User`);

  this.li =this.httpclient.get<UserMaster[]>(`http://localhost:5094/api/User`);
  this.lis=this.li;
  console.log(this.lis);
  return this.lis;
}

getData(){
 return
 this.httpclient.get(`http://localhost:5094/api/User`)
    .subscribe(Response => {
 
      // If response comes hideloader() function is called
      // to hide that loader
      
      console.log(Response)
      this.li=Response;
      this.lis=this.li.list;
      
    });

}



  
}
