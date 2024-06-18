import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetDetailsFormsComponent } from './budget-details-forms.component';

describe('BudgetDetailsFormsComponent', () => {
  let component: BudgetDetailsFormsComponent;
  let fixture: ComponentFixture<BudgetDetailsFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetDetailsFormsComponent]
    });
    fixture = TestBed.createComponent(BudgetDetailsFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
