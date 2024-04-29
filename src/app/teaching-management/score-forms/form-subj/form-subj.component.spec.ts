import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubjComponent } from './form-subj.component';

describe('FormSubjComponent', () => {
  let component: FormSubjComponent;
  let fixture: ComponentFixture<FormSubjComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormSubjComponent]
    });
    fixture = TestBed.createComponent(FormSubjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
