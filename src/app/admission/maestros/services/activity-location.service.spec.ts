import { TestBed } from '@angular/core/testing';

import { ActivityLocationService } from './activity-location.service';

describe('ActivityLocationService', () => {
  let service: ActivityLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
