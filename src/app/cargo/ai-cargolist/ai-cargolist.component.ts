import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ai-cargolist',
  templateUrl: './ai-cargolist.component.html',
  styleUrls: ['./ai-cargolist.component.scss']
})
export class AiCargolistComponent implements OnInit {

  public contentHeader: object;

  constructor() { }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Air Import',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Cargo List',
            isLink: true,
            link: '/'
          }
        ]
      }
    };
  }

 

}
