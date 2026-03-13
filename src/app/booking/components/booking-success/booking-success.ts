import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ClipboardList, Calendar, Clock, User, ShieldCheck } from 'lucide-angular';

@Component({
  selector: 'app-booking-success',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './booking-success.html',
  styleUrl: './booking-success.css',
})
export class BookingSuccess {
  readonly ClipboardList = ClipboardList;
  readonly Calendar = Calendar;
  readonly Clock = Clock;
  readonly User = User;
  readonly ShieldCheck = ShieldCheck;

  @Input() service: any;
  @Input() variant: any;
  @Input() date!: Date | null;
  @Input() time: string | null = null;
  @Input() customer: any;

  @Output() restart = new EventEmitter<void>();

  close() {
    window.close();
    // window.location.href = "https://puntodecalma.com";
  }


}
