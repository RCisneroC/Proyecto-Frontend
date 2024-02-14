import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlanStudyFormsComponent } from './create-plan-study-forms.component';

describe('CreatePlanStudyFormsComponent', () => {
  let component: CreatePlanStudyFormsComponent;
  let fixture: ComponentFixture<CreatePlanStudyFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePlanStudyFormsComponent]
    });
    fixture = TestBed.createComponent(CreatePlanStudyFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
