import { TestBed } from '@angular/core/testing';

import { CompanyJobServiceService } from './company-job-service.service';

describe('CompanyJobServiceService', () => {
  let service: CompanyJobServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyJobServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
