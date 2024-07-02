import { TestBed } from '@angular/core/testing';

import { TypeRequestService } from './type-request.service';

describe('TypeRequestService', () => {
  let service: TypeRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
