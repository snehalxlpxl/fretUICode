import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OceanExportComponent } from './ocean-export.component';

describe('OceanExportComponent', () => {
  let component: OceanExportComponent;
  let fixture: ComponentFixture<OceanExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OceanExportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OceanExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
