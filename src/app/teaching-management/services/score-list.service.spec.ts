import { TestBed } from '@angular/core/testing';

import { ScoreListService } from './score-list.service';

describe('ScoreListService', () => {
  let service: ScoreListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
