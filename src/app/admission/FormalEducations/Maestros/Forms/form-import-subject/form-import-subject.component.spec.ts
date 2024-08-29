import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormImportSubjectComponent } from './form-import-subject.component';

describe('FormImportSubjectComponent', () => {
  let component: FormImportSubjectComponent;
  let fixture: ComponentFixture<FormImportSubjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormImportSubjectComponent]
    });
    fixture = TestBed.createComponent(FormImportSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
