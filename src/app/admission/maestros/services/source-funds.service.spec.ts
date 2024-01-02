import { TestBed } from '@angular/core/testing';

import { SourceFundsService } from './source-funds.service';

describe('SourceFundsService', () => {
  let service: SourceFundsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SourceFundsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
