import { TestBed } from '@angular/core/testing';

import { BookingEntryService } from './booking-entry-service';

describe('BookingEntryService', () => {
  let service: BookingEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
