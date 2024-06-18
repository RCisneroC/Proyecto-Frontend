import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetTermFormsComponent } from './budget-term-forms.component';

describe('BudgetTermFormsComponent', () => {
  let component: BudgetTermFormsComponent;
  let fixture: ComponentFixture<BudgetTermFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetTermFormsComponent]
    });
    fixture = TestBed.createComponent(BudgetTermFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
