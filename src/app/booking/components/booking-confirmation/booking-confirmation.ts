import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-confirmation',
  imports: [CommonModule],
  templateUrl: './booking-confirmation.html',
  styleUrl: './booking-confirmation.css',
})

export class BookingConfirmation {
  @Input() service: any;
  @Input() variant: any;

  @Input() date: Date | null = null;
  @Input() time: string | null = null;

  @Input() customer: any;

  @Output() confirm = new EventEmitter<void>();

  loading = false;

  getVariantDisplayName(name?: string) {
    if (!name) return '';

    return name
      .replace(/—\s*Presencial/i, '')
      .replace(/—\s*En línea/i, '')
      .trim();
  }

  confirmBooking() {
    if (this.loading) return;

    this.loading = true;

    this.confirm.emit();
  }
}
