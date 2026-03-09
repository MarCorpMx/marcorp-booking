import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-time-selector',
  imports: [CommonModule],
  templateUrl: './date-time-selector.html',
  styleUrl: './date-time-selector.css',
})

export class DateTimeSelector {
  @Input() selectedVariant: any;

  @Output() dateSelected = new EventEmitter<Date>();
  @Output() timeSelected = new EventEmitter<string>();

  selectedDate!: Date;
  selectedTime!: string;

  days: Date[] = [];
  times: string[] = [
    '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00',
    '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  ngOnInit() {
    const today = new Date();

    this.days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(today.getDate() + i);
      return d;
    });

    this.selectedDate = today;
  }

  selectDate(date: Date) {
    this.selectedDate = date;
    this.dateSelected.emit(date);
  }

  selectTime(time: string) {
    this.selectedTime = time;
    this.timeSelected.emit(time);
  }

  isSelectedDate(date: Date) {
    return this.selectedDate?.toDateString() === date.toDateString();
  }

}
