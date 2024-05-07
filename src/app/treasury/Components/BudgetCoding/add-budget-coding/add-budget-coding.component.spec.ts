import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBudgetCodingComponent } from './add-budget-coding.component';

describe('AddBudgetCodingComponent', () => {
  let component: AddBudgetCodingComponent;
  let fixture: ComponentFixture<AddBudgetCodingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBudgetCodingComponent]
    });
    fixture = TestBed.createComponent(AddBudgetCodingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
