import { TestBed } from '@angular/core/testing';

import { CooperatingOrganizationService } from './cooperating-organization.service';

describe('CooperatingOrganizationService', () => {
  let service: CooperatingOrganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CooperatingOrganizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
