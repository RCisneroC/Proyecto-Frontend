import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationsCriteriaFormsComponent } from './evaluations-criteria-forms.component';

describe('EvaluationsCriteriaFormsComponent', () => {
  let component: EvaluationsCriteriaFormsComponent;
  let fixture: ComponentFixture<EvaluationsCriteriaFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationsCriteriaFormsComponent]
    });
    fixture = TestBed.createComponent(EvaluationsCriteriaFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
