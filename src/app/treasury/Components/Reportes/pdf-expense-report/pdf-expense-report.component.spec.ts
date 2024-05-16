import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfExpenseReportComponent } from './pdf-expense-report.component';

describe('PdfExpenseReportComponent', () => {
  let component: PdfExpenseReportComponent;
  let fixture: ComponentFixture<PdfExpenseReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfExpenseReportComponent]
    });
    fixture = TestBed.createComponent(PdfExpenseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
