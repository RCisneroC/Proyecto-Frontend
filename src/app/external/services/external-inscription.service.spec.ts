import { TestBed } from '@angular/core/testing';

import { ExternalInscriptionService } from './external-inscription.service';

describe('ExternalInscriptionService', () => {
  let service: ExternalInscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalInscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
