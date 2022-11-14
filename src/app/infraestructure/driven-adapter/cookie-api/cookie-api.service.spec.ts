import { TestBed } from '@angular/core/testing';

import { CookieApiService } from './cookie-api.service';

describe('CookieApiService', () => {
  let service: CookieApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
