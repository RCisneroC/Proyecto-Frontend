import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFormsComponent } from './company-forms.component';

describe('CompanyFormsComponent', () => {
  let component: CompanyFormsComponent;
  let fixture: ComponentFixture<CompanyFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyFormsComponent]
    });
    fixture = TestBed.createComponent(CompanyFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
