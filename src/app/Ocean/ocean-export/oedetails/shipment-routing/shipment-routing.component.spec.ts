import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentRoutingComponent } from './shipment-routing.component';

describe('ShipmentRoutingComponent', () => {
  let component: ShipmentRoutingComponent;
  let fixture: ComponentFixture<ShipmentRoutingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentRoutingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmentRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
