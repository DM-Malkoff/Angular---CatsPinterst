import {TestBed} from '@angular/core/testing';

import {TheCatApiService} from './the-cat-api.service';

describe('TheCatApiService', () => {
  let service: TheCatApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TheCatApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
