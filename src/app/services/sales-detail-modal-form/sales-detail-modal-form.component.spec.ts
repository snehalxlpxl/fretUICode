import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesDetailModalFormComponent } from './sales-detail-modal-form.component';

describe('SalesDetailModalFormComponent', () => {
  let component: SalesDetailModalFormComponent;
  let fixture: ComponentFixture<SalesDetailModalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesDetailModalFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesDetailModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
