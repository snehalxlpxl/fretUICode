import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlinemasterComponent } from './airlinemaster.component';

describe('AirlinemasterComponent', () => {
  let component: AirlinemasterComponent;
  let fixture: ComponentFixture<AirlinemasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlinemasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirlinemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
