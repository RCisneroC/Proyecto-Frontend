import { TestBed } from '@angular/core/testing';

import { CooperationgOrganizationService } from './cooperationg-organization.service';

describe('CooperationgOrganizationService', () => {
  let service: CooperationgOrganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CooperationgOrganizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
