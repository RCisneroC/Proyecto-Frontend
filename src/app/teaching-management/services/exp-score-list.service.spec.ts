import { TestBed } from '@angular/core/testing';

import { ExpScoreListService } from './exp-score-list.service';

describe('ExpScoreListService', () => {
  let service: ExpScoreListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpScoreListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
