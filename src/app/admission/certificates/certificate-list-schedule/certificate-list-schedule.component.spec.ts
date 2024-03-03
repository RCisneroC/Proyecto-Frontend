import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateListScheduleComponent } from './certificate-list-schedule.component';

describe('CertificateListScheduleComponent', () => {
  let component: CertificateListScheduleComponent;
  let fixture: ComponentFixture<CertificateListScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertificateListScheduleComponent]
    });
    fixture = TestBed.createComponent(CertificateListScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
