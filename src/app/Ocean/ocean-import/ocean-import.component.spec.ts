import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OceanImportComponent } from './ocean-import.component';

describe('OceanImportComponent', () => {
  let component: OceanImportComponent;
  let fixture: ComponentFixture<OceanImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OceanImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OceanImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
