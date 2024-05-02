import { TestBed } from '@angular/core/testing';

import { EduLevelScoreListService } from './edu-level-score-list.service';

describe('EduLevelScoreListService', () => {
  let service: EduLevelScoreListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EduLevelScoreListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
