import { TestBed } from '@angular/core/testing';

import { TypeContractJobServiceService } from './type-contract-job-service.service';

describe('TypeContractJobServiceService', () => {
  let service: TypeContractJobServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeContractJobServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
