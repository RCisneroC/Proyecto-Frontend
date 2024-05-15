import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfIncomeReportComponent } from './pdf-income-report.component';

describe('PdfIncomeReportComponent', () => {
  let component: PdfIncomeReportComponent;
  let fixture: ComponentFixture<PdfIncomeReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfIncomeReportComponent]
    });
    fixture = TestBed.createComponent(PdfIncomeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
