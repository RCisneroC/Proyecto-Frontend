import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherScoreDetailsComponent } from './teacher-score-details.component';

describe('TeacherScoreDetailsComponent', () => {
  let component: TeacherScoreDetailsComponent;
  let fixture: ComponentFixture<TeacherScoreDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherScoreDetailsComponent]
    });
    fixture = TestBed.createComponent(TeacherScoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
