import { TestBed } from '@angular/core/testing';

import { UbicationsServicesService } from './ubications-services.service';

describe('UbicationsServicesService', () => {
  let service: UbicationsServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UbicationsServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
