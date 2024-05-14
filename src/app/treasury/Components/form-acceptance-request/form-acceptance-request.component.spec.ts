import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAcceptanceRequestComponent } from './form-acceptance-request.component';

describe('FormAcceptanceRequestComponent', () => {
  let component: FormAcceptanceRequestComponent;
  let fixture: ComponentFixture<FormAcceptanceRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormAcceptanceRequestComponent]
    });
    fixture = TestBed.createComponent(FormAcceptanceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
