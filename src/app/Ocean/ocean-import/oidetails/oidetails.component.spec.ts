import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OidetailsComponent } from './oidetails.component';

describe('OidetailsComponent', () => {
  let component: OidetailsComponent;
  let fixture: ComponentFixture<OidetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OidetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OidetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
