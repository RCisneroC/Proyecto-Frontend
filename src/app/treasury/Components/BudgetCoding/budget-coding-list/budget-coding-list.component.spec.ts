import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCodingListComponent } from './budget-coding-list.component';

describe('BudgetCodingListComponent', () => {
  let component: BudgetCodingListComponent;
  let fixture: ComponentFixture<BudgetCodingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetCodingListComponent]
    });
    fixture = TestBed.createComponent(BudgetCodingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
