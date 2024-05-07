import { TestBed } from '@angular/core/testing';

import { BudgetCodingService } from './budget-coding.service';

describe('BudgetCodingService', () => {
  let service: BudgetCodingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetCodingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
