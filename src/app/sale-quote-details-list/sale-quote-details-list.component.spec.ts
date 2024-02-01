import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleQuoteDetailsListComponent } from './sale-quote-details-list.component';

describe('SaleQuoteDetailsListComponent', () => {
  let component: SaleQuoteDetailsListComponent;
  let fixture: ComponentFixture<SaleQuoteDetailsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleQuoteDetailsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleQuoteDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
