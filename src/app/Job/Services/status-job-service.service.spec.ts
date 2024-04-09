import { TestBed } from '@angular/core/testing';

import { StatusJobServiceService } from './status-job-service.service';

describe('StatusJobServiceService', () => {
  let service: StatusJobServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusJobServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
