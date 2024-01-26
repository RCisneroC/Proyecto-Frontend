import { TestBed } from '@angular/core/testing';

import { StudyModeService } from './study-mode.service';

describe('StudyModeService', () => {
  let service: StudyModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
