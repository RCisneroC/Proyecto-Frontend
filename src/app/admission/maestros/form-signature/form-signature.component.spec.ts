import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSignatureComponent } from './form-signature.component';

describe('FormSignatureComponent', () => {
  let component: FormSignatureComponent;
  let fixture: ComponentFixture<FormSignatureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormSignatureComponent]
    });
    fixture = TestBed.createComponent(FormSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
