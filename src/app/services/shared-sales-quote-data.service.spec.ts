import { TestBed } from '@angular/core/testing';

import { SharedSalesQuoteDataService } from './shared-sales-quote-data.service';

describe('SharedSalesQuoteDataService', () => {
  let service: SharedSalesQuoteDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedSalesQuoteDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
