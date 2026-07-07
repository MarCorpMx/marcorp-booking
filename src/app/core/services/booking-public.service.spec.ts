import { TestBed } from '@angular/core/testing';

import { BookingPublicService } from './booking-public.service';

describe('BookingPublicService', () => {
  let service: BookingPublicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingPublicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
