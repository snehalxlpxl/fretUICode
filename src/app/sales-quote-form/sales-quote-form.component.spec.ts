import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesQuoteFormComponent } from './sales-quote-form.component';

describe('SalesQuoteFormComponent', () => {
  let component: SalesQuoteFormComponent;
  let fixture: ComponentFixture<SalesQuoteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesQuoteFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesQuoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
