import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import Stepper from 'bs-stepper';

@Component({
  selector: 'app-cargo-details',
  templateUrl: './cargo-details.component.html',
  styleUrls: ['./cargo-details.component.scss']
})
export class CargoDetailsComponent implements OnInit {

  public TDNameVar;
  public contentHeader: object;
  public TDEmailVar;
  public TDFirstNameVar;
  public TDLastNameVar;
  public twitterVar;
  public facebookVar;
  public googleVar;
  public linkedinVar;
  public landmarkVar;
  public addressVar;
  private bsStepper;
  public alluser: any;

  public selectBasic = [
    { name: 'UK' },
    { name: 'USA' },
    { name: 'Spain' },
    { name: 'France' },
    { name: 'Italy' },
    { name: 'Australia' }
  ];

  public selectMulti = [{ name: 'English' }, { name: 'French' }, { name: 'Spanish' }];
  public selectMultiSelected;

  private horizontalWizardStepper: Stepper;
  private verticalWizardStepper: Stepper;

  constructor(private httpclient:HttpClient) { }

  /**
   * Horizontal Wizard Stepper Next
   *
   * @param data
   */
  horizontalWizardStepperNext(data) {
    if (data.form.valid === true) {
      this.horizontalWizardStepper.next();
    }
  }
  /**
   * Horizontal Wizard Stepper Previous
   */
  horizontalWizardStepperPrevious() {
    this.horizontalWizardStepper.previous();
  }


  ngOnInit(): void {

    this.contentHeader = {
      headerTitle: 'Ocean Import',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'CargoList',
            isLink: true,
            link: '/oi-cargolist'
          },
          {
            name: 'MSI2200012',
            isLink: false
          }
        ]
      }
    }



    this.horizontalWizardStepper = new Stepper(document.querySelector('#stepper1'), {});

    this.verticalWizardStepper = new Stepper(document.querySelector('#stepper2'), {
      linear: false,
      animation: true
    });

    this.bsStepper = document.querySelectorAll('.bs-stepper');

    this.httpclient.get(`http://localhost:5094/api/User`).subscribe(res=>{
      console.log('get all cargolist');
      this.alluser=res;

    }, err => {
      console.log("error while fetching data");
  
    });

  
  
  }

  onSubmit() {
    alert('Submitted!!');
    return false;
  }

}
