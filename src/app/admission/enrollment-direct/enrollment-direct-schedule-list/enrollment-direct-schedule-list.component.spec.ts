import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentDirectScheduleListComponent } from './enrollment-direct-schedule-list.component';

describe('EnrollmentDirectScheduleListComponent', () => {
  let component: EnrollmentDirectScheduleListComponent;
  let fixture: ComponentFixture<EnrollmentDirectScheduleListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnrollmentDirectScheduleListComponent]
    });
    fixture = TestBed.createComponent(EnrollmentDirectScheduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
