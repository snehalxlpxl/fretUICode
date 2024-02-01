import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySalesQuoteListItemComponent } from './my-sales-quote-list-item.component';

describe('MySalesQuoteListItemComponent', () => {
  let component: MySalesQuoteListItemComponent;
  let fixture: ComponentFixture<MySalesQuoteListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySalesQuoteListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySalesQuoteListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
