import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDetailsRequestEstateComponent } from './form-details-request-estate.component';

describe('FormDetailsRequestEstateComponent', () => {
  let component: FormDetailsRequestEstateComponent;
  let fixture: ComponentFixture<FormDetailsRequestEstateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormDetailsRequestEstateComponent]
    });
    fixture = TestBed.createComponent(FormDetailsRequestEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
