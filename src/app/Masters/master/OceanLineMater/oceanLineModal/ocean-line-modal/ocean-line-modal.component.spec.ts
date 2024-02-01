import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OceanLineModalComponent } from './ocean-line-modal.component';

describe('OceanLineModalComponent', () => {
  let component: OceanLineModalComponent;
  let fixture: ComponentFixture<OceanLineModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OceanLineModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OceanLineModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
