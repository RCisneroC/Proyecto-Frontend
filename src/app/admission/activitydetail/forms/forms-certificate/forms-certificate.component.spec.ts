import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsCertificateComponent } from './forms-certificate.component';

describe('FormsCertificateComponent', () => {
  let component: FormsCertificateComponent;
  let fixture: ComponentFixture<FormsCertificateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormsCertificateComponent]
    });
    fixture = TestBed.createComponent(FormsCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
