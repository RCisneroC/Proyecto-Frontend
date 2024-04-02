import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherApplyCallsComponent } from './teacher-apply-calls.component';

describe('TeacherApplyCallsComponent', () => {
  let component: TeacherApplyCallsComponent;
  let fixture: ComponentFixture<TeacherApplyCallsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherApplyCallsComponent]
    });
    fixture = TestBed.createComponent(TeacherApplyCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
