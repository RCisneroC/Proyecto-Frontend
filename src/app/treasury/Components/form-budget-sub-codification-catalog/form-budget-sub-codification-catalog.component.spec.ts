import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBudgetSubCodificationCatalogComponent } from './form-budget-sub-codification-catalog.component';

describe('FormBudgetSubCodificationCatalogComponent', () => {
  let component: FormBudgetSubCodificationCatalogComponent;
  let fixture: ComponentFixture<FormBudgetSubCodificationCatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormBudgetSubCodificationCatalogComponent]
    });
    fixture = TestBed.createComponent(FormBudgetSubCodificationCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
