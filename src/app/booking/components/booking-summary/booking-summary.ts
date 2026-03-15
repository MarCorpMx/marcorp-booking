import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ClipboardList, Calendar, Clock, User, ShieldCheck } from 'lucide-angular';

@Component({
  selector: 'app-booking-summary',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './booking-summary.html',
  styleUrl: './booking-summary.css',
})

export class BookingSummary {

  @Input() service: any;
  @Input() variant: any;

  @Input() selectedDate!: Date | null;
  @Input() selectedTime: string | null = null;


  @Input() canConfirm = false;
  @Output() confirm = new EventEmitter<void>();

  @Input() customer: any;

  showConfirmation = false;


  icons = {
    ClipboardList,
    Calendar,
    Clock,
    User,
    ShieldCheck
  };

  getVariantDisplayName(name?: string) {
    if (!name) return '';

    return name
      .replace(/—\s*Presencial/i, '')
      .replace(/—\s*En línea/i, '')
      .trim();
  }

  confirmBooking() {
    this.confirm.emit();
  }

}
