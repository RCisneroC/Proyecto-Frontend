import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeAdminissionRequirementComponent } from './degree-adminission-requirement.component';

describe('DegreeAdminissionRequirementComponent', () => {
  let component: DegreeAdminissionRequirementComponent;
  let fixture: ComponentFixture<DegreeAdminissionRequirementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DegreeAdminissionRequirementComponent]
    });
    fixture = TestBed.createComponent(DegreeAdminissionRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
