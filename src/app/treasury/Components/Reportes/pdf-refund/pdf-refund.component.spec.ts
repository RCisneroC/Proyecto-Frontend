import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfRefundComponent } from './pdf-refund.component';

describe('PdfRefundComponent', () => {
  let component: PdfRefundComponent;
  let fixture: ComponentFixture<PdfRefundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfRefundComponent]
    });
    fixture = TestBed.createComponent(PdfRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
