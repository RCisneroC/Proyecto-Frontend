import { TestBed } from '@angular/core/testing';

import { BudgetTermMonthServicesService } from './budget-term-month-services.service';

describe('BudgetTermMonthServicesService', () => {
  let service: BudgetTermMonthServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetTermMonthServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
