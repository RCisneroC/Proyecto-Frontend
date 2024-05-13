import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssignmentPeriodComponent } from './add-assignment-period.component';

describe('AddAssignmentPeriodComponent', () => {
  let component: AddAssignmentPeriodComponent;
  let fixture: ComponentFixture<AddAssignmentPeriodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAssignmentPeriodComponent]
    });
    fixture = TestBed.createComponent(AddAssignmentPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
