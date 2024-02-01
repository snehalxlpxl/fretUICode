import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OiCargolistComponent } from './oi-cargolist.component';

describe('OiCargolistComponent', () => {
  let component: OiCargolistComponent;
  let fixture: ComponentFixture<OiCargolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OiCargolistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OiCargolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
