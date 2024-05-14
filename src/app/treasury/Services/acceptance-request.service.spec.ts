import { TestBed } from '@angular/core/testing';

import { AcceptanceRequestService } from './acceptance-request.service';

describe('AcceptanceRequestService', () => {
  let service: AcceptanceRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcceptanceRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
