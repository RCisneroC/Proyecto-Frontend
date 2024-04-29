import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherScoreListComponent } from './teacher-score-list.component';

describe('TeacherScoreListComponent', () => {
  let component: TeacherScoreListComponent;
  let fixture: ComponentFixture<TeacherScoreListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherScoreListComponent]
    });
    fixture = TestBed.createComponent(TeacherScoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
