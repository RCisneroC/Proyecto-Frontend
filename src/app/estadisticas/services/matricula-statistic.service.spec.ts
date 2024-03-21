import { TestBed } from '@angular/core/testing';

import { MatriculaStatisticService } from './matricula-statistic.service';

describe('MatriculaStatisticService', () => {
  let service: MatriculaStatisticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatriculaStatisticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
