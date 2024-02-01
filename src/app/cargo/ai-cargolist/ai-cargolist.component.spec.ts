import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiCargolistComponent } from './ai-cargolist.component';

describe('AiCargolistComponent', () => {
  let component: AiCargolistComponent;
  let fixture: ComponentFixture<AiCargolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiCargolistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiCargolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
