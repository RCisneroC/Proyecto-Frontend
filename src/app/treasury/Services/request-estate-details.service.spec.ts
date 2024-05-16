import { TestBed } from '@angular/core/testing';

import { RequestEstateDetailsService } from './request-estate-details.service';

describe('RequestEstateDetailsService', () => {
  let service: RequestEstateDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestEstateDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
