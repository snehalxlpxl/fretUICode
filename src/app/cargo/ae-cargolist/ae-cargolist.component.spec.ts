import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeCargolistComponent } from './ae-cargolist.component';

describe('AeCargolistComponent', () => {
  let component: AeCargolistComponent;
  let fixture: ComponentFixture<AeCargolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AeCargolistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AeCargolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
