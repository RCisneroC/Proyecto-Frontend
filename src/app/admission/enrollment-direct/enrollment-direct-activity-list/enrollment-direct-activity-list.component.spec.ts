import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentDirectActivityListComponent } from './enrollment-direct-activity-list.component';

describe('EnrollmentDirectActivityListComponent', () => {
  let component: EnrollmentDirectActivityListComponent;
  let fixture: ComponentFixture<EnrollmentDirectActivityListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnrollmentDirectActivityListComponent]
    });
    fixture = TestBed.createComponent(EnrollmentDirectActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
