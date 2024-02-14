import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityLearningFormsComponent } from './activity-learning-forms.component';

describe('ActivityLearningFormsComponent', () => {
  let component: ActivityLearningFormsComponent;
  let fixture: ComponentFixture<ActivityLearningFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityLearningFormsComponent]
    });
    fixture = TestBed.createComponent(ActivityLearningFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
