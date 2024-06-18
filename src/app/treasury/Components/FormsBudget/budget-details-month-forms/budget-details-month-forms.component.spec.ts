import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetDetailsMonthFormsComponent } from './budget-details-month-forms.component';

describe('BudgetDetailsMonthFormsComponent', () => {
  let component: BudgetDetailsMonthFormsComponent;
  let fixture: ComponentFixture<BudgetDetailsMonthFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetDetailsMonthFormsComponent]
    });
    fixture = TestBed.createComponent(BudgetDetailsMonthFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
