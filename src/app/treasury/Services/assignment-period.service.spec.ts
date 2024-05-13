import { TestBed } from '@angular/core/testing';

import { AssignmentPeriodService } from './assignment-period.service';

describe('AssignmentPeriodService', () => {
  let service: AssignmentPeriodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignmentPeriodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
