import { TestBed } from '@angular/core/testing';

import { BudgetServicesService } from './budget-services.service';

describe('BudgetServicesService', () => {
  let service: BudgetServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
