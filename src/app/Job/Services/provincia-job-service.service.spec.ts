import { TestBed } from '@angular/core/testing';

import { ProvinciaJobServiceService } from './provincia-job-service.service';

describe('ProvinciaJobServiceService', () => {
  let service: ProvinciaJobServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvinciaJobServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
