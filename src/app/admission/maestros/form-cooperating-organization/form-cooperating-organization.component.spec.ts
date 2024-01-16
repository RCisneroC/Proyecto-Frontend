import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCooperatingOrganizationComponent } from './form-cooperating-organization.component';

describe('FormCooperatingOrganizationComponent', () => {
  let component: FormCooperatingOrganizationComponent;
  let fixture: ComponentFixture<FormCooperatingOrganizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCooperatingOrganizationComponent]
    });
    fixture = TestBed.createComponent(FormCooperatingOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
