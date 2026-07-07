import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';

import { BookingOrganizationEntryResponse, BookingOrganizationBranchResponse } from '../models/booking-entry.models';
import { BookingServicesResponse } from '../models/booking-service.models';
import { BookingAvailability } from '../models/booking-availability.models';

@Injectable({
  providedIn: 'root',
})
export class BookingPublicService {

  private api = inject(ApiService);

  // rombi/org
  getOrganizationEntry(
    organizationSlug: string
  ): Observable<BookingOrganizationEntryResponse> {
    return this.api.get<BookingOrganizationEntryResponse>(
      `v1/public-booking/${organizationSlug}`
    );
  }

  // rombi/org/branch
  getBranchBookingEntry(
    organizationSlug: string,
    branchSlug: string
  ): Observable<BookingOrganizationBranchResponse> {

    return this.api.get<BookingOrganizationBranchResponse>(
      `v1/public-booking/${organizationSlug}/${branchSlug}`
    );
  }

  // services list
  getServices(
    organizationSlug: string,
    branchSlug: string
  ) {
    return this.api.get<BookingServicesResponse>(
      `v1/public-booking/${organizationSlug}/${branchSlug}/services`
    );

  }

  // availability
  getAvailability(
    variantId: number,
    staffMemberId?: number
  ): Observable<BookingAvailability> {

    let url =
      `v1/public-booking/variants/${variantId}/availability`;

    if (staffMemberId) {
      url += `?staff=${staffMemberId}`;
    }

    return this.api.get<BookingAvailability>(url);

  }

  getTimeSlots(
    variantId: number,
    date: string,
    staffMemberId?: number
  ) {

    let url =
      `v1/public-booking/variants/${variantId}/timeslots?date=${date}`;

    if (staffMemberId) {
      url += `&staff=${staffMemberId}`;
    }

    //return this.api.get<BookingTimeSlotsResponse>(url);
    return this.api.get<any>(url);

  }

  /*GET
/public-booking/variants/{variant}/timeslots
?date=2026-06-29
&staff=5*/


  // booking creation
  createBooking() { }

  // customer validation
  validateCustomer() { }

  // cancel
  cancelBooking() { }

  // reschedule
  rescheduleBooking() { }

}
