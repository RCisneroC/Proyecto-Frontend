import { TestBed } from '@angular/core/testing';

import { PersonalDocenteServiceService } from './personal-docente-service.service';

describe('PersonalDocenteServiceService', () => {
  let service: PersonalDocenteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalDocenteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
