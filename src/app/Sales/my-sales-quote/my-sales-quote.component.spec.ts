import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySalesQuoteComponent } from './my-sales-quote.component';

describe('MySalesQuoteComponent', () => {
  let component: MySalesQuoteComponent;
  let fixture: ComponentFixture<MySalesQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySalesQuoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySalesQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
