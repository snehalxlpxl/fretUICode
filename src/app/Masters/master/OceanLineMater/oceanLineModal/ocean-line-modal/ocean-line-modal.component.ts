import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '../../modal.service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ocean-line-modal',
  templateUrl: './ocean-line-modal.component.html',
  styleUrls: ['./ocean-line-modal.component.scss']
})
export class OceanLineModalComponent implements OnInit {
  
  modalBasic1:any;
  // modalForm1:ElementRef
  @ViewChild('modalForm1') modalForm1: ElementRef<any>;

  constructor(private service:ModalService,private modalService:NgbModal) { }
  // modalBasic:ElementRef
  ngOnInit(): void {
    this.service.openModal$.subscribe((value: any) => {
      this.modalBasic1 = value;
      alert(this.modalBasic1)
      console.log((this.modalBasic1))
      // this.openmodal(this.modalForm1);
    });
  }
  // openmodal(modalForm1){
  //   this.modalService.open(modalForm1,{ size: 'lg', backdrop: 'static' });
  // }
}
