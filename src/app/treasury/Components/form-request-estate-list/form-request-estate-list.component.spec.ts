import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRequestEstateListComponent } from './form-request-estate-list.component';

describe('FormRequestEstateListComponent', () => {
  let component: FormRequestEstateListComponent;
  let fixture: ComponentFixture<FormRequestEstateListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormRequestEstateListComponent]
    });
    fixture = TestBed.createComponent(FormRequestEstateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
