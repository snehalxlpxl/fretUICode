import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OceanLineMasterComponent } from './OceanLineMater/ocean-line-master/ocean-line-master.component';
import { OceanLineModalComponent } from './OceanLineMater/oceanLineModal/ocean-line-modal/ocean-line-modal.component';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    
  }

}
