import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-warehousing',
  templateUrl: './warehousing.component.html',
  styleUrls: ['./warehousing.component.scss']
})
export class WarehousingComponent implements OnInit {
  @Input() hero;
  isSavebtn:false;

  constructor() { }

  ngOnInit(): void {
  }

}
