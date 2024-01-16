import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPosterPDFComponent } from './view-poster-pdf.component';

describe('ViewPosterPDFComponent', () => {
  let component: ViewPosterPDFComponent;
  let fixture: ComponentFixture<ViewPosterPDFComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPosterPDFComponent]
    });
    fixture = TestBed.createComponent(ViewPosterPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
