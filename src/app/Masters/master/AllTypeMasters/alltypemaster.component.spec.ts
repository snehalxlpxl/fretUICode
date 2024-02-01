import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlltypemasterComponent } from './alltypemaster.component';

describe('AlltypemasterComponent', () => {
  let component: AlltypemasterComponent;
  let fixture: ComponentFixture<AlltypemasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlltypemasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlltypemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
