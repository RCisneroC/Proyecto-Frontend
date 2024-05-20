import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateExpensesComponent } from './form-update-expenses.component';

describe('FormUpdateExpensesComponent', () => {
  let component: FormUpdateExpensesComponent;
  let fixture: ComponentFixture<FormUpdateExpensesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormUpdateExpensesComponent]
    });
    fixture = TestBed.createComponent(FormUpdateExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
