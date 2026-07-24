import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LucideAngularModule } from 'lucide-angular';
import { ICONS } from '../../../../../core/config/icons.config';

import { NotificationService } from '../../../../../core/services/notification.service';

import { BookingOrganization } from '../../../../../core/models/booking-entry.models';// mverificar la puta ruta man
import { BookingService, BookingServiceVariant, BookingStaffMember } from '../../../../../core/models/booking-service.models';
import { BookingTimeSlot } from '../../../../../core/models/booking-availability.models';

@Component({
  selector: 'app-booking-success',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './booking-success.html',
  styleUrl: './booking-success.css',
})

export class BookingSuccess {

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
  selectedDate: string | null = null;

  @Input()
  selectedTime: BookingTimeSlot | null = null;

  @Input()
  customer: any = null;

  @Input() referenceCode!: string | null;

  @Input() organization!: BookingOrganization | undefined;

  @Output() restart = new EventEmitter<void>();

  copied = false;

  private notify = inject(NotificationService);

  copyReferenceCode(): void {

    if (!this.referenceCode) return;

    navigator.clipboard.writeText(this.referenceCode);

    this.copied = true;

    this.notify.success('Código copiado');

    setTimeout(() => {

      this.copied = false;

    }, 1500);

  }

  createGoogleCalendarLink(): string {

    const start = this.buildDateTime();

    if (!start) return '#';

    const duration = this.variant?.duration_minutes ?? 60;

    const end =
      new Date(start.getTime() + duration * 60000);

    const pad = (n: number) => String(n).padStart(2, '0');

    const format = (d: Date) =>

      `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE
&text=${encodeURIComponent(`${this.service?.name} - ${this.variant?.name}`)}
&dates=${format(start)}/${format(end)}
&details=${encodeURIComponent(`Código: ${this.referenceCode}`)}
&location=${encodeURIComponent(this.getLocationText())}
&ctz=America/Mexico_City`;

  }

  buildDateTime(): Date | null {

    if (!this.selectedDate || !this.selectedTime?.time) {
      return null;
    }

    const [hours, minutes] = this.selectedTime.time
      .split(':')
      .map(Number);

    const date = new Date(this.selectedDate);

    date.setHours(hours, minutes, 0, 0);

    return date;
  }

  getLocationText(): string {
    if (!this.variant) return '';

    switch (this.variant.mode) {

      case 'presential':
        return this.organization?.name || 'Ubicación física';

      case 'online':
        return 'Sesión en línea (recibirás el enlace por correo)';

      // case 'home':
      //   return 'Servicio a domicilio';

      default:
        return this.organization?.name || '';
    }
  }

  downloadICS() {

    const start = this.buildDateTime();

    if (!start) return;

    const duration = this.variant?.duration_minutes ?? 60;

    const end = new Date(
      start.getTime() + duration * 60000
    );


    const pad = (n: number) =>
      String(n).padStart(2, '0');


    const formatICS = (date: Date) =>
      `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;


    const uid =
      `${Date.now()}@rombi.app`;


    const title =
      `${this.service?.name} - ${this.variant?.name}`;


    const description =
      `Servicio: ${title}
Cliente: ${this.customer?.first_name} ${this.customer?.last_name}
Código: ${this.referenceCode}`;


    const ics =
      `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ROMBI//Booking//ES
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${formatICS(new Date())}
DTSTART:${formatICS(start)}
DTEND:${formatICS(end)}
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${this.getLocationText()}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;


    const blob =
      new Blob(
        [ics],
        { type: 'text/calendar;charset=utf-8' }
      );


    const link =
      document.createElement('a');


    link.href =
      URL.createObjectURL(blob);


    link.download =
      `${this.service?.name || 'cita'}.ics`;


    link.click();

  }

  // rombito -> tenemos que mejorar que si no sin usuarios free cuando terminen de realizar su cita y quieran cerrar los mande a su sitio web si es que tienen
  close(): void {

    // intenta cerrar
    window.close();

    // si no pudo cerrar...
    setTimeout(() => {

      if (!window.closed) {

        // regresar a la página principal
        window.location.href = '/';

      }

    }, 150);

  }

  /*close(): void {

    // intenta cerrar la pestaña
    window.close();

    // si el navegador no lo permite
    setTimeout(() => {

      if (!window.closed) {

        if (window.history.length > 1) {

          window.history.back();

        } else {

          window.location.href =
            this.organization?.website ??
            '/';

        }

      }

    }, 150);

  }*/




}
