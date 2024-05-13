import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentPeriodListComponent } from './assignment-period-list.component';

describe('AssignmentPeriodListComponent', () => {
  let component: AssignmentPeriodListComponent;
  let fixture: ComponentFixture<AssignmentPeriodListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignmentPeriodListComponent]
    });
    fixture = TestBed.createComponent(AssignmentPeriodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
