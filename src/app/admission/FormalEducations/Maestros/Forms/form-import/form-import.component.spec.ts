import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormImportComponent } from './form-import.component';

describe('FormImportComponent', () => {
  let component: FormImportComponent;
  let fixture: ComponentFixture<FormImportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormImportComponent]
    });
    fixture = TestBed.createComponent(FormImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
