import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OeCargolistComponent } from './oe-cargolist.component';

describe('OeCargolistComponent', () => {
  let component: OeCargolistComponent;
  let fixture: ComponentFixture<OeCargolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OeCargolistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OeCargolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
