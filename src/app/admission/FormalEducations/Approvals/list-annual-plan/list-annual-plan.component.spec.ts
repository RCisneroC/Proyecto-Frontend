import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAnnualPlanComponent } from './list-annual-plan.component';

describe('ListAnnualPlanComponent', () => {
  let component: ListAnnualPlanComponent;
  let fixture: ComponentFixture<ListAnnualPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAnnualPlanComponent]
    });
    fixture = TestBed.createComponent(ListAnnualPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
