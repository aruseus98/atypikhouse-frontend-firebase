import { TestBed } from '@angular/core/testing';

import { SearchLodgingService } from './search-lodging.service';

describe('SearchLodgingService', () => {
  let service: SearchLodgingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchLodgingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
