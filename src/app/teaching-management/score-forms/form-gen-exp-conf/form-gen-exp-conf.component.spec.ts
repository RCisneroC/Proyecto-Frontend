import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGenExpConfComponent } from './form-gen-exp-conf.component';

describe('FormGenExpConfComponent', () => {
  let component: FormGenExpConfComponent;
  let fixture: ComponentFixture<FormGenExpConfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormGenExpConfComponent]
    });
    fixture = TestBed.createComponent(FormGenExpConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
