import { TestBed } from '@angular/core/testing';

import { TypeActivityService } from './type-activity.service';

describe('TypeActivityService', () => {
  let service: TypeActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
