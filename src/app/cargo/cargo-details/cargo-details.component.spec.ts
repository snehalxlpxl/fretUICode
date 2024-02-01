import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoDetailsComponent } from './cargo-details.component';

describe('CargoDetailsComponent', () => {
  let component: CargoDetailsComponent;
  let fixture: ComponentFixture<CargoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargoDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
