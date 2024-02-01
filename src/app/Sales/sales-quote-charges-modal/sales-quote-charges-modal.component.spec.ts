import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesQuoteChargesModalComponent } from './sales-quote-charges-modal.component';

describe('SalesQuoteChargesModalComponent', () => {
  let component: SalesQuoteChargesModalComponent;
  let fixture: ComponentFixture<SalesQuoteChargesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesQuoteChargesModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesQuoteChargesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
