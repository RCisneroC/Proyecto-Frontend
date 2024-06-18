import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetFormsComponent } from './budget-forms.component';

describe('BudgetFormsComponent', () => {
  let component: BudgetFormsComponent;
  let fixture: ComponentFixture<BudgetFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetFormsComponent]
    });
    fixture = TestBed.createComponent(BudgetFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
