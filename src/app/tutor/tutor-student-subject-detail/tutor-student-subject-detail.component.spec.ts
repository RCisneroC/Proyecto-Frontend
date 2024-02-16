import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorStudentSubjectDetailComponent } from './tutor-student-subject-detail.component';

describe('TutorStudentSubjectDetailComponent', () => {
  let component: TutorStudentSubjectDetailComponent;
  let fixture: ComponentFixture<TutorStudentSubjectDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TutorStudentSubjectDetailComponent]
    });
    fixture = TestBed.createComponent(TutorStudentSubjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
