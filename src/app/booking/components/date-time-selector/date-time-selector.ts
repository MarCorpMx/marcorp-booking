import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingService } from '../../../core/services/booking.service';
import { TimeSlot } from '../../../core/models/date-time.model';


@Component({
  selector: 'app-date-time-selector',
  imports: [CommonModule],
  templateUrl: './date-time-selector.html',
  styleUrl: './date-time-selector.css',
})

export class DateTimeSelector implements OnInit, OnChanges {
  @Input() selectedVariant: any;
  @Input() organization: any;
  @Output() dateSelected = new EventEmitter<Date>();
  @Output() timeSelected = new EventEmitter<TimeSlot>();

  @Input() excludeAppointmentId?: number; // rombi

  loadingDays = false;
  loadingTimes = false;

  selectedDate!: Date;
  selectedTime!: string;

  availableDays: Record<string, boolean> = {};

  days: Date[] = [];
  times: TimeSlot[] = [];

  showNumDays: number = 9;

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    const today = new Date();

    this.days = Array.from({ length: this.showNumDays }).map((_, i) => {
      const d = new Date();
      d.setDate(today.getDate() + i);
      return d;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedVariant'] && this.selectedVariant) {
      const today = new Date();
      //this.selectedDate = today;
      //this.dateSelected.emit(today);
      this.loadAvailabilityRange(today);
      //this.loadAvailability(today);
    }
  }

  loadAvailabilityRange(startDate: Date) {
    this.loadingDays = true;

    const formattedDate = startDate.toLocaleDateString('en-CA');

    this.bookingService
      .getAvailabilityRange(
        this.organization.slug,
        this.selectedVariant.id,
        formattedDate,
        this.showNumDays
      )
      .subscribe((res: any) => {

        this.availableDays = {};

        res.days.forEach((day: any) => {
          this.availableDays[day.date] = day.available;
        });

        this.loadingDays = false;

        // Seleccionar primer día disponible
        const firstAvailable = this.days.find(d =>
          this.availableDays[d.toLocaleDateString('en-CA')]
        );

        if (firstAvailable) {
          this.selectedDate = firstAvailable;
          this.dateSelected.emit(firstAvailable);
          this.loadAvailability(firstAvailable);
        } else {
          // ningún día disponible
          this.selectedDate = this.days[0];
          this.times = [];
        }

      });
  }


  /*loadAvailabilityRange(startDate: Date) {
    this.loadingDays = true;
    const formattedDate = startDate.toLocaleDateString('en-CA');

    this.bookingService
      .getAvailabilityRange(
        this.organization.slug,
        this.selectedVariant.id,
        formattedDate,
        this.showNumDays
      )
      .subscribe((res: any) => {

        this.availableDays = {};

        res.days.forEach((day: any) => {
          this.availableDays[day.date] = day.available;
        });

        this.loadingDays = false;

      });
  }*/

  isDayAvailable(date: Date) {
    //const key = date.toISOString().split('T')[0];
    const key = date.toLocaleDateString('en-CA');

    return this.availableDays[key] ?? false;
  }

  loadAvailability(date: Date) {
    if (!this.selectedVariant) return;

    this.loadingTimes = true;

    //const formattedDate = date.toISOString().split('T')[0];
    const formattedDate = date.toLocaleDateString('en-CA');

    this.bookingService
      .getAvailability(
        this.organization.slug,
        this.selectedVariant.id,
        formattedDate
      )
      .subscribe((res: any) => {

        console.log(res);

        this.times = res.available_slots ?? [];

        this.loadingTimes = false;
      });
  }

  selectDate(date: Date) {
    this.selectedDate = date;
    this.selectedTime = '';

    this.loadAvailability(date);

    this.dateSelected.emit(date);
  }

  selectTime(slot: TimeSlot) {
    this.selectedTime = slot.time;

    // emitir fecha actual si no se ha emitido
    this.dateSelected.emit(this.selectedDate);

    this.timeSelected.emit(slot);
    /*this.timeSelected.emit({
      time: slot.time,
      staff_member_id: slot.staff_member_id
    });*/
  }

  isSelectedDate(date: Date) {
    return this.selectedDate?.toDateString() === date.toDateString();
  }

}
