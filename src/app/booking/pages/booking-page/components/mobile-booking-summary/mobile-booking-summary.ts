import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LucideAngularModule } from 'lucide-angular';
import { ICONS } from '../../../../../core/config/icons.config';

import { BookingService, BookingServiceVariant, BookingStaffMember } from '../../../../../core/models/booking-service.models';
import { BookingTimeSlot } from '../../../../../core/models/booking-availability.models';

@Component({
  selector: 'app-mobile-booking-summary',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './mobile-booking-summary.html',
  styleUrl: './mobile-booking-summary.css',
})

export class MobileBookingSummary {

  icons = ICONS;

  mobileSummaryExpanded = false;

  @Input()
  service: BookingService | null = null;

  @Input()
  variant: BookingServiceVariant | null = null;

  @Input()
  selectedMode: 'online' | 'presential' | 'hybrid' | null = null;

  @Input()
  selectedStaff: BookingStaffMember | null = null;

  @Input()
  selectedDate: Date | null = null;

  @Input()
  selectedTime: BookingTimeSlot | null = null;

  @Input()
  customer: any = null;

  @Output()
  continue =
    new EventEmitter<void>();

  toggleMobileSummary(): void {

    this.mobileSummaryExpanded =
      !this.mobileSummaryExpanded;

  }

  continueBooking(): void {

    this.continue.emit();

  }

  getModeLabel(): string {

    switch (this.selectedMode) {

      case 'online':
        return 'En línea';

      case 'presential':
        return 'Presencial';

      case 'hybrid':
        return 'Híbrido';

      default:
        return 'Pendiente';

    }

  }

  hasService(): boolean {
    return !!this.variant;
  }

  hasMode(): boolean {
    return !!this.selectedMode;
  }

  hasStaff(): boolean {
    return !!this.selectedStaff;
  }

  hasDate(): boolean {
    return !!this.selectedDate;
  }

  hasTime(): boolean {
    return !!this.selectedTime;
  }

  hasCustomer(): boolean {
    return !!this.customer;
  }



}
