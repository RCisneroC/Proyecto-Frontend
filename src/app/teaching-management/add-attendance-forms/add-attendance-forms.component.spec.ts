import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttendanceFormsComponent } from './add-attendance-forms.component';

describe('AddAttendanceFormsComponent', () => {
  let component: AddAttendanceFormsComponent;
  let fixture: ComponentFixture<AddAttendanceFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAttendanceFormsComponent]
    });
    fixture = TestBed.createComponent(AddAttendanceFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
