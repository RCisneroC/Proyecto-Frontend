import { TestBed } from '@angular/core/testing';

import { ParticipanteStatisticService } from './participante-statistic.service';

describe('ParticipanteStatisticService', () => {
  let service: ParticipanteStatisticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticipanteStatisticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
