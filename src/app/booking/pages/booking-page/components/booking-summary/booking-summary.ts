import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LucideAngularModule } from 'lucide-angular';
import { ICONS } from '../../../../../core/config/icons.config';

import { BookingService, BookingServiceVariant, BookingStaffMember } from '../../../../../core/models/booking-service.models';

import { BookingTimeSlot } from '../../../../../core/models/booking-availability.models';

@Component({
  selector: 'app-booking-summary',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './booking-summary.html',
  styleUrl: './booking-summary.css',
})

export class BookingSummary {

  icons = ICONS;

  @Input()
  service: BookingService | null = null;

  @Input()
  variant: BookingServiceVariant | null = null;

  @Input()
  selectedMode: 'online' | 'presential' | 'hybrid' | null = null;

  @Input()
  selectedStaff: BookingStaffMember | null = null;

  @Input()
  //selectedDate: Date | null = null;
  selectedDate: string | null = null;

  @Input()
  selectedTime: BookingTimeSlot | null = null;

  @Input()
  customer: any = null;

  @Input() canConfirm = false;

  @Output() confirm = new EventEmitter<void>();


  showConfirmation = false;


  getModeLabel(): string {

    switch (this.selectedMode) {

      case 'presential':
        return 'Presencial';

      case 'online':
        return 'En línea';

      case 'hybrid':
        return 'Híbrido';

      default:
        return 'Pendiente';

    }

  }

  confirmBooking() {
    this.confirm.emit();
  }

}