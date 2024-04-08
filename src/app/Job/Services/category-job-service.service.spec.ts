import { TestBed } from '@angular/core/testing';

import { CategoryJobServiceService } from './category-job-service.service';

describe('CategoryJobServiceService', () => {
  let service: CategoryJobServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryJobServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
