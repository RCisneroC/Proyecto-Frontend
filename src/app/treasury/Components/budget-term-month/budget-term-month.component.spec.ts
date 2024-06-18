import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetTermMonthComponent } from './budget-term-month.component';

describe('BudgetTermMonthComponent', () => {
  let component: BudgetTermMonthComponent;
  let fixture: ComponentFixture<BudgetTermMonthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetTermMonthComponent]
    });
    fixture = TestBed.createComponent(BudgetTermMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
