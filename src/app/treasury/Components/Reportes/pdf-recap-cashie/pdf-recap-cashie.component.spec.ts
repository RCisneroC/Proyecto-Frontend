import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfRecapCashieComponent } from './pdf-recap-cashie.component';

describe('PdfRecapCashieComponent', () => {
  let component: PdfRecapCashieComponent;
  let fixture: ComponentFixture<PdfRecapCashieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfRecapCashieComponent]
    });
    fixture = TestBed.createComponent(PdfRecapCashieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
