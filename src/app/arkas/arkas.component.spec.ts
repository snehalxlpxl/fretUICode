import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArkasComponent } from './arkas.component';

describe('ArkasComponent', () => {
  let component: ArkasComponent;
  let fixture: ComponentFixture<ArkasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArkasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArkasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
