import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OedetailsComponent } from './oedetails.component';

describe('OedetailsComponent', () => {
  let component: OedetailsComponent;
  let fixture: ComponentFixture<OedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OedetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
