import { TestBed } from '@angular/core/testing';

import { BookingLoadingService } from './booking-loading.service';

describe('BookingLoadingService', () => {
  let service: BookingLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
