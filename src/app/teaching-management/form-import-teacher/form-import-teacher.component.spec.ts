import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormImportTeacherComponent } from './form-import-teacher.component';

describe('FormImportTeacherComponent', () => {
  let component: FormImportTeacherComponent;
  let fixture: ComponentFixture<FormImportTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormImportTeacherComponent]
    });
    fixture = TestBed.createComponent(FormImportTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
