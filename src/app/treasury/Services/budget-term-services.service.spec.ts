import { TestBed } from '@angular/core/testing';

import { BudgetTermServicesService } from './budget-term-services.service';

describe('BudgetTermServicesService', () => {
  let service: BudgetTermServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetTermServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
