import { TestBed } from '@angular/core/testing';

import { CategoryServiceForoService } from './category-service-foro.service';

describe('CategoryServiceForoService', () => {
  let service: CategoryServiceForoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryServiceForoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
