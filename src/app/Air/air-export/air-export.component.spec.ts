import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirExportComponent } from './air-export.component';

describe('AirExportComponent', () => {
  let component: AirExportComponent;
  let fixture: ComponentFixture<AirExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirExportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
