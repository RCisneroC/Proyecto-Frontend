import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollAttendenceFormComponent } from './enroll-attendence-form.component';

describe('EnrollAttendenceFormComponent', () => {
  let component: EnrollAttendenceFormComponent;
  let fixture: ComponentFixture<EnrollAttendenceFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnrollAttendenceFormComponent]
    });
    fixture = TestBed.createComponent(EnrollAttendenceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
