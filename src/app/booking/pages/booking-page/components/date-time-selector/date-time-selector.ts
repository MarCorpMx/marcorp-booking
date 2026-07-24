import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingAvailability, BookingCalendarDay, BookingTimeSlot } from '../../../../../core/models/booking-availability.models';

@Component({
  selector: 'app-date-time-selector',
  imports: [CommonModule],
  templateUrl: './date-time-selector.html',
  styleUrl: './date-time-selector.css',
})

export class DateTimeSelector implements OnChanges {

  @Input({ required: true })
  availability!: BookingAvailability;

  @Input()
  selectedDate: string | null = null;

  @Input()
  timeSlots: BookingTimeSlot[] = [];

  @Output()
  dateSelected = new EventEmitter<string>();

  // Para seleccionar hora
  //selectedTime: string | null = null;
  selectedTime: BookingTimeSlot | null = null;

  @Output()
  timeSelected = new EventEmitter<BookingTimeSlot>();

  ngOnChanges(changes: SimpleChanges): void {

    if (
      changes['timeSlots'] &&
      this.selectedDate &&
      this.timeSlots.length > 0
    ) {

      this.scrollToTimeSelector();

    }

  }

  // getters

  get days(): BookingCalendarDay[] {
    return this.availability.calendar;
  }

  selectDate(day: BookingCalendarDay) {

    if (!day.enabled) {
      return;
    }

    //this.selectedDate = new Date(day.date);
    this.selectedDate = day.date;

    this.dateSelected.emit(day.date);

  }


  isSelected(day: BookingCalendarDay): boolean {

    return this.selectedDate === day.date;

  }


  selectTime(slot: BookingTimeSlot) {

    if (!slot.available) {
      return;
    }

    this.selectedTime = slot;

    this.timeSelected.emit(slot);

  }

  private scrollToTimeSelector(): void {

    setTimeout(() => {

      document
        .getElementById('time-selector')
        ?.scrollIntoView({

          behavior: 'smooth',
          block: 'start'

        });

    }, 100);

  }

}
