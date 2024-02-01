import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OceanLineMasterComponent } from './ocean-line-master.component';

describe('OceanLineMasterComponent', () => {
  let component: OceanLineMasterComponent;
  let fixture: ComponentFixture<OceanLineMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OceanLineMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OceanLineMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
