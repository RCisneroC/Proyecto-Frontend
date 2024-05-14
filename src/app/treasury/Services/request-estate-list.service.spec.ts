import { TestBed } from '@angular/core/testing';

import { RequestEstateListService } from './request-estate-list.service';

describe('RequestEstateListService', () => {
  let service: RequestEstateListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestEstateListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
