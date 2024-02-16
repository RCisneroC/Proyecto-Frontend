import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorStudentDetailComponent } from './tutor-student-detail.component';

describe('TutorStudentDetailComponent', () => {
  let component: TutorStudentDetailComponent;
  let fixture: ComponentFixture<TutorStudentDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TutorStudentDetailComponent]
    });
    fixture = TestBed.createComponent(TutorStudentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
