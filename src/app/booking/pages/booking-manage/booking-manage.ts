import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { OrganizationModel } from '../../../core/models/organization.model';
import { OrganizationService } from '../../../core/services/organization.service';
import { BrandingService } from '../../../core/services/branding.service';
import { BookingService } from '../../../core/services/booking.service';
import { NotificationService } from '../../../core/services/notification.service';

import { BookingResult } from '../booking-result/booking-result';
import { DateTimeSelector } from '../../components/date-time-selector/date-time-selector';


@Component({
  selector: 'app-booking-manage',
  imports: [CommonModule, FormsModule, BookingResult, DateTimeSelector],
  templateUrl: './booking-manage.html',
  styleUrl: './booking-manage.css',
})

export class BookingManage implements OnInit {

  isLoading = true;

  organizationSlug!: string;
  organization?: OrganizationModel;

  referenceCode = '';
  appointment: any = null;

  isRescheduling = false;
  isCancelling = false;

  selectedDate: string | null = null;
  selectedTime: string | null = null;

  showCancelModal = false;

  cancelReason: string = '';
  cancelNote: string = '';
  cancelOptions = [
    'Ya no puedo asistir',
    'Quiero otro horario',
    'Fue un error',
    'Otro'
  ];

  showRescheduleModal = false;

  rescheduleReason: string = '';
  rescheduleNote: string = '';
  rescheduleOptions = [
    'No puedo en ese horario',
    'Prefiero otro día',
    'Conflicto personal',
    'Otro'
  ];

  constructor(
    private route: ActivatedRoute,
    private orgService: OrganizationService,
    private branding: BrandingService,
    private bookingService: BookingService,
    private notify: NotificationService
  ) { }

  ngOnInit(): void {
    this.organizationSlug = this.route.snapshot.paramMap.get('slug')!;

    // Leer query param
    const refFromUrl = this.route.snapshot.queryParamMap.get('ref');
    if (refFromUrl) {
      this.referenceCode = refFromUrl;
    }

    // Cargar organization + branding
    this.orgService.loadOrganization(this.organizationSlug)
      .subscribe({
        next: (org) => {
          this.isLoading = false;
          this.organization = org;
          
          //this.branding.apply(org); FALTA HACER BIEN LA FOKING PETICION PARA EL BRANDING PUTO VATO GAY

          // Auto buscar si viene ref
          if (refFromUrl) {
            this.searchAppointment();
          }
        },
        error: () => {
          this.isLoading = false;
          this.notify.error('Ocurrió un error al procesar la solcitud.');
          this.branding.reset();
          //this.goHome();
        }
      });
  }

  isLockedStatus(status: string): boolean {
    return ['cancelled', 'completed', 'no_show'].includes(status);
  }

  searchAppointment() {

    if (!this.referenceCode) {
      this.notify.error('Ingresa el ID de referencia que recibiste por correo');
      return;
    }

    this.isLoading = true;

    this.bookingService.getByReference(this.referenceCode)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          this.appointment = res;
        },
        error: () => {
          this.isLoading = false;
          this.notify.error('No se encontró la cita');
        }
      });
  }

  confirmCancel() {
    this.isCancelling = true;

    this.bookingService.cancelByReference(this.referenceCode, {
      reason: this.cancelReason,
      note: this.cancelNote
    })
      .subscribe({
        next: (res) => {
          this.showCancelModal = false;
          this.appointment.status = 'cancelled';
        },
        error: () => {
          this.isCancelling = false;
          this.notify.error('Error al cancelar');
        },
        complete: () => {
          this.isCancelling = false;
        }
      });
  }

  startReschedule() {
    this.isRescheduling = true;
  }

  onDateSelected(date: Date) {
    this.selectedDate = date.toLocaleDateString('en-CA');
  }

  onTimeSelected(slot: any) {
    this.selectedTime = slot.time;
  }

  openRescheduleModal() {
    if (!this.selectedDate || !this.selectedTime) {
      this.notify.error('Selecciona fecha y hora');
      return;
    }

    if (
      this.selectedDate === this.appointment.date &&
      this.selectedTime === this.appointment.time
    ) {
      this.notify.info('Selecciona un horario diferente');
      return;
    }

    this.showRescheduleModal = true;
  }

  confirmReschedule() {
    this.isLoading = true;

    this.bookingService.rescheduleByReference(
      this.referenceCode,
      {
        date: this.selectedDate!,
        time: this.selectedTime!,
        reason: this.rescheduleReason,
        note: this.rescheduleNote
      }
    ).subscribe({
      next: () => {
        this.isLoading = false;

        this.showRescheduleModal = false;

        this.appointment.date = this.selectedDate;
        this.appointment.time = this.selectedTime;
        this.appointment.status = 'rescheduled';

        this.isRescheduling = false;

        this.notify.success('Cita reagendada correctamente');
      },
      error: (err) => {
        this.isLoading = false;

        //console.log(err.error);
        this.notify.error('Error al reagendar');
      }
    });
  }

}
