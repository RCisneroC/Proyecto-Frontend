import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleActivitiesListComponent } from './schedule-activities-list.component';

describe('ScheduleActivitiesListComponent', () => {
  let component: ScheduleActivitiesListComponent;
  let fixture: ComponentFixture<ScheduleActivitiesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleActivitiesListComponent]
    });
    fixture = TestBed.createComponent(ScheduleActivitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
