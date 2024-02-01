import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingSalesQuotesListComponent } from './pricing-sales-quotes-list.component';

describe('PricingSalesQuotesListComponent', () => {
  let component: PricingSalesQuotesListComponent;
  let fixture: ComponentFixture<PricingSalesQuotesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricingSalesQuotesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricingSalesQuotesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
