import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostSheetComponent } from './cost-sheet.component';

describe('CostSheetComponent', () => {
  let component: CostSheetComponent;
  let fixture: ComponentFixture<CostSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
