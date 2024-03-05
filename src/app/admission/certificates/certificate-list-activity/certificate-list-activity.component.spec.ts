import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateListActivityComponent } from './certificate-list-activity.component';

describe('CertificateListActivityComponent', () => {
  let component: CertificateListActivityComponent;
  let fixture: ComponentFixture<CertificateListActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertificateListActivityComponent]
    });
    fixture = TestBed.createComponent(CertificateListActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
