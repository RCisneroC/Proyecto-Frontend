import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetTermComponent } from './budget-term.component';

describe('BudgetTermComponent', () => {
  let component: BudgetTermComponent;
  let fixture: ComponentFixture<BudgetTermComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetTermComponent]
    });
    fixture = TestBed.createComponent(BudgetTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
