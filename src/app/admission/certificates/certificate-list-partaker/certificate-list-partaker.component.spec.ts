import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateListPartakerComponent } from './certificate-list-partaker.component';

describe('CertificateListPartakerComponent', () => {
  let component: CertificateListPartakerComponent;
  let fixture: ComponentFixture<CertificateListPartakerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertificateListPartakerComponent]
    });
    fixture = TestBed.createComponent(CertificateListPartakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
