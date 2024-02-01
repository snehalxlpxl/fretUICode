import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesDetailModalfromComponent } from './sales-detail-modalfrom.component';

describe('SalesDetailModalfromComponent', () => {
  let component: SalesDetailModalfromComponent;
  let fixture: ComponentFixture<SalesDetailModalfromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesDetailModalfromComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesDetailModalfromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
