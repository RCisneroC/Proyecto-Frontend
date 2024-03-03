import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentDirectBackofficeComponent } from './enrollment-direct-backoffice.component';

describe('EnrollmentDirectBackofficeComponent', () => {
  let component: EnrollmentDirectBackofficeComponent;
  let fixture: ComponentFixture<EnrollmentDirectBackofficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnrollmentDirectBackofficeComponent]
    });
    fixture = TestBed.createComponent(EnrollmentDirectBackofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
