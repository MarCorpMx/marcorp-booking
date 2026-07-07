import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingAvailability, BookingCalendarDay, BookingTimeSlot } from '../../../../../core/models/booking-availability.models';

@Component({
  selector: 'app-date-time-selector',
  imports: [CommonModule],
  templateUrl: './date-time-selector.html',
  styleUrl: './date-time-selector.css',
})

export class DateTimeSelector {

  @Input({ required: true })
  availability!: BookingAvailability;

  @Input()
  selectedDate: Date | null = null;

  @Input()
  timeSlots: BookingTimeSlot[] = [];

  @Output()
  dateSelected = new EventEmitter<string>();

  // Para seleccionar hora
  //selectedTime: string | null = null;
  selectedTime: BookingTimeSlot | null = null;

  @Output()
  timeSelected = new EventEmitter<BookingTimeSlot>();

  // getters

  get days(): BookingCalendarDay[] {
    return this.availability.calendar;
  }

  selectDate(day: BookingCalendarDay) {

    if (!day.enabled) {
      return;
    }

    this.selectedDate = new Date(day.date);

    this.dateSelected.emit(day.date);

  }

  isSelected(day: BookingCalendarDay): boolean {

    if (!this.selectedDate) {
      return false;
    }

    return this.selectedDate
      .toISOString()
      .substring(0, 10) === day.date;

  }


  selectTime(slot: BookingTimeSlot) {

    if (!slot.available) {
      return;
    }

    this.selectedTime = slot;

    this.timeSelected.emit(slot);

  }

}
