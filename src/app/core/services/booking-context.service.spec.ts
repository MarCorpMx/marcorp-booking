import { TestBed } from '@angular/core/testing';

import { BookingContextService } from './booking-context.service';

describe('BookingContextService', () => {
  let service: BookingContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
