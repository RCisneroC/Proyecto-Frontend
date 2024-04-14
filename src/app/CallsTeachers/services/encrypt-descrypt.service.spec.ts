import { TestBed } from '@angular/core/testing';

import { EncryptDescryptService } from './encrypt-descrypt.service';

describe('EncryptDescryptService', () => {
  let service: EncryptDescryptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncryptDescryptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
