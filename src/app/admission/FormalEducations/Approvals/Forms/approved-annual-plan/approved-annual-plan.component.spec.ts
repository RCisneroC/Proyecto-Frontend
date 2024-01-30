import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedAnnualPlanComponent } from './approved-annual-plan.component';

describe('ApprovedAnnualPlanComponent', () => {
  let component: ApprovedAnnualPlanComponent;
  let fixture: ComponentFixture<ApprovedAnnualPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovedAnnualPlanComponent]
    });
    fixture = TestBed.createComponent(ApprovedAnnualPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
