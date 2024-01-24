import { TestBed } from '@angular/core/testing';

import { AdmisionRequirimentService } from './admision-requiriment.service';

describe('AdmisionRequirimentService', () => {
  let service: AdmisionRequirimentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmisionRequirimentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
