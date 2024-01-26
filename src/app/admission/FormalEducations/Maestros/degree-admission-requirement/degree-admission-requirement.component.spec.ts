import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeAdmissionRequirementComponent } from './degree-admission-requirement.component';

describe('DegreeAdmissionRequirementComponent', () => {
  let component: DegreeAdmissionRequirementComponent;
  let fixture: ComponentFixture<DegreeAdmissionRequirementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DegreeAdmissionRequirementComponent]
    });
    fixture = TestBed.createComponent(DegreeAdmissionRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
