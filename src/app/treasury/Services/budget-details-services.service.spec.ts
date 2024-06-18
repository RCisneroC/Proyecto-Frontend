import { TestBed } from '@angular/core/testing';

import { BudgetDetailsServicesService } from './budget-details-services.service';

describe('BudgetDetailsServicesService', () => {
  let service: BudgetDetailsServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetDetailsServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
