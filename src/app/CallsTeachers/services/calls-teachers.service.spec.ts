import { TestBed } from '@angular/core/testing';

import { CallsTeachersService } from './calls-teachers.service';

describe('CallsTeachersService', () => {
  let service: CallsTeachersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallsTeachersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
