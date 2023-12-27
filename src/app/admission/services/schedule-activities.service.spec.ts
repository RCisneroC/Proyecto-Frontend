import { TestBed } from '@angular/core/testing';

import { ScheduleActivitiesService } from './schedule-activities.service';

describe('ScheduleActivitiesService', () => {
  let service: ScheduleActivitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleActivitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
