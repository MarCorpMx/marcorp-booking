import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ClipboardList, Calendar, Clock, User, ShieldCheck, ClipboardCopy, RotateCcw, X, Download } from 'lucide-angular';

import { NotificationService } from '../../../core/services/notification.service';
//import { OrganizationModel } from '../../../core/models/organization.model';

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
  readonly ClipboardCopy = ClipboardCopy;
  readonly RotateCcw = RotateCcw;
  readonly X = X;
  readonly Download = Download;

  @Input() service: any;
  @Input() variant: any;
  @Input() date!: Date | null;
  @Input() time: string | null = null;
  @Input() customer: any;
  @Input() referenceCode?: string;
  //@Input() organization?: OrganizationModel;
  @Input() organization?: any;

  @Output() restart = new EventEmitter<void>();

  copied = false;

  constructor(
    private notify: NotificationService
  ) { }

  copyReferenceCode() {
    if (!this.referenceCode) return;
    navigator.clipboard.writeText(this.referenceCode);
    this.copied = true;
    setTimeout(() => this.copied = false, 1500);
    this.notify.success('Código copiado');
  }

  createGoogleCalendarLink(): string {
    if (!this.date || !this.time) return '#';

    const start = this.buildDateTime(this.date, this.time);

    const duration = this.variant?.duration_minutes || 60;
    const end = new Date(start.getTime() + duration * 60000);

    const formatLocal = (date: Date) => {
      const pad = (n: number) => n.toString().padStart(2, '0');

      return (
        date.getFullYear() +
        pad(date.getMonth() + 1) +
        pad(date.getDate()) + 'T' +
        pad(date.getHours()) +
        pad(date.getMinutes()) +
        '00'
      );
    };

    const dates = `${formatLocal(start)}/${formatLocal(end)}`;

    const title = encodeURIComponent(
      `${this.service?.name} - ${this.variant?.name}`
    );

    const details = encodeURIComponent(
      `Servicio: ${this.service?.name} - ${this.variant?.name}
Cliente: ${this.customer?.first_name} ${this.customer?.last_name}
Código: ${this.referenceCode || ''}`
    );

    const locationText = this.getLocationText();
    const location = encodeURIComponent(locationText);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}&ctz=America/Mexico_City`;
  }

  getLocationText(): string {
    if (!this.variant) return '';

    switch (this.variant.mode) {

      case 'presential':
        return this.organization?.name || 'Ubicación física';

      case 'online':
        return 'Sesión en línea (recibirás el enlace por correo)';

      case 'home':
        return 'Servicio a domicilio';

      default:
        return this.organization?.name || '';
    }
  }

  // Generar .ics
  downloadICS() {
    if (!this.date || !this.time) return;

    const start = this.buildDateTime(this.date, this.time);
    const duration = this.variant?.duration_minutes || 60;
    const end = new Date(start.getTime() + duration * 60000);

    const pad = (n: number) => n.toString().padStart(2, '0');

    const formatICS = (date: Date) => {
      return (
        date.getFullYear() +
        pad(date.getMonth() + 1) +
        pad(date.getDate()) + 'T' +
        pad(date.getHours()) +
        pad(date.getMinutes()) +
        pad(date.getSeconds())
      );
    };

    // 🔥 UID único (nivel pro)
    const uid = `${Date.now()}-${Math.random().toString(36).substring(2)}@puntodecalma.com`;

    // 🔥 Timestamp (requerido)
    const dtstamp = formatICS(new Date());

    const title = `${this.service?.name} - ${this.variant?.name}`;

    const description =
      `Servicio: ${this.service?.name}
      Cliente: ${this.customer?.first_name} ${this.customer?.last_name}
      Código: ${this.referenceCode || ''}`;

    const location = this.getLocationText();

    const timezone = 'America/Mexico_City';

    const icsContent =
      `BEGIN:VCALENDAR
      VERSION:2.0
      PRODID:-//Punto de Calma//Booking App//ES
      BEGIN:VEVENT
      UID:${uid}
      DTSTAMP:${dtstamp}
      DTSTART;TZID=${timezone}:${formatICS(start)}
      DTEND;TZID=${timezone}:${formatICS(end)}
      SUMMARY:${title}
      DESCRIPTION:${description}
      LOCATION:${location}
      STATUS:CONFIRMED
      END:VEVENT
      END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);

    // 🔥 nombre más pro
    const safeName = (this.service?.name || 'cita').replace(/\s+/g, '-').toLowerCase();

    link.download = `${safeName}.ics`;
    link.click();
  }


  buildDateTime(date: Date, time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);

    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0, 0);

    return newDate;
  }

  close() {
    window.close();
    // window.location.href = "https://puntodecalma.com";
  }


}
