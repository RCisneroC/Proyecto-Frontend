import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorECAttendenceFormComponent } from './tutor-ecattendence-form.component';

describe('TutorECAttendenceFormComponent', () => {
  let component: TutorECAttendenceFormComponent;
  let fixture: ComponentFixture<TutorECAttendenceFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TutorECAttendenceFormComponent]
    });
    fixture = TestBed.createComponent(TutorECAttendenceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
