import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetTermMonthFormsComponent } from './budget-term-month-forms.component';

describe('BudgetTermMonthFormsComponent', () => {
  let component: BudgetTermMonthFormsComponent;
  let fixture: ComponentFixture<BudgetTermMonthFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetTermMonthFormsComponent]
    });
    fixture = TestBed.createComponent(BudgetTermMonthFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
